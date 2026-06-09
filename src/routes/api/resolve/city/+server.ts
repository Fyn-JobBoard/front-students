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
	let chached;
	if ((chached = cache.get(cache_key))) {
		return json(chached);
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
		.then((r) => r.json())
		.then((data) => {
			if (!('results' in data)) {
				return null;
			}

			return data.results[0] ?? null;
		});

	if (answer) {
		cache.set(cache_key, answer);
	}
	return json(answer);
};
