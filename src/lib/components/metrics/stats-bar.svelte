<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Metric from './metric.svelte';

	const {
		metrics
	}: {
		metrics: ComponentProps<typeof Metric>[];
	} = $props();
</script>

<ul class="flex items-center justify-between rounded-3xl bg-white px-12 py-8">
	{#each metrics as metric, index}
		{#if index}
			<li aria-hidden="true" class="flex h-full items-center justify-center">
				<hr class="h-70/100 w-0.5 rounded-full border-none bg-bleuet-blue" />
			</li>
		{/if}
		<li>
			<Metric {...metric} />
		</li>
	{/each}
</ul>
