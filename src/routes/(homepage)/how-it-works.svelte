<script module lang="ts">
	import CardsStep from './hiw-card.svelte';

	export const STEPS = [
		{
			number: '01',
			title: 'Crée ton profil',
			description:
				"Renseigne tes compétences, ta formation et tes préférences en quelques minutes. C'est simple et rapide."
		},
		{
			number: '02',
			title: 'Explore les offres',
			description:
				"Parcours des milliers d'offres agrégées depuis LinkedIn, Indeed, WTTJ et bien d'autres sources."
		},
		{
			number: '03',
			title: 'Postule en 1 clic',
			description:
				'Envoie ta candidature directement depuis FYN, sans ressaisir tes informations à chaque fois.'
		},
		{
			number: '04',
			title: 'Suis tes candidatures',
			description:
				"Visualise l'état de chaque dossier en temps réel sur ton tableau de bord kanban personnel."
		}
	];
</script>

<section class="bg-bleuet-blue px-3.5 pt-20 pb-14">
	<h2 class="m-0 mb-4 text-center font-grift text-4xl leading-tight font-extrabold text-ocean-blue">
		Comment ça marche ?
	</h2>

	<p class="m-0 mb-13 text-center font-just-sans text-base leading-6 font-light text-ecume-blue">
		Trois minutes suffisent pour postuler
	</p>

	<div
		class="mx-auto grid max-w-screen-2xl grid-cols-4 gap-5.5 px-1.5 max-lg:grid-cols-2 max-lg:px-5 max-sm:grid-cols-1"
	>
		{#each STEPS as step}
			<CardsStep {...step} />
		{/each}
	</div>
</section>
