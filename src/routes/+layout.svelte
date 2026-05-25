<script lang="ts">
	import favicon from '$lib/assets/brand/icon-yellow.svg';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import '$lib/styles/app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />

<main class="min-h-screen">
	{@render children()}
</main>

<Footer />
