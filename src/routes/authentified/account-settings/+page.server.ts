import { FynFetchClients, useApi } from '$lib/server/api/api';
import { ActivityDomainsApi, type ActivityDomain } from 'fyn-api-sdk';
import type { PageServerLoad } from './$types';

type ActivityDomainsResponse = ActivityDomain[] | { list?: ActivityDomain[] };

const toDomainList = (response: ActivityDomainsResponse): ActivityDomain[] => {
	if (Array.isArray(response)) {
		return response;
	}

	return response.list ?? [];
};

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	const activityDomainsApi = useApi(
		ActivityDomainsApi,
		FynFetchClients.from_cookies(cookies, FynFetchClients.guest(undefined, fetch), fetch)
	);

	const activityDomains = await activityDomainsApi
		.activityDomainsControllerFindAllV1()
		.then((response) => toDomainList(response as ActivityDomainsResponse))
		.catch((reason) => {
			console.error(reason);
			return [];
		});

	return {
		activityDomains
	};
};
