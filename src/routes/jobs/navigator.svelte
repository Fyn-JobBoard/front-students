<script lang="ts">
	import { page } from '$app/state';
	import Search from '$lib/components/forms/search.svelte';
	import Select from '$lib/components/ui/forms/select.svelte';
	import { onMount } from 'svelte';
	import Filters, { type ContractType, type Filters as FiltersType } from './filters.svelte';

	const params = $derived(page.url.searchParams);
	let filters: FiltersType = $derived({
		source: params.getAll('src'),
		activity_domain_ids: params.getAll('domain').map((v) => parseInt(v)),
		contract: params.getAll('type') as ContractType[],
		duration: parseInt(params.get('duration') ?? '1'),
		localisation: params.getAll('loc')
	});
	let query: string | undefined = $derived(params.get('query') ?? undefined);
	let sort: string = $derived(params.get('sort') ?? 'query');

	function refresh(e?: Event) {
		e?.preventDefault();

		console.log(filters, query, sort);
	}

	onMount(() => refresh());
</script>

<section class="grid grid-cols-[auto_1fr] gap-8">
	<aside>
		<Filters bind:filters />
	</aside>
	<main>
		<header class="grid grid-cols-[1fr_auto] gap-8">
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
		<main></main>
	</main>
</section>
