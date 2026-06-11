<script module lang="ts">
	export interface LabeledFilter<T> {
		label?: string;
		value: T;
	}

	export const contractLabels: Record<Job.ContractEnum, string> = {
		[Job.ContractEnum.Stage]: 'Stage',
		[Job.ContractEnum.Internship]: 'Alternance',
		[Job.ContractEnum.AlternatingStage]: 'Stage alterné'
	};

	export const LOCALISATIONS = ['Paris', 'Lyon', 'Nante'];

	export interface Filters {
		contracts?: LabeledFilter<Job.ContractEnum>[];
		activity_domains?: ActivityDomain[];
		localisations?: string[];
		duration?: LabeledFilter<number>;
		// sources?: Filter<string>[];
	}
</script>

<script lang="ts">
	import Checkbox from '$lib/components/ui/forms/checkbox.svelte';
	import Range from '$lib/components/ui/forms/range.svelte';
	import { type ActivityDomain, Job } from 'fyn-api-sdk';
	import { SvelteSet } from 'svelte/reactivity';
	import FilterSection from './filter-section.svelte';

	let {
		filters = $bindable(),
		available_activity_domains
	}: {
		filters?: Filters;
		available_activity_domains: ActivityDomain[];
	} = $props();

	let contracts = $state(new SvelteSet<Job.ContractEnum>(filters?.contracts?.map((c) => c.value)));
	let domains = $state(new SvelteSet<ActivityDomain>(filters?.activity_domains));
	let localisations = $state(new SvelteSet<string>(filters?.localisations));
	let duration: number = $state(filters?.duration?.value ?? 2);

	$effect(() => {
		filters = {
			contracts: contracts.size
				? Array.from(contracts).map((value) => ({
						label: contractLabels[value],
						value
					}))
				: undefined,
			activity_domains: domains.size ? Array.from(domains) : undefined,
			localisations: localisations.size ? Array.from(localisations) : undefined,
			duration: {
				label: `${duration} mois`,
				value: duration
			}
		};
	});
</script>

<form method="dialog" class="rounded-3xl border-2 border-[#EEEEEE] bg-white p-8 pt-6">
	<FilterSection title="Type de contrat">
		{#each Object.entries(contractLabels) as [value, label]}
			<Checkbox
				{label}
				name="{value}_contract"
				bind:checked={
					() => contracts.has(value as unknown as Job.ContractEnum),
					(checked) => {
						if (checked) {
							contracts.add(value as unknown as Job.ContractEnum);
						} else {
							contracts.delete(value as unknown as Job.ContractEnum);
						}
					}
				}
			/>
		{/each}
	</FilterSection>

	{#if available_activity_domains.length}
		<FilterSection title="Domaine">
			{#each available_activity_domains as domain (domain.id)}
				<Checkbox
					label={domain.name}
					name="activity_domain_{domain.id}"
					bind:checked={
						() => !!Array.from(domains).find((d) => d.id === domain.id),
						(checked) => {
							if (checked) {
								domains.add(domain);
							} else {
								domains.delete(domain);
							}
						}
					}
				/>
			{/each}
		</FilterSection>
	{/if}

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
