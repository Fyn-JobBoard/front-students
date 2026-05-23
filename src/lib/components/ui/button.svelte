<script lang="ts">
	import type { Snippet } from 'svelte';
	import type {
		HTMLAttributeAnchorTarget,
		HTMLButtonAttributes,
		MouseEventHandler
	} from 'svelte/elements';

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
					type: HTMLButtonAttributes['type'];
					onclick?: MouseEventHandler<HTMLButtonElement>;
					role?: HTMLButtonAttributes['role'];
			  };
	} = $props();
</script>

{#snippet content()}
	<div
		class={{
			'cursor-pointer rounded-full px-4 py-2.5 font-corp': true,
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
	<button {...action}>
		{@render content()}
	</button>
{/if}
