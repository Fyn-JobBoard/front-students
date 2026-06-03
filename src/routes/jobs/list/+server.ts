import { FynFetchClients, useApi } from '$lib/server/api/api';
import { JobsApi, type ListJobsResponse } from 'fyn-api-sdk';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, url }) => {
	const jobs = useApi(JobsApi, FynFetchClients.guest(undefined, fetch));

	const page = parseInt(url.searchParams.get('page') ?? '');

	return Response.json(
		await jobs
			.jobsControllerFindAllV1(
				isNaN(page) ? 1 : page,
				undefined,
				url.searchParams.get('query') ?? undefined
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
