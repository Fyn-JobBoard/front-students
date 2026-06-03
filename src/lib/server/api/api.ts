import type { FetchAPI } from 'fyn-api-sdk';

/**
 * Because the Swagger-Codegen has an issue with bearer authentification,
 * we must use a custom fetch client to add when need the jwt/authorization to the request.
 *
 * Note:
 * Some pr are open to fix this issue
 * @see https://github.com/swagger-api/swagger-codegen-generators/pull/1425
 * @see https://github.com/swagger-api/swagger-codegen/pull/12750
 */
export class FynFetchClients {
	/**
	 * Make requests as the default user (the one defined in the env)
	 * @param skip_auth Default: `false`
	 * 	- `boolean` -> This will add or remove the Authorization header
	 * 	- `lazy` -> If the authorization header has already been set, do not edit it
	 * @returns
	 */
	public static guest(skip_auth: boolean | 'lazy' | 'force' = false): FetchAPI {
		const { API_TOKEN } = process.env;
		if (!API_TOKEN) {
			return fetch;
		}

		if (skip_auth === 'lazy') {
			return FynFetchClients.auth(
				{
					bearer: API_TOKEN
				},
				true
			);
		}

		return (url, init: RequestInit) => {
			const headers = new Headers(init.headers);
			if (headers.has('Authorization') && skip_auth) {
				headers.delete('Authorization');
			} else if (!skip_auth) {
				headers.set('Authorization', API_TOKEN);
			}

			return fetch(url, {
				...init,
				headers
			});
		};
	}

	/**
	 * Make requests as the given authenticated user
	 * @param authorization The authorization informations
	 * @param lazy If `true`, it will not modify the Authorization header if it has already been set
	 */
	public static auth(
		authorization:
			| {
					bearer: string;
			  }
			| {
					basic: string;
			  }
			| {
					email: string;
					password: string;
			  },
		lazy: boolean = false
	): FetchAPI {
		return (url, init: RequestInit) => {
			const headers = new Headers(init.headers);

			if (headers.has('Authorization') && lazy) {
				return fetch(url, init);
			}

			let auth_value: string;
			if ('basic' in authorization) {
				auth_value = `Basic ${authorization.basic}`;
			} else if ('email' in authorization) {
				auth_value = `Basic ${btoa(`${authorization.email}:${authorization.password}`)}`;
			} else {
				auth_value = `Bearer ${authorization.bearer}`;
			}
			headers.set('Authorization', auth_value);

			return fetch(url, {
				...init,
				headers
			});
		};
	}
}
