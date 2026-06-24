import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
	return {
		hasSessionCookie: !!cookies.get(import.meta.env.APP_AUTH_COOKIE)
	};
};
