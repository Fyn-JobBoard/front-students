import path from 'path';

export class FynAPIClient {
	constructor(
		private readonly endpoint: string,
		private readonly token: string,
		private readonly version: number = 1
	) {}

	/**
	 * Get the final api url
	 */
	url(...paths: string[]) {
		return new URL(path.join(...paths), path.join(this.endpoint, `v${this.version}`));
	}
	/**
	 * Make a new request to the api
	 */
	request(
		target: string | URL,
		init?: Omit<RequestInit, 'headers'> & { headers?: Record<string, string> }
	) {
		init ??= {};
		init.headers ??= {};
		init.headers['Authorization'] ??= `Bearer ${this.token}`;

		const url = target instanceof URL ? target : this.url(target);
		url.host = this.url().toString();
		return fetch(url, init);
	}
	requestBy(
		target: string | URL,
		auth: string | { email: string; password: string },
		init?: Omit<RequestInit, 'headers'> & { headers?: Record<string, string> }
	) {
		init ??= {};
		init.headers ??= {};
		init.headers['Authorization'] =
			typeof auth === 'string'
				? `Bearer ${auth}`
				: `Basic ${new TextEncoder().encode(`${auth.email}:${auth.password}`).toBase64()}`;

		return this.request(target, init);
	}
}

export default new FynAPIClient(
	import.meta.env.API_ENDPOINT,
	import.meta.env.API_TOKEN,
	parseInt(import.meta.env.API_VERSION)
);
