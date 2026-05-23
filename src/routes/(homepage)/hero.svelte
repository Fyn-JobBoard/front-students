<script>
	import Simple from '$lib/components/heros/simple.svelte';
	import Search from '$lib/components/ui/forms/search.svelte';
</script>

<Simple
	title={['Trouve ton ', 'alternance', ', lance ta carrière']}
	tag="La plateform #1 des alternants"
>
	<div>
		<Search name="query" suggestions={['hello']} />
	</div>
</Simple>
