import { redirect } from '@sveltejs/kit';
import { AccountsApi } from 'fyn-api-sdk';
import { FynFetchClients, useApi } from '$lib/server/api/api';
import type { RequestHandler } from './$types';

type MeResponse = {
	id?: string;
};

export const GET: RequestHandler = async ({ cookies, fetch }) => {
	const jwt = cookies.get(import.meta.env.APP_AUTH_COOKIE);
	let accountDeleted = false;

	if (!jwt) {
		throw redirect(303, '/login');
	}

	const authenticatedFetch = FynFetchClients.from_cookies(cookies, undefined, fetch);
	const accountId = await authenticatedFetch(`${import.meta.env.API_ENDPOINT}/v1/accounts/me`, {
		method: 'GET'
	})
		.then(async (response) => {
			if (!response.ok) {
				throw new Error(`Failed to load current account: ${response.status}`);
			}

			const account = (await response.json()) as MeResponse;
			return account.id;
		})
		.catch((reason) => {
			console.error(reason);
			return undefined;
		});

	if (accountId) {
		const accountsApi = useApi(AccountsApi, authenticatedFetch);

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
