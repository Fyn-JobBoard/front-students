<script lang="ts" module>
	import type { ComponentProps } from 'svelte';

	export const NAVIGATION = {
		Accueil: '/',
		Offres: '/jobs',
		Entreprises: '/companies',
		'A propos': '/fyn',
		Contact: '/contact',
		Test: '/header'
	};
	export const NAVIGATION_CTAS: {
		[key: string]: { url: string; type: ComponentProps<typeof Button>['type'] };
	} = {
		'Se connecter': { url: '/login', type: 'primary' },
		'Je recrute': { url: 'https://hire.fyn.com', type: 'secondary' }
	};
</script>

<script lang="ts">
	import { page } from '$app/state';
	import Logo from '$lib/assets/brand/logo.png';
	import Button from './ui/button.svelte';
</script>

<header class="fixed top-0 left-0 flex w-full items-center justify-between px-8 py-4">
	<a href="/" class="flex h-12 w-fit">
		<img src={Logo} alt="Logo Fyn" />
	</a>
	<nav class="rounded-full bg-reflect-yellow p-1.5 font-medium text-ocean-blue">
		<ul class="flex h-full items-center justify-between gap-0.5">
			{#each Object.entries(NAVIGATION) as [label, url_str]}
				{@const url = new URL(url_str, page.url)}
				{@const is_local = url.host === page.url.host}
				{@const is_current = is_local && url.pathname === page.url.pathname}

				<li>
					<a
						class={{
							'px-4 py-2': true,
							'block rounded-full bg-white font-semibold': is_current
						}}
						aria-hidden={is_current}
						href={url.toString()}
						target={is_local ? '_self' : '_blank'}
					>
						{label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<nav>
		<ul class="flex items-center gap-2">
			{#each Object.entries(NAVIGATION_CTAS) as [label, { url: url_str, type }]}
				{@const url = new URL(url_str, page.url)}
				{@const is_local = url.host !== page.url.host}

				<li>
					<Button
						action={{
							url,
							target: is_local ? '_self' : '_blank'
						}}
						{type}
					>
						{label}
					</Button>
				</li>
			{/each}
		</ul>
	</nav>
</header>
