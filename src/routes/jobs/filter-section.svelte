<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		title,
		children
	}: {
		title: string;
		children: Snippet;
	} = $props();
</script>

<section class="not-first:mt-4 not-first:pt-4 not-first:border-t-2 not-first:border-[#EEEEEE]">
	<h3 class="font-semibold">{title}</h3>
	<div class="mt-1">
		{@render children()}
	</div>
</section>
