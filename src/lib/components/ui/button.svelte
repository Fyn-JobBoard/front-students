<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { AriaRole, HTMLAttributeAnchorTarget, MouseEventHandler } from 'svelte/elements';

	const {
		type,
		action,
		size = 'default',
		children
	}: {
		type: 'primary' | 'secondary' | 'neutral';
		size?: 'default' | 'small';
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
			'inline-flex w-fit cursor-pointer items-center justify-center rounded-full font-corp': true,
			'px-4 py-2.5': size === 'default',
			'px-3 py-1.5 text-sm': size === 'small',
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
