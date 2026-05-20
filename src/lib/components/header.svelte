<script lang="ts" module>
	export const NAVIGATION = {
		Accueil: '/',
		Offres: '/jobs',
		Entreprises: '/companies',
		'A propos': '/fyn',
		Contact: '/contact'
	};
	export const NAVIGATION_CTAS = {
		'Se connecter': '/login',
		'Je recrute': 'https://hire.fyn.com'
	};
</script>

<script lang="ts">
	import { page } from '$app/state';

	import Logo from '$lib/assets/brand/logo.png';
</script>

<header>
	<a href="/">
		<img src={Logo} alt="Logo Fyn" />
	</a>
	<nav>
		<ul>
			{#each Object.entries(NAVIGATION) as [label, url_str]}
				{@const url = new URL(url_str, page.url)}
				{@const is_local = url.host !== page.url.host}
				{@const is_current = is_local && page.url.pathname === page.url.pathname}

				<li>
					<a aria-hidden={is_current} href={url.toString()} target={is_local ? '_self' : '_blank'}>
						{label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<nav>
		<ul>
			{#each Object.entries(NAVIGATION_CTAS) as [label, url_str]}
				{@const url = new URL(url_str, page.url)}
				{@const is_local = url.host !== page.url.host}

				<li>
					<a href={url.toString()} target={is_local ? '_self' : '_blank'}>
						{label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
