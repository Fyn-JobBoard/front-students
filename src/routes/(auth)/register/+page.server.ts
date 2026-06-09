import { FynFetchClients, useApi } from '$lib/server/api/api';
import { fail, type Actions } from '@sveltejs/kit';
import { AccountsApi, RequiredError } from 'fyn-api-sdk';

export const actions: Actions = {
	default: async ({ fetch, request, cookies }) => {
		const accounts = useApi(AccountsApi, FynFetchClients.guest(false, fetch));
		const data = await request.formData();
		const email = data.get('email')?.toString(),
			password = data.get('password')?.toString(),
			first_name = data.get('first_name')?.toString(),
			last_name = data.get('last_name')?.toString();

		if (!(email && password && first_name && last_name)) {
			return fail(400, {
				error: 'Some fields are missing.'
			});
		}

		const registered = await accounts
			.accountsControllerCreateV1({
				email,
				password,
				student: {
					first_name,
					last_name,
					// todo -> implémenter l'année de naissance
					birthdate: '2000-01-01'
				}
			})
			.catch(async (err: RequiredError | Response) => {
				if (err instanceof Response)
					return fail(err.status, { error: await err.json().then((r) => r.message) });
				return fail(400, { error: err.name });
			});

		if ('jwt' in registered) {
			cookies.set(import.meta.env.APP_AUTH_COOKIE, registered.jwt, {
				sameSite: 'strict',
				path: '/'
			});
		}

		return registered;
	}
};
