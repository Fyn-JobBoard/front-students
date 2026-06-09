<script lang="ts">
	import PdfCard, { type PdfResource } from '$lib/components/cards/pdf.svelte';

	let { resources = [] }: { resources?: PdfResource[] } = $props();
</script>

<section class="mx-auto w-full max-w-6xl px-4 py-12 pt-28 sm:px-6 lg:px-8">
	<div class="mb-8 max-w-2xl">
		<p class="text-picton-blue text-sm font-semibold tracking-wider uppercase">Ressources</p>
		<h1 class="font-display mt-2 text-3xl font-semibold text-ocean-blue sm:text-4xl">
			Guides et documents utiles
		</h1>
	</div>

	<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
		{#each resources as resource}
			<PdfCard {resource} />
		{/each}
	</div>
</section>
