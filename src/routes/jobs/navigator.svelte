<script lang="ts">
	import { page } from '$app/state';
	import Search from '$lib/components/forms/search.svelte';
	import Select from '$lib/components/ui/forms/select.svelte';
	import Tag from '$lib/components/ui/tag.svelte';
	import { onMount } from 'svelte';
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
	let offers: null | [] = $state(null);

	function refresh(e?: Event) {
		e?.preventDefault();

		if (query) {
			page.url.searchParams.set('query', query);
		}

		console.debug(`Querying '${query}' sorted by ${sort}. Filtered by:`, filters);

		offers = null;
		fetch_result++;
	}

	async function fetch_offers(): Promise<NonNullable<typeof offers>> {
		await new Promise((r) => setTimeout(r, 400));
		offers = [];
		return offers;
	}

	onMount(() => refresh());
</script>

<section class="grid gap-8 max-lg:grid-rows-2 lg:grid-cols-[auto_1fr]">
	<aside>
		{#key force_filter_update}
			<Filters bind:filters />
		{/key}
	</aside>
	<main>
		<header class="grid gap-8 max-lg:grid-rows-2 lg:grid-cols-[1fr_auto]">
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
					<ul>
						{#each offers as offer}
							<li>{offer}</li>
						{/each}
					</ul>
				{/await}
			{/key}
		</main>
	</main>
</section>
