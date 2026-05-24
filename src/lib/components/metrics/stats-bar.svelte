<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Metric from './metric.svelte';

	const {
		metrics
	}: {
		metrics: ComponentProps<typeof Metric>[];
	} = $props();
</script>

<ul
	class="flex flex-wrap items-center justify-between gap-x-8 gap-y-10 rounded-3xl bg-white px-12 py-8"
>
	{#each metrics as metric}
		<li class="grid w-fit place-content-center">
			<Metric {...metric} />
		</li>
	{/each}
</ul>
