import { redirect } from '@sveltejs/kit';
import { AccountsApi } from 'fyn-api-sdk';
import { FynFetchClients, useApi } from '$lib/server/api/api';
import type { RequestHandler } from './$types';

type JwtClaims = {
	sub?: string;
	id?: string;
	account_id?: string;
	account?: {
		id?: string;
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

export const GET: RequestHandler = async ({ cookies, fetch }) => {
	const jwt = cookies.get(import.meta.env.APP_AUTH_COOKIE);

	if (!jwt) {
		throw redirect(303, '/login');
	}

	const claims = decodeJwtClaims(jwt);
	const accountId = claims.account?.id ?? claims.sub ?? claims.id ?? claims.account_id;

	if (accountId) {
		const accountsApi = useApi(
			AccountsApi,
			FynFetchClients.from_cookies(cookies, undefined, fetch)
		);

		await accountsApi.accountsControllerDeleteV1(accountId).catch((reason) => {
			console.error(reason);
		});
	}

	cookies.delete(import.meta.env.APP_AUTH_COOKIE, {
		path: '/'
	});

	throw redirect(303, '/');
};
