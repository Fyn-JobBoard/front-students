import { FynFetchClients, useApi } from '$lib/server/api/api';
import { ActivityDomainsApi, type ActivityDomain } from 'fyn-api-sdk';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	const jobs = useApi(
		ActivityDomainsApi,
		FynFetchClients.from_cookies(cookies, FynFetchClients.guest(undefined, fetch), fetch)
	);

	const domains: ActivityDomain[] = await jobs
		.activityDomainsControllerFindAllV1()
		// todo -> change to r.list (according to the next version of the api)
		.then((r) => r.list)
		.catch((r) => {
			console.error(r);
			return [];
		});

	return {
		domains
	};
};
