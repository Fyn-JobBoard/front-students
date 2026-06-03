<script lang="ts">
	import { page } from '$app/state';
	import Search from '$lib/components/forms/search.svelte';
	import JobCard from '$lib/components/jobs/card.svelte';
	import Select from '$lib/components/ui/forms/select.svelte';
	import Tag from '$lib/components/ui/tag.svelte';
	import type { ListJobsResponse } from 'fyn-api-sdk';
	import { type ComponentProps } from 'svelte';
	import Filters, { type ContractType, type Filters as FiltersType } from './filters.svelte';

	const { searchParams } = page.url;
	let filters: FiltersType = $state({
		source: searchParams.getAll('src'),
		activity_domain_ids: searchParams.getAll('domain').map((v) => parseInt(v)),
		contract: searchParams.getAll('type') as ContractType[],
		duration: parseInt(searchParams.get('duration') ?? '1'),
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

		offers = [
			{
				id: '1',
				category: 'Marketing',
				title: 'Chef de Projet Marketing Digital',
				company: 'Publicis Groupe',
				description:
					'Pilotez des campagnes 360° pour des marques internationales. Gestion budget & KPIs.',
				location: 'Paris (75)',
				featured: true
			},
			{
				id: '2',
				category: 'Développement',
				title: 'Développeur Full Stack React/Node',
				company: 'Doctolib',
				description: 'Développez des features critiques pour 60 millions de patients en Europe.',
				location: 'Paris (75)',
				featured: false
			},
			{
				id: '3',
				category: 'Finance',
				title: 'Analyste M&A Junior',
				company: 'BNP Paribas',
				description:
					'Participez à des opérations de fusion-acquisition dans les secteurs tech & santé.',
				location: 'La Défense (92)',
				featured: false
			},
			{
				id: '4',
				category: 'Design',
				title: 'Product Designer UX/UI',
				company: 'Figma',
				description:
					'Imaginez les futurs outils de design collaboratif utilisés par des millions de créatifs.',
				location: 'Remote',
				featured: false
			}
		];
		return offers.sort((a, b) => {
			if (a.featured && !b.featured) {
				return -1;
			}

			switch (sort) {
				case 'query': {
					return b.title > a.title ? -1 : 1;
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
			<Filters bind:filters />
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
			<ul class="my-4 flex gap-2">
				{#each Object.entries(filters) as [key, data]}
					{#if data instanceof Array}
						{#each data as val}
							<li>
								<button
									class="cursor-pointer"
									onclick={() => {
										//@ts-ignore
										filters[key] = filters[key].filter((v) => v !== val);
										force_filter_update++;
										refresh();
									}}
									type="button"
									title="Supprimer le filtre {val}"
								>
									<Tag text={val} />
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
