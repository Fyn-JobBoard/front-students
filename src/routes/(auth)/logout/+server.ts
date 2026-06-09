import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ cookies }) => {
	cookies.delete(import.meta.env.APP_AUTH_COOKIE, {
		path: '/'
	});

	throw redirect(303, '/');
};
