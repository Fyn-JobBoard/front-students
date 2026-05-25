<script module lang="ts">
	export type ContractType = 'intership' | 'stage' | 'alternating_stage';
	export interface Filters {
		contract?: ContractType[];
		activity_domain_ids?: number[];
		localisation?: string[];
		duration?: number;
		source?: string[];
	}

	const contractLabels: {
		[key in ContractType]: string;
	} = {
		stage: 'Stage',
		alternating_stage: 'Stage alterné',
		intership: 'Alternance'
	};

	export const ACTIVITY_DOMAINS = {
		Marketing: 1,
		Développement: 2,
		Design: 3
	};

	export const LOCALISATIONS = ['Paris', 'Lyon', 'Nante'];
</script>

<script lang="ts">
	import Checkbox from '$lib/components/ui/forms/checkbox.svelte';
	import Range from '$lib/components/ui/forms/range.svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import FilterSection from './filter-section.svelte';

	let {
		filters = $bindable()
	}: {
		filters?: Filters;
	} = $props();

	let contracts = $state(new SvelteSet<ContractType>(filters?.contract));
	let domains = $state(new SvelteSet<number>(filters?.activity_domain_ids));
	let localisations = $state(new SvelteSet<string>(filters?.localisation));
	let duration: number = $state(filters?.duration ?? 2);

	$effect(() => {
		filters = {
			contract: contracts.size ? Array.from(contracts) : undefined,
			activity_domain_ids: domains.size ? Array.from(domains) : undefined,
			localisation: localisations.size ? Array.from(localisations) : undefined,
			duration
		};
	});
</script>

<form method="dialog" class="rounded-3xl border-2 border-[#EEEEEE] bg-white p-8 pt-6">
	<FilterSection title="Type de contrat">
		{#each Object.entries(contractLabels) as [type, label]}
			<Checkbox
				{label}
				name="{type}_contract"
				bind:checked={
					() => contracts.has(type as ContractType),
					(checked) => {
						if (checked) {
							contracts.add(type as ContractType);
						} else {
							contracts.delete(type as ContractType);
						}
					}
				}
			/>
		{/each}
	</FilterSection>

	<FilterSection title="Domaine">
		{#each Object.entries(ACTIVITY_DOMAINS) as [name, id]}
			<Checkbox
				label={name}
				name="activity_domain_{id}"
				bind:checked={
					() => domains.has(id),
					(checked) => {
						if (checked) {
							domains.add(id);
						} else {
							domains.delete(id);
						}
					}
				}
			/>
		{/each}
	</FilterSection>

	<FilterSection title="Localisation">
		{#each LOCALISATIONS as loc}
			<Checkbox
				label={loc}
				name="loc_{loc}"
				bind:checked={
					() => localisations.has(loc),
					(checked) => {
						if (checked) {
							localisations.add(loc);
						} else {
							localisations.delete(loc);
						}
					}
				}
			/>
		{/each}
	</FilterSection>

	<FilterSection title="Durée: {duration} mois">
		<Range
			name="months"
			min={{
				value: 1,
				label: '1 mois'
			}}
			max={{
				value: 24,
				label: '24 mois'
			}}
			bind:value={duration}
		/>
	</FilterSection>
</form>
