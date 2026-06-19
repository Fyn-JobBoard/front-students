import { redirect } from '@sveltejs/kit';
import { Account, type Student } from 'fyn-api-sdk';
import { FynFetchClients } from '$lib/server/api/api';
import type { LayoutServerLoad } from './$types';

type MeStudentResponse = Student & {
	email?: string;
	type?: Account.TypeEnum;
	account_id?: string;
	account?: Account | null;
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

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	const authenticatedFetch = FynFetchClients.from_cookies(cookies, undefined, fetch);
	const student = await authenticatedFetch(`${import.meta.env.API_ENDPOINT}/v1/accounts/me`, {
		method: 'GET'
	})
		.then(async (response) => {
			if (!response.ok) {
				throw new Error(`Failed to load current account: ${response.status}`);
			}

			return (await response.json()) as MeStudentResponse;
		})
		.catch((reason) => {
			console.error(reason);
			return null;
		});

	if (!student) {
		throw redirect(303, '/login');
	}

	const account = student.account ?? null;
	const accountType = account?.type ?? student.type;

	if (accountType !== Account.TypeEnum.Student) {
		throw redirect(303, '/login');
	}

	const email = account?.email ?? student.email ?? null;
	const identifier = email ?? 'Compte utilisateur';

	return {
		account: {
			id: account?.id ?? student.account_id ?? student.id ?? null,
			email,
			type: accountType ?? null
		},
		student,
		user: {
			identifier,
			firstName: student.first_name,
			lastName: student.last_name,
			email,
			info: formatBirthdate(student.birthdate)
		}
	};
};
