import { FynFetchClients, useApi } from '$lib/server/api/api';
import { redirect } from '@sveltejs/kit';
import {
	Account,
	AccountsApi,
	type MeRouteAsAdministratorResponse,
	type MeRouteAsCompanyResponse,
	type MeRouteAsManagedResponse,
	type MeRouteAsStudentResponse
} from 'fyn-api-sdk';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	const authenticatedFetch = FynFetchClients.from_cookies(cookies, undefined, fetch);
	const accountsApi = useApi(AccountsApi, authenticatedFetch);

	const me = (await accountsApi.accountsControllerGetMeV1().catch((reason) => {
		console.error(reason);
		return null;
	})) as  // Maltyped sdk (issue in the generator)
		| MeRouteAsStudentResponse
		| MeRouteAsAdministratorResponse
		| MeRouteAsCompanyResponse
		| MeRouteAsManagedResponse
		| null;

	if (me?.account.type !== Account.TypeEnum.Student) {
		throw redirect(303, '/login');
	}

	return {
		me: me as MeRouteAsStudentResponse
	};
};
