import { error } from '@sveltejs/kit';
import { FynFetchClients, useApi } from '$lib/server/api/api';
import { JobsApi, type Job } from 'fyn-api-sdk';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch, params }) => {
	const jobs = useApi(
		JobsApi,
		FynFetchClients.from_cookies(cookies, FynFetchClients.guest(undefined, fetch), fetch)
	);

	const job = await jobs.jobsControllerFindOneV1(params.id).catch((reason) => {
		console.error(reason);
		throw error(404, 'Offre introuvable');
	});

	const similarJobs = await jobs
		.jobsControllerFindAllV1(1, undefined, job.activity_domain?.name)
		.then((r) => r.list.filter((j: Job) => j.id !== job.id).slice(0, 3))
		.catch((reason) => {
			console.error(reason);
			return [] as Job[];
		});

	return {
		job,
		similarJobs
	};
};