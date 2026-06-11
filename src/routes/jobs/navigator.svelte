<script lang="ts">
	import { page } from '$app/state';
	import Search from '$lib/components/forms/search.svelte';
	import JobCard from '$lib/components/jobs/card.svelte';
	import Select from '$lib/components/ui/forms/select.svelte';
	import Tag from '$lib/components/ui/tag.svelte';
	import { Job, type ActivityDomain, type ListJobsResponse } from 'fyn-api-sdk';
	import { type ComponentProps } from 'svelte';
	import Filters, { contractLabels, type Filters as FiltersType } from './filters.svelte';

	const { searchParams } = page.url;

	const {
		available_activity_domains
	}: {
		available_activity_domains: ActivityDomain[];
	} = $props();

	let filters: FiltersType = $state({
		sources: searchParams.getAll('src'),
		contracts: searchParams
			.getAll('type')
			.filter(
				(type: string | Job.ContractEnum): type is Job.ContractEnum => type in Job.ContractEnum
			)
			.map((contract) => ({
				label: contractLabels[contract as unknown as Job.ContractEnum],
				value: contract as unknown as Job.ContractEnum
			})),
		duration: {
			value: parseInt(searchParams.get('duration') ?? '1')
		},
		localisation: searchParams.getAll('loc')
	});
	let query: string | undefined = $state(searchParams.get('query') ?? undefined);
	let sort: string = $state(searchParams.get('sort') ?? 'query');

	let force_filter_update = $state(0);
	let fetch_result = $state(0);
	let offers: null | ComponentProps<typeof JobCard>[] = $state(null);

	function refresh(e?: Event) {
		e?.preventDefault();

		if (query) {
			page.url.searchParams.set('query', query);
		}

		offers = null;
		fetch_result++;
	}

	async function fetch_offers(): Promise<NonNullable<typeof offers>> {
		const answer: ListJobsResponse = await fetch(
			`/jobs/list?page=1&query=${encodeURI(query ?? '')}`
		).then((r) => r.json());
		console.log(answer);

		offers = answer.list.map((job) => ({ job, featured: false }));

		return offers.sort((a, b) => {
			if (a.featured && !b.featured) {
				return -1;
			}

			switch (sort) {
				case 'query': {
					return b.job.title > a.job.title ? -1 : 1;
				}
				case 'date': {
					console.warn('The date sort is not implemented.');
					return 0;
				}
				default: {
					return 0;
				}
			}
		});
	}
</script>

<section class="grid gap-8 max-lg:grid-rows-[repeat(2,auto)] lg:grid-cols-[auto_1fr]">
	<aside class="h-fit lg:sticky lg:top-22">
		{#key force_filter_update}
			<Filters bind:filters {available_activity_domains} />
		{/key}
	</aside>
	<main>
		<header class="grid gap-8 max-lg:grid-rows-[repeat(2,auto)] lg:grid-cols-[1fr_auto]">
			<Search
				name="job_search"
				bind:value={query}
				onsubmit={refresh}
				suggestions={['Marketing Digital', 'Développement Web', 'Design UX/UI']}
				placeholder="Rechercer un métier, une entreprise, une ville..."
			/>

			<form onchange={refresh}>
				<Select
					label="Trier par"
					name="sorterer"
					bind:value={sort}
					options={{
						query: 'Pertinence',
						date: 'Date de publication'
					}}
				/>
			</form>
		</header>
		<main class="mt-12">
			<h2 class="font-light text-ecume-blue">
				{#if offers instanceof Array}
					{#if offers.length === 0}
						Aucune offre ne correspond à votre recherche
					{:else if offers.length === 1}
						Une offre correspond à votre recherche
					{:else}
						<b>{offers.length} offres</b>
						correspondent à votre recherche
					{/if}
				{:else}
					Nous recherchons des offres...
				{/if}
			</h2>
			<ul class="my-4 flex flex-wrap gap-2">
				{#each Object.entries(filters) as [key, data]}
					{#if data instanceof Array}
						{#each data as val}
							<li>
								<button
									class="cursor-pointer"
									onclick={() => {
										//@ts-ignore
										filters[key] = filters[key].filter((v) => {
											if ('id' in val) {
												return v.id !== val.id;
											} else if ('value' in val) {
												return v.value !== val.value;
											} else {
												return v !== val;
											}
										});

										force_filter_update++;
										refresh();
									}}
									type="button"
									title="Supprimer le filtre {val}"
								>
									<Tag text={val.label ?? val.value ?? val.name ?? val} />
								</button>
							</li>
						{/each}
					{/if}
				{/each}
			</ul>

			{#key fetch_result}
				{#await fetch_offers() then offers}
					<ul class="grid grid-cols-1 gap-4 md:grid-cols-2">
						{#each offers as offer}
							<JobCard {...offer} />
						{/each}
					</ul>
				{/await}
			{/key}
		</main>
	</main>
</section>
