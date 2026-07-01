import { FynFetchClients, useApi } from '$lib/server/api/api';
import { JobsApi, type ListJobsResponse } from 'fyn-api-sdk';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, url, cookies }) => {
	const jobs = useApi(
		JobsApi,
		FynFetchClients.from_cookies(cookies, FynFetchClients.guest(undefined, fetch), fetch)
	);

	const page = parseInt(url.searchParams.get('page') ?? '');

	return Response.json(
		await jobs
			.jobsControllerFindAllV1(
				isNaN(page) ? 1 : page,
				undefined,
				url.searchParams.get('query') ?? undefined,
				url.searchParams.get('company_id') ?? undefined,
				url.searchParams
					.getAll('activity_domain')
					.map(parseInt)
					.filter((v) => !isNaN(v)),
				url.searchParams.get('contract') ?? undefined
			)
			.catch((r) => {
				console.error(r);
				return {
					list: [],
					page: 0,
					pages: 0
				} satisfies ListJobsResponse;
			})
	);
};
