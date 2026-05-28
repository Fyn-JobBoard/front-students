<script>
	import Hero from './hero.svelte';
	import Navigator from './navigator.svelte';
</script>

<svelte:head>
	<title>Fyn: Liste des offres</title>
	<meta
		name="description"
		content="Retrouvez la liste des offres d'emploi spécialement sélectionné selon vos critères !"
	/>
</svelte:head>

<header>
	<Hero />
</header>
<main class="mx-auto max-w-400 px-4">
	<Navigator />
</main>
