import { FynFetchClients, useApi } from '$lib/server/api/api';
import { fail, type Actions, type RequestEvent } from '@sveltejs/kit';
import {
	Account,
	AccountsApi,
	ActivityDomainsApi,
	AuthApi,
	StudentsApi,
	type ActivityDomain,
	type Student
} from 'fyn-api-sdk';
import type { PageServerLoad } from './$types';

type ActivityDomainsResponse = ActivityDomain[] | { list?: ActivityDomain[] };
type JwtClaims = {
	sub?: string;
	id?: string;
	account_id?: string;
	email?: string;
	account?: {
		id?: string;
		email?: string;
		type?: Account.TypeEnum;
	};
};
type StudentWithExtras = Student & {
	activity_domains?: ActivityDomain[];
};

const toDomainList = (response: ActivityDomainsResponse): ActivityDomain[] => {
	if (Array.isArray(response)) {
		return response;
	}

	return response.list ?? [];
};

const decodeJwtClaims = (jwt: string): JwtClaims => {
	const [, payload] = jwt.split('.');

	if (!payload) {
		return {};
	}

	try {
		return JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as JwtClaims;
	} catch {
		return {};
	}
};

const pickLinks = (links: string[] = []) => {
	const github = links.find((link) => link.includes('github.com')) ?? '';
	const linkedin = links.find((link) => link.includes('linkedin.com')) ?? '';
	const portfolio = links.find((link) => link !== github && link !== linkedin) ?? '';

	return { github, linkedin, portfolio };
};

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	const jwt = cookies.get(import.meta.env.APP_AUTH_COOKIE);
	const claims = jwt ? decodeJwtClaims(jwt) : {};
	const authenticatedFetch = FynFetchClients.from_cookies(cookies, FynFetchClients.guest(undefined, fetch), fetch);
	const activityDomainsApi = useApi(
		ActivityDomainsApi,
		authenticatedFetch
	);
	const accounts = useApi(AccountsApi, authenticatedFetch);
	const students = useApi(StudentsApi, authenticatedFetch);

	const activityDomains = await activityDomainsApi
		.activityDomainsControllerFindAllV1()
		.then((response) => toDomainList(response as ActivityDomainsResponse))
		.catch((reason) => {
			console.error(reason);
			return [];
		});

	const accountId = claims.account?.id ?? claims.sub ?? claims.id ?? claims.account_id;
	const fallbackEmail = claims.account?.email ?? claims.email;

	const account =
		accountId
			? await accounts.accountsControllerGetV1(accountId).catch(() => null)
			: null;

	const email = account?.email ?? fallbackEmail ?? '';
	const accountType = account?.type ?? claims.account?.type;
	const student: StudentWithExtras | null =
		accountType === Account.TypeEnum.Student && accountId
			? await students
					.studentsControllerGetV1(accountId)
					.then((response) => response as StudentWithExtras)
					.catch(async () =>
						email
							? students
									.studentsControllerListV1(undefined, 1, email)
									.then((response) => (response.list[0] as StudentWithExtras | undefined) ?? null)
									.catch(() => null)
							: null
					)
			: null;

	const links = pickLinks(student?.links ?? []);

	return {
		activityDomains,
		profile: {
			email,
			firstName: student?.first_name ?? '',
			lastName: student?.last_name ?? '',
			birthdate: student?.birthdate ?? '',
			bio: student?.bio ?? '',
			links,
			selectedActivityDomainIds: (student?.activity_domains ?? []).map((domain) => domain.id)
		}
	};
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

		const authenticatedFetch = FynFetchClients.from_cookies(
			cookies,
			FynFetchClients.guest(undefined, fetch),
			fetch
		);
		const accounts = useApi(AccountsApi, authenticatedFetch);
		const students = useApi(StudentsApi, authenticatedFetch);

		const account = await accounts.accountsControllerUpdateMeV1({ email }).catch(async (error: unknown) => {
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
		});

		if ('status' in account) {
			return account;
		}

		const student = await students
			.studentsControllerUpdateMeV1({
				first_name,
				last_name,
				birthdate,
				bio: bio || undefined,
				links
			})
			.catch(async (error: unknown) => {
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
			});

		if ('status' in student) {
			return student;
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

		const jwt = cookies.get(import.meta.env.APP_AUTH_COOKIE);
		const claims = jwt ? decodeJwtClaims(jwt) : {};
		const accountId = claims.account?.id ?? claims.sub ?? claims.id ?? claims.account_id;
		let email = claims.account?.email ?? claims.email;

		if (!email && accountId) {
			const accounts = useApi(
				AccountsApi,
				FynFetchClients.from_cookies(cookies, FynFetchClients.guest(undefined, fetch), fetch)
			);
			email = await accounts
				.accountsControllerGetV1(accountId)
				.then((account) => account.email)
				.catch(() => undefined);
		}

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

		const accounts = useApi(
			AccountsApi,
			FynFetchClients.from_cookies(cookies, FynFetchClients.guest(undefined, fetch), fetch)
		);

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
