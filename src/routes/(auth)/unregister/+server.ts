import { FynFetchClients, useApi } from '$lib/server/api/api';
import { redirect } from '@sveltejs/kit';
import {
	AccountsApi,
	type MeRouteAsAdministratorResponse,
	type MeRouteAsCompanyResponse,
	type MeRouteAsManagedResponse,
	type MeRouteAsStudentResponse
} from 'fyn-api-sdk';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, fetch }) => {
	let accountDeleted = false;

	const authenticatedFetch = FynFetchClients.from_cookies(cookies, undefined, fetch);
	const accountsApi = useApi(AccountsApi, authenticatedFetch);
	const account = (await accountsApi.accountsControllerGetMeV1().catch((reason) => {
		console.error(reason);
		return null;
	})) as
		| MeRouteAsStudentResponse
		| MeRouteAsAdministratorResponse
		| MeRouteAsCompanyResponse
		| MeRouteAsManagedResponse
		| null;

	if (!account) {
		throw redirect(301, '/login');
	}

	const deleted = await accountsApi.accountsControllerDeleteV1(account.id).catch((reason) => {
		console.error(reason);
		return null;
	});

	if (deleted) {
		cookies.delete(import.meta.env.APP_AUTH_COOKIE, {
			path: '/'
		});
	}

	throw redirect(303, '/');
};
