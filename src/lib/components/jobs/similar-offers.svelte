<script lang="ts">
	import type { Job } from 'fyn-api-sdk';
	import Card from './card.svelte';

	const { jobs }: { jobs: Job[] } = $props();
</script>

{#if jobs.length > 0}
	<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
		<h2 class="mb-8 font-headings text-2xl font-extrabold text-ocean-blue">Offres similaires</h2>
		<ul class="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
			{#each jobs as job}
				<li>
					<Card {job} />
				</li>
			{/each}
		</ul>
	</section>
{/if}
