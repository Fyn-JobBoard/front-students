import { FynFetchClients, useApi } from '$lib/server/api/api';
import { fail, type Actions } from '@sveltejs/kit';
import {
	AccountsApi,
	ActivityDomainsApi,
	CreateSkillDto,
	ExperiencesApi,
	FormationsApi,
	SkillsApi,
	StudentsApi,
	type ActivityDomain,
	type Experience,
	type Formation,
	type MeRouteAsStudentResponse,
	type Skill,
	type Student
} from 'fyn-api-sdk';
import type { PageServerLoad } from './$types';

type ActivityDomainsResponse = ActivityDomain[] | { list?: ActivityDomain[] };
type StudentWithSkills = Student & {
	skills?: Skill[];
};

const toDomainList = (response: ActivityDomainsResponse): ActivityDomain[] => {
	if (Array.isArray(response)) {
		return response;
	}

	return response.list ?? [];
};

const parseIndexedRecords = (formData: FormData, prefix: string) => {
	const pattern = new RegExp(`^${prefix}\\[(\\d+)\\]\\[(.+)\\]$`);
	const records = new Map<number, Record<string, string>>();

	for (const [key, value] of formData.entries()) {
		const match = key.match(pattern);

		if (!match) {
			continue;
		}

		const index = Number(match[1]);
		const field = match[2];
		const current = records.get(index) ?? {};
		current[field] = value.toString().trim();
		records.set(index, current);
	}

	return [...records.entries()]
		.sort(([left], [right]) => left - right)
		.map(([, record]) => record);
};

const isBlankRecord = (record: Record<string, string>, ignoredFields: string[] = ['id']) =>
	Object.entries(record).every(([key, value]) => ignoredFields.includes(key) || !value);

export const load: PageServerLoad = async ({ cookies, fetch, parent }) => {
	const authenticatedFetch = FynFetchClients.from_cookies(cookies, undefined, fetch);
	const activityDomainsApi = useApi(ActivityDomainsApi, authenticatedFetch);
	const formationsApi = useApi(FormationsApi, authenticatedFetch);
	const experiencesApi = useApi(ExperiencesApi, authenticatedFetch);
	const studentsApi = useApi(StudentsApi, authenticatedFetch);

	const activityDomains = await activityDomainsApi
		.activityDomainsControllerFindAllV1()
		.then((response) => toDomainList(response as ActivityDomainsResponse))
		.catch((reason) => {
			console.error(reason);
			return [];
		});

	const formations = await formationsApi
		.formationsControllerListV1(1, 100)
		.then((response) => response.list ?? [])
		.catch((reason) => {
			console.error(reason);
			return [] as Formation[];
		});

	const experiences = await experiencesApi
		.experiencesControllerListV1(1, 100)
		.then((response) => response.list ?? [])
		.catch((reason) => {
			console.error(reason);
			return [] as Experience[];
		});

	const { student } = await parent();
	const profileStudent = await studentsApi
		.studentsControllerGetV1(student.id)
		.then((response) => response as StudentWithSkills)
		.catch(() => null);

	return {
		activityDomains,
		formations,
		experiences,
		skills: profileStudent?.skills ?? []
	};
};

export const actions: Actions = {
	saveProfileJob: async ({ cookies, fetch, request }) => {
		const authenticatedFetch = FynFetchClients.from_cookies(cookies, undefined, fetch);
		const accountsApi = useApi(AccountsApi, authenticatedFetch);
		const studentId = await accountsApi
			.accountsControllerGetMeV1()
			.then((student) => (student as MeRouteAsStudentResponse).id)
			.catch(() => undefined);

		if (!studentId) {
			return fail(401, {
				profileJobError: "Impossible d'identifier l'étudiant connecté."
			});
		}

		const formationsApi = useApi(FormationsApi, authenticatedFetch);
		const experiencesApi = useApi(ExperiencesApi, authenticatedFetch);
		const skillsApi = useApi(SkillsApi, authenticatedFetch);
		const studentsApi = useApi(StudentsApi, authenticatedFetch);
		const formData = await request.formData();

		const formationRecords = parseIndexedRecords(formData, 'formations');
		const experienceRecords = parseIndexedRecords(formData, 'experiences');
		const skillRecords = parseIndexedRecords(formData, 'skills');

		const formations = formationRecords.filter((record) => !isBlankRecord(record));
		const experiences = experienceRecords.filter((record) => !isBlankRecord(record));
		const skills = skillRecords.filter((record) => !isBlankRecord(record));

		for (const formation of formations) {
			if (!formation.title || !formation.duration) {
				return fail(400, {
					profileJobError: 'Chaque formation doit avoir un titre et une durée.'
				});
			}
		}

		for (const experience of experiences) {
			if (!experience.title || !experience.description || !experience.begin_date) {
				return fail(400, {
					profileJobError:
						'Chaque expérience doit avoir un titre, une description et une date de début.'
				});
			}
		}

		for (const skill of skills) {
			if (!skill.name || !skill.type) {
				return fail(400, {
					profileJobError: 'Chaque compétence doit avoir un nom et un type.'
				});
			}
		}

		const [existingFormations, existingExperiences, existingStudent] = await Promise.all([
			formationsApi.formationsControllerListV1(1, 100).then((response) => response.list ?? []),
			experiencesApi.experiencesControllerListV1(1, 100).then((response) => response.list ?? []),
			studentsApi
				.studentsControllerGetV1(studentId)
				.then((response) => response as StudentWithSkills)
				.catch(() => null)
		]).catch(() => [[], [], null] as const);

		const existingFormationIds = new Set(existingFormations.map((formation) => formation.id));
		const existingExperienceIds = new Set(existingExperiences.map((experience) => experience.id));
		const existingSkills = existingStudent?.skills ?? [];
		const existingSkillIds = new Set(existingSkills.map((skill) => skill.id));

		try {
			const submittedFormationIds = new Set<number>();
			for (const formation of formations) {
				const formationId = Number(formation.id);
				const payload = {
					title: formation.title,
					info_url: formation.info_url || undefined,
					description: formation.description || undefined,
					obtention_date: formation.obtention_date || undefined,
					duration: Number(formation.duration),
					activity_domain_id: formation.activity_domain_id
						? Number(formation.activity_domain_id)
						: undefined
				};

				if (existingFormationIds.has(formationId)) {
					submittedFormationIds.add(formationId);
					await formationsApi.formationsControllerUpdateV1(payload, formationId);
				} else {
					await formationsApi.formationsControllerCreateV1(payload);
				}
			}

			const submittedExperienceIds = new Set<number>();
			for (const experience of experiences) {
				const experienceId = Number(experience.id);
				const payload = {
					title: experience.title,
					description: experience.description,
					begin_date: experience.begin_date,
					end_date: experience.end_date || undefined,
					company_fallback_name: experience.company_fallback_name || undefined
				};

				if (existingExperienceIds.has(experienceId)) {
					submittedExperienceIds.add(experienceId);
					await experiencesApi.experiencesControllerUpdateV1(payload, experienceId);
				} else {
					await experiencesApi.experiencesControllerCreateV1(payload);
				}
			}

			const submittedSkillIds = new Set<number>();
			for (const skill of skills) {
				const skillId = Number(skill.id);
				const payload = {
					name: skill.name,
					type:
						skill.type === 'soft' ? CreateSkillDto.TypeEnum.Soft : CreateSkillDto.TypeEnum.Hard
				};

				await skillsApi.skillsControllerUpsertV1(payload, studentId);
				if (existingSkillIds.has(skillId)) {
					submittedSkillIds.add(skillId);
				}
			}

			for (const skill of existingSkills) {
				if (!submittedSkillIds.has(skill.id)) {
					await skillsApi.skillsControllerRemoveV1(skill.id, studentId).catch(() => null);
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
