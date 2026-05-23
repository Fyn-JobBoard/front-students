<script module lang="ts">
	export const SEARCH_SUGGESTIONS = [
		'Marketing Digital',
		'Développeur Web',
		'Design UI/UX',
		'Finance',
		'RH',
		'Commerce B2B'
	];
</script>

<script>
	import Simple from '$lib/components/heros/simple.svelte';
	import Search from '$lib/components/ui/forms/search.svelte';
</script>

<Simple
	title={['Trouve ton ', 'alternance', ', lance ta carrière']}
	tag="La plateform #1 des alternants"
	class="h-screen pt-32"
>
	<div class="w-full">
		<Search
			action="/jobs"
			name="query"
			placeholder="Rechercher un métier, une entreprise, une ville..."
			suggestions={SEARCH_SUGGESTIONS}
		/>
	</div>
</Simple>
