<script lang="ts" module>
	const TEAM = [
		{
			name: 'Camille Gourdon',
			role: 'Marketing Manager',
			description:
				'Coordination globale, planning, communication inter-équipes. Stratégie, contenu, campagnes et analytics marketing.',
			initials: 'CG',
			color: 'bg-reflect-yellow'
		},
		{
			name: 'Rossana Adriana Pastor',
			role: 'Media Manager',
			description:
				'Développement de la stratégie de marque et de communication. Gestion des réseaux sociaux et production de contenu (TikTok, Instagram, LinkedIn, Blog).',
			initials: 'RP',
			color: 'bg-bleuet-blue'
		},
		{
			name: 'Cléo Lamberet',
			role: 'Designer UX/UI',
			description:
				"Création de la direction artistique et déclinaison de l'identité visuelle de Fyn sur les différents supports.",
			initials: 'CL',
			color: 'bg-butter-yellow'
		},
		{
			name: 'Matéo Le Goff Alberti',
			role: 'Directeur Artistique',
			description:
				"Création de la direction artistique. Déclinaison de l'identité visuelle de FYN sur les différents supports.",
			initials: 'ML',
			color: 'bg-reflect-yellow'
		},
		{
			name: 'Johan Janin',
			role: 'Développeur Lead',
			description:
				"Architecture technique du projet, lead développement, code review et coordination de l'équipe dev.",
			initials: 'JJ',
			color: 'bg-ocean-blue text-white'
		},
		{
			name: 'Terence Mayombo',
			role: 'Développeur Full-Stack',
			description:
				'Développement front-end et back-end, intégration des fonctionnalités et gestion de la base de données.',
			initials: 'TM',
			color: 'bg-bleuet-blue'
		},
		{
			name: 'Berlus Djongon',
			role: 'Développeur Full-Stack & Data Analyst',
			description:
				"Développement front-end et back-end, scraping des données et analyse des offres d'emploi.",
			initials: 'BD',
			color: 'bg-lighthouse-yellow'
		}
	];
</script>

<script lang="ts">
	import LogoYellow from '$lib/assets/brand/logo-yellow.svg';
</script>

<svelte:head>
	<title>Fyn - À propos</title>
	<meta
		name="description"
		content="Découvrez le projet Fyn, sa mission et l'équipe derrière la plateforme."
	/>
</svelte:head>

<main class="bg-lighthouse-white pt-24 pb-20">
	<section class="mx-auto max-w-7xl px-6 py-20">
		<div class="grid grid-cols-2 items-center gap-12 max-lg:grid-cols-1">
			<div>
				<h1
					class="mt-6 font-headings text-5xl leading-tight font-extrabold text-ocean-blue max-md:text-4xl"
				>
					La plateforme #1<br />des alternants
				</h1>
				<p class="font-corps mt-6 text-lg text-ecume-blue">
					Fyn est un job board 100% dédié aux stages et alternances. Notre mission : simplifier la
					recherche d'alternance pour les étudiants en agrégeant toutes les offres au même endroit.
				</p>
			</div>
			<div class="flex items-center justify-center rounded-3xl bg-ocean-blue p-16 max-lg:p-10">
				<img src={LogoYellow} alt="Logo Fyn" class="w-48" />
			</div>
		</div>
	</section>

	<section class="bg-ocean-blue px-6 py-20">
		<div class="mx-auto max-w-7xl">
			<h2 class="mb-12 text-center font-headings text-4xl font-extrabold text-white">
				Notre mission
			</h2>
			<div class="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
				<div class="rounded-3xl bg-white/10 p-8">
					<h3 class="mb-3 font-headings text-xl font-bold text-lighthouse-yellow">Centraliser</h3>
					<p class="font-corps text-sm leading-relaxed text-white/80">
						Regrouper toutes les offres de stages et alternances de LinkedIn, Indeed, Welcome to the
						Jungle et bien d'autres en un seul endroit.
					</p>
				</div>
				<div class="rounded-3xl bg-white/10 p-8">
					<h3 class="mb-3 font-headings text-xl font-bold text-lighthouse-yellow">Simplifier</h3>
					<p class="font-corps text-sm leading-relaxed text-white/80">
						Offrir une expérience de recherche fluide et intuitive, avec des filtres avancés et un
						matching intelligent entre les profils et les offres.
					</p>
				</div>
				<div class="rounded-3xl bg-white/10 p-8">
					<h3 class="mb-3 font-headings text-xl font-bold text-lighthouse-yellow">Accompagner</h3>
					<p class="font-corps text-sm leading-relaxed text-white/80">
						Proposer des outils concrets : analyse de CV, simulation d'entretien, alertes
						personnalisées et annuaire d'entreprises partenaires.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-7xl px-6 py-20">
		<p class="font-corps mx-auto mb-14 max-w-xl text-center text-base text-ecume-blue">
			Une équipe pluridisciplinaire réunie autour d'un projet commun : rendre la recherche
			d'alternance accessible à tous les étudiants.
		</p>

		<ul class="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
			{#each TEAM as member}
				<li class="rounded-3xl border border-bleuet-blue bg-white p-6">
					<div class="mb-4 flex items-center gap-4">
						<div
							class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full {member.color}"
						>
							<span class="font-headings text-base font-black text-ocean-blue">
								{member.initials}
							</span>
						</div>
						<div>
							<h3 class="font-headings text-base font-bold text-ocean-blue">
								{member.name}
							</h3>
							<p class="font-corps text-xs font-medium text-ecume-blue">
								{member.role}
							</p>
						</div>
					</div>
					<p class="font-corps text-sm leading-relaxed text-ecume-blue">
						{member.description}
					</p>
				</li>
			{/each}
		</ul>
	</section>
</main>
