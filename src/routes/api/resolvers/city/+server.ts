import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const cache = new Map<string, any>();

export const GET: RequestHandler = async ({ url, fetch }) => {
	const lat = parseFloat(url.searchParams.get('lat') ?? ''),
		lng = parseFloat(url.searchParams.get('lng') ?? '');
	if (!(lat && lng)) {
		throw error(400, 'Missing or invalid lat/lng params.');
	}

	const cache_key = `${lat}:${lng}`;
	if (cache.has(cache_key)) {
		return json(cache.get(cache_key)!);
	}

	const params = new URLSearchParams({
		lat: lat.toString(),
		lon: lng.toString(),
		apiKey: import.meta.env.GEOAPIFY_TOKEN,
		format: 'json',
		type: 'city'
	});

	const endpoint = new URL(`?${params.toString()}`, 'https://api.geoapify.com/v1/geocode/reverse');

	const answer = await fetch(endpoint)
		.catch(() => null)
		.then((r) => r?.json())
		.then((data) => data.results[0]);

	if (answer) {
		cache.set(cache_key, answer);
	}
	return json(answer);
};
