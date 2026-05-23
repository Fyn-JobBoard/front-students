<script lang="ts">
	import type { Snippet } from 'svelte';
	import Tag from '../ui/tag.svelte';

	const {
		title,
		children,
		tag
	}: {
		/**
		 * Each odd values will be yellow while the even one will be blue.
		 */
		title: string | string[];
		tag?: string;
		children?: Snippet;
	} = $props();
</script>

<section class="bg-butter-yellow p-8">
	<div class="mx-auto grid max-w-190 justify-items-center gap-8">
		{#if tag}
			<Tag text={tag} ping class="font-semibold max-md:text-sm" />
		{/if}

		<h1 class="text-center font-headings text-3xl font-extrabold md:text-6xl">
			{#each typeof title === 'string' ? [title] : title as content, index}
				<span class={index % 2 ? 'text-lighthouse-yellow' : 'text-ocean-blue'}>
					{content}
				</span>
			{/each}
		</h1>

		{#if children}
			<div>
				{@render children()}
			</div>
		{/if}
	</div>
</section>
