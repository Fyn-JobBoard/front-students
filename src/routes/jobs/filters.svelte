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
	let {
		filters = $bindable()
	}: {
		filters: Filters;
	} = $props();

	let contracts = $state(new Set<ContractType>());
	let domains = $state(new Set<number>());
	let localisations = $state(new Set<string>());
	let duration: number = $state(2);

	$effect(() => {
		filters = {
			contract: contracts.size ? Array.from(contracts) : undefined,
			activity_domain_ids: domains.size ? Array.from(domains) : undefined,
			localisation: localisations.size ? Array.from(localisations) : undefined,
			duration
		};
	});
</script>

<form method="dialog">
	<section>
		<h3>Type de contrat</h3>
		{#each Object.entries(contractLabels) as [type, label]}
			<label for="{type}_contract">
				<input
					type="checkbox"
					id="{type}_contract"
					name="{type}_contract"
					value={type}
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
				<span>{label}</span>
			</label>
		{/each}
	</section>

	<section>
		<h3>Domaine</h3>

		{#each Object.entries(ACTIVITY_DOMAINS) as [name, id]}
			<label for="domain_{id}">
				<input
					type="checkbox"
					name="activity_domain_{id}"
					id="domain_{id}"
					value={id}
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
				<span>{name}</span>
			</label>
		{/each}
	</section>

	<section>
		<h3>Localisation</h3>
		{#each LOCALISATIONS as loc}
			<label for="loc_{loc}">
				<input
					type="checkbox"
					name="loc_{loc}"
					id="loc_{loc}"
					value={loc}
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
				<span>{loc}</span>
			</label>
		{/each}
	</section>

	<section>
		<h3>Durée</h3>
		<input type="range" name="months" min="1" max="24" bind:value={duration} />
	</section>
</form>
