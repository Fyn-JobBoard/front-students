<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { AriaRole, HTMLAttributeAnchorTarget, MouseEventHandler } from 'svelte/elements';

	const {
		type,
		action,
		children
	}: {
		type: 'primary' | 'secondary' | 'neutral';
		children: Snippet;
		action:
			| {
					url: string | URL;
					target?: HTMLAttributeAnchorTarget;
			  }
			| {
					onclick: MouseEventHandler<HTMLButtonElement>;
					role: AriaRole;
			  };
	} = $props();
</script>

{#snippet content()}
	<div
		class={{
			'cursor-pointer rounded-full py-2.5 px-4 font-corp': true,
			'bg-ocean-blue text-white': type === 'primary',
			'bg-lighthouse-yellow text-ocean-blue': type === 'secondary',
			'border-2 border-ocean-blue bg-transparent text-ocean-blue': type === 'neutral'
		}}
	>
		{@render children()}
	</div>
{/snippet}

{#if 'url' in action}
	<a href={action.url.toString()} target={action.target}>
		{@render content()}
	</a>
{:else}
	<button onclick={action.onclick} role={action.role}>
		{@render content()}
	</button>
{/if}
