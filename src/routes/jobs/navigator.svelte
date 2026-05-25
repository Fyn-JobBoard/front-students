<script lang="ts">
	import Search from '$lib/components/forms/search.svelte';
	import Select from '$lib/components/ui/forms/select.svelte';
	import Filters, { type Filters as FiltersType } from './filters.svelte';

	let filters: FiltersType = $state({});
	let query: string = $state('');
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
				onsubmit={(e) => {
					e.preventDefault();
				}}
				suggestions={['Marketing Digital', 'Développement Web', 'Design UX/UI']}
				placeholder="Rechercer un métier, une entreprise, une ville..."
			/>

			<form>
				<Select
					label="Trier par"
					name="sorterer"
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
