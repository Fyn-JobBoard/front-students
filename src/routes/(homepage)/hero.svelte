<script module lang="ts">
	export const SEARCH_SUGGESTIONS = [
		'Marketing Digital',
		'Développeur Web',
		'Design UI/UX',
		'Finance',
		'RH',
		'Commerce B2B'
	];
	export const METRICS: { [key: string]: string } = {
		'offres disponibles': '2 400+',
		entreprises: '850+',
		étudiants: '12 000+',
		satisfaction: '94%'
	};
</script>

<script>
	import Simple from '$lib/components/heros/simple.svelte';
	import StatsBar from '$lib/components/metrics/stats-bar.svelte';
	import Search from '$lib/components/forms/search.svelte';
</script>

<Simple
	title={['Trouve ton ', 'alternance', ', lance ta carrière']}
	tag="La plateform #1 des alternants"
	class="h-screen pt-32"
>
	<div class="w-full grid gap-14">
		<Search
			action="/jobs"
			name="query"
			placeholder="Rechercher un métier, une entreprise, une ville..."
			suggestions={SEARCH_SUGGESTIONS}
		/>

		<StatsBar metrics={Object.entries(METRICS).map(([context, metric]) => ({ context, metric }))} />
	</div>
</Simple>
