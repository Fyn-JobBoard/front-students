import { redirect } from '@sveltejs/kit';
import { Account, AccountsApi, type MeRouteAsStudentResponse } from 'fyn-api-sdk';
import { FynFetchClients, useApi } from '$lib/server/api/api';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	const authenticatedFetch = FynFetchClients.from_cookies(cookies, undefined, fetch);
	const accountsApi = useApi(AccountsApi, authenticatedFetch);
	const student = await accountsApi
		.accountsControllerGetMeV1()
		.then((response) => response as MeRouteAsStudentResponse)
		.catch((reason) => {
			console.error(reason);
			return null;
		});

	if (!student) {
		throw redirect(303, '/login');
	}

	const account = student.account ?? null;

	return {
		student
	};
};
