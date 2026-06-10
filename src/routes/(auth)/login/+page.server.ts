import { FynFetchClients, useApi } from '$lib/server/api/api';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { AuthApi } from 'fyn-api-sdk';

export const actions: Actions = {
	default: async ({ fetch, request, cookies, url }) => {
		const auth = useApi(AuthApi, FynFetchClients.guest(true, fetch));
		const data = await request.formData();
		const email = data.get('email')?.toString(),
			password = data.get('password')?.toString();

		if (!(email && password)) {
			return fail(400, { error: 'Missing email and/or password.' });
		}
		const login = await auth.authControllerLoginV1({ email, password }).catch(() => null);

		if (!login) {
			return fail(401, { error: 'Email ou mot de passe non reconnu' });
		}

		cookies.set(import.meta.env.APP_AUTH_COOKIE, login.jwt, {
			sameSite: 'strict',
			path: '/'
		});

		redirect(303, url.searchParams.get('redirect') ?? '/');
	}
};
