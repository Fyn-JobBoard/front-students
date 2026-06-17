import { redirect } from '@sveltejs/kit';
import { Account, AccountsApi, StudentsApi, type Student } from 'fyn-api-sdk';
import { FynFetchClients, useApi } from '$lib/server/api/api';
import type { LayoutServerLoad } from './$types';

type JwtClaims = {
	sub?: string;
	id?: string;
	account_id?: string;
	email?: string;
	name?: string;
	first_name?: string;
	last_name?: string;
	given_name?: string;
	family_name?: string;
	account?: {
		id?: string;
		email?: string;
		type?: Account.TypeEnum;
	};
};

const decodeJwtClaims = (jwt: string): JwtClaims => {
	const [, payload] = jwt.split('.');

	if (!payload) {
		return {};
	}

	try {
		return JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
	} catch {
		return {};
	}
};

const formatBirthdate = (birthdate?: string) => {
	if (!birthdate) {
		return 'Date de naissance non renseignée';
	}

	return new Intl.DateTimeFormat('fr-FR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(new Date(birthdate));
};

export const load: LayoutServerLoad = async ({ cookies, fetch, url }) => {
	const jwt = cookies.get(import.meta.env.APP_AUTH_COOKIE);

	if (!jwt) {
		redirect(303, `/login?redirect=${encodeURIComponent(url.pathname)}`);
	}

	const claims = decodeJwtClaims(jwt);
	const authenticatedFetch = FynFetchClients.from_cookies(cookies, undefined, fetch);
	const accounts = useApi(AccountsApi, authenticatedFetch);
	const students = useApi(StudentsApi, authenticatedFetch);

	const accountId = claims.account?.id ?? claims.sub ?? claims.id ?? claims.account_id;
	const fallbackEmail = claims.account?.email ?? claims.email;

	const account: Account | null = accountId
		? await accounts.accountsControllerGetV1(accountId).catch(() => null)
		: null;

	const email = account?.email ?? fallbackEmail;
	const accountType = account?.type ?? claims.account?.type;
	const student: Student | null =
		accountType === Account.TypeEnum.Student && accountId
			? await students
					.studentsControllerGetV1(accountId)
					.catch(async () =>
						email
							? students
									.studentsControllerListV1(undefined, 1, email)
									.then((response) => response.list[0] ?? null)
									.catch(() => null)
							: null
					)
			: null;

	const firstName = student?.first_name ?? claims.first_name ?? claims.given_name;
	const lastName = student?.last_name ?? claims.last_name ?? claims.family_name;
	const identifier = claims.name ?? email ?? 'Compte utilisateur';

	return {
		user: {
			identifier,
			firstName,
			lastName,
			email,
			info: formatBirthdate(student?.birthdate)
		}
	};
};
