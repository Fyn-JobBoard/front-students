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

<form {action} method="get" {onsubmit}>
	<section>
		<label for={id} aria-label={placeholder ?? 'Effectuer une recherche'}>
      <span>🔍</span>
			<input type="text" bind:value {name} {id} {placeholder} />
		</label>

		<Button type="secondary" action={{ type: 'submit' }}>Rechercher</Button>
	</section>

	{#if suggestions?.length}
		<section>
			<h3>Suggestions :</h3>
			<ul>
				{#each suggestions as suggestion}
					<li>
						<button class="cursor-pointer" type="button" onclick={() => (value = suggestion)}>
							<Tag text={suggestion} thin selected={suggestion === value} />
						</button>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</form>
