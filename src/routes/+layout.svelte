<script lang="ts">
	import favicon from '$lib/assets/brand/icon-blue.svg';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import '$lib/styles/app.css';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header loginStatus={data.hasSessionCookie} />

<main class="min-h-[60svh]">
	{@render children()}
</main>

<Footer />
