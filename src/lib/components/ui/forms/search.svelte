<script lang="ts">
	import type { EventHandler } from 'svelte/elements';
	import Button from '../button.svelte';
	import Tag from '../tag.svelte';

	let {
		name,
		value = $bindable(),
		placeholder,
		suggestions,
		action,
		onsubmit
	}: {
		name: string;
		value?: string;

		placeholder?: string;
		suggestions?: string[];
		action?: string;
		onsubmit?: EventHandler<SubmitEvent, HTMLFormElement>;
	} = $props();

	const id = $derived(`search_${name}`);
</script>

<form {action} method="get" {onsubmit} class="rounded-3xl bg-white p-2 shadow-xl">
	<section class="flex items-center gap-4 p-4">
		<label
			class="flex grow items-center gap-[inherit]"
			for={id}
			aria-label={placeholder ?? 'Effectuer une recherche'}
		>
			<span>🔍</span>
			<input
				class="grow border-none p-0 font-light text-black ring-0"
				type="text"
				bind:value
				{name}
				{id}
				{placeholder}
			/>
		</label>

		<Button type="secondary" action={{ type: 'submit' }}>Rechercher</Button>
	</section>

	{#if suggestions?.length}
		<section
			class="grid grid-cols-[auto_1fr] items-center gap-4 rounded-2xl bg-[#F6F7FC] px-8 py-1 text-sm"
		>
			<h3 class="text-ecume-blue">Suggestions :</h3>
			<ul class="flex w-full gap-4 overflow-x-scroll py-2">
				{#each suggestions as suggestion}
					<li>
						<button
							class="cursor-pointer text-nowrap"
							type="button"
							onclick={() => (value = suggestion)}
						>
							<Tag text={suggestion} thin selected={suggestion === value} />
						</button>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</form>

<style>
	/* It's surely a bad thing, but idk how to design it */
	ul {
		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
