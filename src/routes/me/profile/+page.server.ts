import { FynFetchClients, useApi } from '$lib/server/api/api';
import { fail, type Actions } from '@sveltejs/kit';
import {
	Account,
	AccountsApi,
	ActivityDomainsApi,
	CreateSkillDto,
	ExperiencesApi,
	FormationsApi,
	Skill,
	SkillsApi,
	StudentsApi,
	type ActivityDomain,
	type CreateExperienceDto,
	type CreateFormationDto,
	type Experience,
	type Formation,
	type MeRouteAsStudentResponse,
	type Student
} from 'fyn-api-sdk';
import type { PageServerLoad } from './$types';

type StudentWithSkills = Student & {
	skills?: Skill[];
};

export const load: PageServerLoad = async ({ cookies, fetch, parent }) => {
	const authenticatedFetch = FynFetchClients.from_cookies(cookies, undefined, fetch);
	const activityDomainsApi = useApi(ActivityDomainsApi, authenticatedFetch);
	const formationsApi = useApi(FormationsApi, authenticatedFetch);
	const experiencesApi = useApi(ExperiencesApi, authenticatedFetch);
	const skillsApi = useApi(SkillsApi, authenticatedFetch);

	const activityDomains: ActivityDomain[] = await activityDomainsApi
		.activityDomainsControllerFindAllV1()
		.then((response) => response.list)
		.catch((reason) => {
			console.error(reason);
			return [];
		});

	const formations: Formation[] = await formationsApi
		.formationsControllerListV1(1, 100)
		.then((response) => response.list)
		.catch((reason) => {
			console.error(reason);
			return [];
		});

	const experiences: Experience[] = await experiencesApi
		.experiencesControllerListV1(1, 100)
		.then((response) => response.list)
		.catch((reason) => {
			console.error(reason);
			return [];
		});

	const skills: Skill[] = await skillsApi
		.skillsControllerGetV1(undefined, undefined, undefined, (await parent()).me.id)
		.then((response) => response.list)
		.catch((reason) => {
			console.error(reason);
			return [];
		});

	return {
		activityDomains,
		formations,
		experiences,
		skills
	};
};

const parseIndexedRecords = (formData: FormData, prefix: string) => {
	const pattern = new RegExp(`^${prefix}\\[(\\d+)\\]\\[(.+)\\]$`);
	const records = new Map<number, Record<string, string>>();

	for (const [key, value] of formData.entries()) {
		const match = pattern.exec(key);
		if (!match) {
			continue;
		}

		const index = parseInt(match[1]);
		const field = match[2];
		const current = records.get(index) ?? {};
		current[field] = value.toString().trim();
		records.set(index, current);
	}

	// Sort the records by their index
	return [...records.entries()].sort(([left], [right]) => left - right).map(([, record]) => record);
};

export const actions: Actions = {
	saveProfileJob: async ({ cookies, fetch, request }) => {
		const authenticatedFetch = FynFetchClients.from_cookies(cookies, undefined, fetch);

		// Pas accès aux data de +layout.server.ts -> Re-récupération du compte étudiant
		const accountsApi = useApi(AccountsApi, authenticatedFetch);
		const student = (await accountsApi
			.accountsControllerGetMeV1()
			.catch(() => null)) as MeRouteAsStudentResponse | null;

		if (student?.account.type !== Account.TypeEnum.Student) {
			return fail(401, {
				profileJobError: "Impossible d'identifier l'étudiant connecté."
			});
		}

		const data = await request.formData();
		const errorBag: string[] = [];

		// Parse entries as records
		const formations: Record<string, string | number>[] = parseIndexedRecords(data, 'formations');
		const experiences: Record<string, string | number>[] = parseIndexedRecords(data, 'experiences');
		const skills: Record<string, string | number>[] = parseIndexedRecords(data, 'skills');

		// Verify for missing fields
		// and cast some fields to integer

		/**
		 * Convert the field in the record as integer and return if it as been possible or not
		 */
		const asInt = (record: Record<string, string | number>, field: string) => {
			if (record[field]) {
				const int = parseInt(record[field] as string);
				if (isNaN(int)) {
					return false;
				}
				record[field] = parseInt(record[field] as string);
			}

			return true;
		};

		for (const formation of formations) {
			if (!(formation.title && formation.description)) {
				errorBag.push('Chaque formation doit avoir un titre et une durée.');
				break;
			}
			if (!asInt(formation, 'id')) {
				errorBag.push("Une formation n'a pas pu être validée.");
				break;
			}

			if (!asInt(formation, 'activity_domain_id')) {
				errorBag.push("Le domaine d'activité d'une formation n'est pas valide.");
				break;
			}
			if (!asInt(formation, 'duration')) {
				errorBag.push("La durée d'une la formation n'est pas valide.");
				break;
			}
		}

		for (const experience of experiences) {
			if (!(experience.title && experience.description && experience.begin_date)) {
				errorBag.push(
					'Chaque expérience doit avoir un titre, une description et une date de début.'
				);
				break;
			}
			if (!asInt(experience, 'id')) {
				errorBag.push("Une experience n'a pas pu être validée.");
				break;
			}
		}

		for (const skill of skills) {
			if (!(skill.name && skill.type)) {
				errorBag.push('Chaque compétence doit avoir un nom et un type.');
				break;
			}
			if ([Skill.TypeEnum.Soft, Skill.TypeEnum.Hard].includes(skill.type as Skill.TypeEnum)) {
				errorBag.push(
					`Le type d'un skill doit être soit '${Skill.TypeEnum.Soft}', soit '${Skill.TypeEnum.Hard}'.`
				);
				break;
			}

			if (!asInt(skill, 'id')) {
				errorBag.push("Un skill n'a pas pu être validée.");
				break;
			}
		}

		if (errorBag.length) {
			return fail(400, {
				errors: errorBag
			});
		}

		const formationsApi = useApi(FormationsApi, authenticatedFetch);
		const experiencesApi = useApi(ExperiencesApi, authenticatedFetch);
		const skillsApi = useApi(SkillsApi, authenticatedFetch);

		// Get existing entries to know which was removed or needs to be inserted
		const [existingFormations, existingExperiences, existingSkills] = await Promise.all([
			formationsApi.formationsControllerListV1(1, 100).then((response) => response.list),
			experiencesApi.experiencesControllerListV1(1, 100).then((response) => response.list),
			skillsApi
				.skillsControllerGetV1(undefined, undefined, undefined, student.id)
				.then((response) => response.list)
		]).catch(() => [[], [], []]);

		const existingFormationIds = new Set(existingFormations.map((formation) => formation.id));
		const existingExperienceIds = new Set(existingExperiences.map((experience) => experience.id));
		const existingSkillIds = new Set(existingSkills.map((skill) => skill.id));

		try {
			const submittedFormationIds = new Set<number>();
			for (const formation of formations) {
				const formationId = formation.id as number;

				if (existingFormationIds.has(formationId)) {
					await formationsApi.formationsControllerUpdateV1(formation, formationId);
					submittedFormationIds.add(formationId);
				} else {
					await formationsApi.formationsControllerCreateV1(
						formation as unknown as CreateFormationDto
					);
				}
			}

			const submittedExperienceIds = new Set<number>();
			for (const experience of experiences) {
				const experienceId = experience.id as number;

				if (existingExperienceIds.has(experienceId)) {
					await experiencesApi.experiencesControllerUpdateV1(experience, experienceId);
					submittedExperienceIds.add(experienceId);
				} else {
					await experiencesApi.experiencesControllerCreateV1(
						experience as unknown as CreateExperienceDto
					);
				}
			}

			const submittedSkillIds = new Set<number>();
			for (const skill of skills) {
				const skillId = skill.id as number;

				await skillsApi.skillsControllerUpsertV1(skill as CreateSkillDto, student.id);
				if (existingSkillIds.has(skillId)) {
					submittedSkillIds.add(skillId);
				}
			}

			// Deleting skills
			for (const skill of existingSkills) {
				if (!submittedSkillIds.has(skill.id)) {
					await skillsApi.skillsControllerRemoveV1(skill.id, student.id).catch(() => null);
				}
			}

			const removedPersistedFormations = existingFormations.some(
				(formation) => !submittedFormationIds.has(formation.id)
			);
			const removedPersistedExperiences = existingExperiences.some(
				(experience) => !submittedExperienceIds.has(experience.id)
			);

			return {
				profileJobSuccess: 'Profil professionnel mis à jour.',
				profileJobNotice:
					removedPersistedFormations || removedPersistedExperiences
						? "Les suppressions de formations et d'expériences ne sont pas encore enregistrées côté serveur, faute d'endpoint de suppression."
						: undefined
			};
		} catch (error) {
			if (error instanceof Response) {
				const payload = await error.json().catch(() => null);
				return fail(error.status, {
					profileJobError:
						typeof payload === 'object' &&
						payload &&
						'message' in payload &&
						typeof payload.message === 'string'
							? payload.message
							: 'Impossible de mettre à jour le profil professionnel.'
				});
			}

			return fail(500, {
				profileJobError: 'Impossible de mettre à jour le profil professionnel.'
			});
		}
	}
};
