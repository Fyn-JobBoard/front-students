<script lang="ts">
	import CardsStep from './cards-step.svelte';

	const steps = [
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

<section class="bg-[#e8ecff] px-[14px] pt-20 pb-[60px]">
	<h2 class="m-0 mb-4 text-center font-grift text-4xl leading-tight font-extrabold text-[#334590]">
		Comment ça marche ?
	</h2>

	<p class="font-just-sans font-light m-0 mb-[52px] text-center text-base leading-6 text-[#808BBA]">
		Trois minutes suffisent pour postuler
	</p>

	<div
		class="mx-auto grid max-w-[1440px] grid-cols-4 gap-[22px] px-1.5 max-lg:grid-cols-2 max-lg:px-5 max-sm:grid-cols-1"
	>
		{#each steps as step}
			<CardsStep number={step.number} title={step.title} description={step.description} />
		{/each}
	</div>
</section>
