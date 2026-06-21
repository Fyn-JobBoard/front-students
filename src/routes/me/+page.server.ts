import { FynFetchClients, useApi } from '$lib/server/api/api';
import { ApplicationsApi, type Application } from 'fyn-api-sdk';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	const applicationsApi = useApi(
		ApplicationsApi,
		FynFetchClients.from_cookies(cookies, undefined, fetch)
	);

	const applications = await applicationsApi.applicationsControllerFindMineV1().catch((reason) => {
		console.error(reason);
		return [] as Application[];
	});

	return {
		applications
	};
};
