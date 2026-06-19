import { redirect } from '@sveltejs/kit';
import { AccountsApi, type MeRouteAsStudentResponse } from 'fyn-api-sdk';
import { FynFetchClients, useApi } from '$lib/server/api/api';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, fetch }) => {
	let accountDeleted = false;

	const authenticatedFetch = FynFetchClients.from_cookies(cookies, undefined, fetch);
	const accountsApi = useApi(AccountsApi, authenticatedFetch);
	const accountId = await accountsApi
		.accountsControllerGetMeV1()
		.then((account) => (account as MeRouteAsStudentResponse).id)
		.catch((reason) => {
			console.error(reason);
			return undefined;
		});

	if (accountId) {
		try {
			await accountsApi.accountsControllerDeleteV1(accountId);
			accountDeleted = true;
		} catch (reason) {
			console.error(reason);
		}
	}

	if (accountDeleted) {
		cookies.delete(import.meta.env.APP_AUTH_COOKIE, {
			path: '/'
		});
	}

	throw redirect(303, '/');
};
