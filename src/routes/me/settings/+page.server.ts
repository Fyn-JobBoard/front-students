import { FynFetchClients, useApi } from '$lib/server/api/api';
import { fail, type Actions, type RequestEvent } from '@sveltejs/kit';
import {
	AccountsApi,
	ActivityDomainsApi,
	AuthApi,
	StudentsApi,
	type ActivityDomain,
	type MeRouteAsStudentResponse,
	type Student
} from 'fyn-api-sdk';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	const authenticatedFetch = FynFetchClients.from_cookies(cookies, undefined, fetch);
	const activityDomainsApi = useApi(ActivityDomainsApi, authenticatedFetch);

	const activityDomains = await activityDomainsApi
		.activityDomainsControllerFindAllV1()
		.then((response) => response.list)
		.catch((reason) => {
			console.error(reason);
			return [];
		});

	return {
		activityDomains
	};
};

type ActivityDomainsResponse = ActivityDomain[] | { list?: ActivityDomain[] };
type StudentWithExtras = Student & {
	activity_domains?: ActivityDomain[];
};

const pickLinks = (links: string[] = []) => {
	const github = links.find((link) => link.includes('github.com')) ?? '';
	const linkedin = links.find((link) => link.includes('linkedin.com')) ?? '';
	const portfolio = links.find((link) => link !== github && link !== linkedin) ?? '';

	return { github, linkedin, portfolio };
};

const getPasswordFields = async ({ request }: RequestEvent) => {
	const data = await request.formData();

	return {
		currentPassword: data.get('currentPassword')?.toString().trim() ?? '',
		newPassword: data.get('newPassword')?.toString().trim() ?? '',
		confirmPassword: data.get('confirmPassword')?.toString().trim() ?? ''
	};
};

export const actions: Actions = {
	saveProfile: async ({ cookies, fetch, request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString().trim() ?? '';
		const first_name = data.get('first_name')?.toString().trim() ?? '';
		const last_name = data.get('last_name')?.toString().trim() ?? '';
		const birthdate = data.get('birthdate')?.toString().trim() ?? '';
		const bio = data.get('bio')?.toString().trim() ?? '';
		const links = data
			.getAll('links')
			.map((value) => value.toString().trim())
			.filter(Boolean);

		if (!email || !first_name || !last_name || !birthdate) {
			return fail(400, {
				profileError: 'Les champs email, prénom, nom et date de naissance sont requis.'
			});
		}

		const authenticatedFetch = FynFetchClients.from_cookies(cookies, undefined, fetch);
		const accounts = useApi(AccountsApi, authenticatedFetch);
		const students = useApi(StudentsApi, authenticatedFetch);

		try {
			await accounts.accountsControllerUpdateMeV1({ email });
		} catch (error: unknown) {
			if (error instanceof Response) {
				const payload = await error.json().catch(() => null);
				return fail(error.status, {
					profileError:
						typeof payload === 'object' &&
						payload &&
						'message' in payload &&
						typeof payload.message === 'string'
							? payload.message
							: 'Impossible de mettre à jour le compte.'
				});
			}

			return fail(500, {
				profileError: 'Impossible de mettre à jour le compte.'
			});
		}

		try {
			await students.studentsControllerUpdateMeV1({
				first_name,
				last_name,
				birthdate,
				bio: bio || undefined,
				links
			});
		} catch (error: unknown) {
			if (error instanceof Response) {
				const payload = await error.json().catch(() => null);
				return fail(error.status, {
					profileError:
						typeof payload === 'object' &&
						payload &&
						'message' in payload &&
						typeof payload.message === 'string'
							? payload.message
							: 'Impossible de mettre à jour le profil étudiant.'
				});
			}

			return fail(500, {
				profileError: 'Impossible de mettre à jour le profil étudiant.'
			});
		}

		return {
			profileSuccess: 'Informations du compte mises à jour.',
			profileNotice:
				"Les domaines d'activité ne sont pas encore enregistrés côté serveur avec le SDK actuel."
		};
	},
	changePassword: async (event) => {
		const { cookies, fetch } = event;
		const { currentPassword, newPassword, confirmPassword } = await getPasswordFields(event);

		if (!currentPassword || !newPassword || !confirmPassword) {
			return fail(400, {
				passwordError: 'Tous les champs du mot de passe sont requis.'
			});
		}

		if (newPassword !== confirmPassword) {
			return fail(400, {
				passwordError: 'La confirmation du nouveau mot de passe ne correspond pas.'
			});
		}

		if (newPassword.length < 8) {
			return fail(400, {
				passwordError: 'Le nouveau mot de passe doit contenir au moins 8 caractères.'
			});
		}

		const authenticatedFetch = FynFetchClients.from_cookies(cookies, undefined, fetch);
		const accounts = useApi(AccountsApi, authenticatedFetch);
		const email = await accounts
			.accountsControllerGetMeV1()
			.then((account) => (account as MeRouteAsStudentResponse).account.email)
			.catch(() => undefined);

		if (!email) {
			return fail(401, {
				passwordError: "Impossible d'identifier le compte connecté."
			});
		}

		const auth = useApi(AuthApi, FynFetchClients.guest(true, fetch));
		const isCurrentPasswordValid = await auth
			.authControllerLoginV1({ email, password: currentPassword })
			.then(() => true)
			.catch(() => false);

		if (!isCurrentPasswordValid) {
			return fail(400, {
				passwordError: 'Le mot de passe actuel est incorrect.'
			});
		}

		const updateResult = await accounts
			.accountsControllerUpdateMeV1({
				password: newPassword
			})
			.then(() => null)
			.catch(async (error: unknown) => {
				if (error instanceof Response) {
					const payload = await error.json().catch(() => null);
					const message =
						typeof payload === 'object' &&
						payload &&
						'message' in payload &&
						typeof payload.message === 'string'
							? payload.message
							: 'Impossible de mettre à jour le mot de passe.';

					return fail(error.status, {
						passwordError: message
					});
				}

				return fail(500, {
					passwordError: 'Impossible de mettre à jour le mot de passe.'
				});
			});

		if (updateResult) {
			return updateResult;
		}

		return {
			passwordSuccess: 'Mot de passe mis à jour.'
		};
	}
};
