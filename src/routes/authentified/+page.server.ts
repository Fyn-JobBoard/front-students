import { FynFetchClients, useApi } from '$lib/server/api/api';
import { ApplicationsApi, type Application } from 'fyn-api-sdk';
import type { PageServerLoad } from './$types';

type ApplicationsResponse =
	| Application[]
	| {
			list?: Application[];
			data?: Application[];
			items?: Application[];
			results?: Application[];
	  };

const toApplicationList = (response: ApplicationsResponse): Application[] => {
	if (Array.isArray(response)) {
		return response;
	}

	return response.list ?? response.data ?? response.items ?? response.results ?? [];
};

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	const applicationsApi = useApi(
		ApplicationsApi,
		FynFetchClients.from_cookies(cookies, undefined, fetch)
	);

	const applications: Application[] = await applicationsApi
		.applicationsControllerFindMineV1()
		.then((response) => {
			const list = toApplicationList(response as ApplicationsResponse);
			console.info('[authentified] applications loaded', {
				responseType: Array.isArray(response) ? 'array' : typeof response,
				keys: response && typeof response === 'object' ? Object.keys(response) : [],
				count: list.length
			});
			return list;
		})
		.catch((reason) => {
			console.error(reason);
			return [];
		});

	return {
		applications
	};
};
