<script lang="ts" module>
	import type { ComponentProps } from 'svelte';

	export const NAVIGATION = {
		Accueil: '/',
		Offres: '/jobs',
		Entreprises: '/companies',
		'A propos': '/fyn',
		Contact: '/contact'
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
	import Logo from '$lib/assets/brand/logo-blue.svg';
	import Button from './ui/button.svelte';
</script>

<header
	class={[
		'group/header fixed top-0 left-0 flex w-full justify-between px-8 lg:items-center lg:py-4',

		// mobile version
		'max-lg:h-full max-lg:not-has-checked:pointer-events-none',
		'max-lg:transition-colors max-lg:has-checked:bg-butter-yellow',
		'max-lg:grid max-lg:grid-cols-1 max-lg:grid-rows-[auto_1fr_auto]',
		'max-lg:duration-700 max-lg:**:duration-700'
	]}
>
	<div
		class="pointer-events-auto max-lg:flex max-lg:h-fit max-lg:w-full max-lg:items-center max-lg:justify-between max-lg:py-4 lg:h-full"
	>
		<a href="/" class="flex h-12 w-fit">
			<img src={Logo} alt="Logo Fyn" />
		</a>

		<input type="checkbox" name="menu_toggler" class="lg:hidden" aria-hidden="true" />
	</div>

	<nav
		class={[
			'rounded-full p-1.5 font-medium text-ocean-blue lg:bg-reflect-yellow',
			'max-lg:grid max-lg:h-full max-lg:content-center max-lg:text-2xl'
		]}
	>
		<ul class="flex h-full justify-between gap-0.5 max-lg:flex-col lg:items-center">
			{#each Object.entries(NAVIGATION) as [label, url_str], index}
				{@const url = new URL(url_str, page.url)}
				{@const is_local = url.host === page.url.host}
				{@const is_current = is_local && url.pathname === page.url.pathname}

				<li
					style:--index={index}
					class="
				transition-[translate,opacity]
				delay-[calc(0.025s*var(--index))]
				max-lg:group-not-has-checked/header:-translate-x-full
				max-lg:group-not-has-checked/header:opacity-0
				"
				>
					<a
						class={{
							'py-2 lg:px-4': true,
							'max-lg:underline lg:block lg:rounded-full lg:bg-white lg:font-semibold': is_current
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

	<nav
		class="transition-transform max-lg:py-4 max-lg:group-not-has-checked/header:translate-y-full"
	>
		<ul class="flex items-center gap-2 max-lg:justify-center max-lg:gap-8">
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

<style>
	input {
		--bars-shift: 15%;
		--bars-height: 10%;
		--bars-width: 2.5rem;

		position: relative;
		appearance: none;
		background: transparent !important;
		border: none;
		height: var(--bars-width);
		width: var(--bars-width);
		outline: none;
		box-shadow: none;

		&::before,
		&::after {
			content: '';
			position: absolute;
			translate: 0 -50%;
			left: 0;
			width: 100%;
			height: var(--bars-height);
			background-color: var(--color-ocean-blue);
			transition-property: top, rotate;
			will-change: top, rotate;
			transition-duration: 0.25s;
		}

		&::before {
			top: calc(50% - var(--bars-shift));
		}
		&::after {
			top: calc(50% + var(--bars-shift));
		}

		&:checked {
			--bars-shift: 0px;
			&::before {
				rotate: 45deg;
			}
			&::after {
				rotate: -45deg;
			}
		}
	}
</style>
