<script lang="ts">
	const categories = ['Tous', 'Marketing', 'Développement', 'Design', 'Finance', 'RH', 'Commerce', 'Data'];

	let activeCategory = $state('Tous');

	const offers = [
		{
			category: 'Marketing',
			title: 'Chef de Projet Marketing Digital',
			company: 'Publicis Groupe',
			description: 'Pilotez des campagnes 360° pour des marques internationales. Gestion budget & KPIs.',
			location: 'Paris (75)',
			url: '/jobs/1',
			featured: true
		},
		{
			category: 'Développement',
			title: 'Développeur Full Stack React/Node',
			company: 'Doctolib',
			description: 'Développez des features critiques pour 60 millions de patients en Europe.',
			location: 'Paris (75)',
			url: '/jobs/2',
			featured: false
		},
		{
			category: 'Finance',
			title: 'Analyste M&A Junior',
			company: 'BNP Paribas',
			description: 'Participez à des opérations de fusion-acquisition dans les secteurs tech & santé.',
			location: 'La Défense (92)',
			url: '/jobs/3',
			featured: false
		},
		{
			category: 'Design',
			title: 'Product Designer UX/UI',
			company: 'Figma',
			description: 'Imaginez les futurs outils de design collaboratif utilisés par des millions de créatifs.',
			location: 'Remote',
			url: '/jobs/4',
			featured: false
		},
		{
			category: 'RH',
			title: 'Talent Acquisition Specialist',
			company: 'Decathlon',
			description: 'Recrutez les talents de demain et développez notre marque employeur sportive.',
			location: 'Lille (59)',
			url: '/jobs/5',
			featured: false
		},
		{
			category: 'Commerce',
			title: 'Business Developer SaaS B2B',
			company: 'HubSpot',
			description: 'Développez notre portefeuille PME et startups sur le marché francophone.',
			location: 'Dublin / Remote',
			url: '/jobs/6',
			featured: false
		}
	];

	let filteredOffers = $derived(
		activeCategory === 'Tous'
			? offers
			: offers.filter((o) => o.category === activeCategory)
	);
</script>

<section class="bg-lighthouse-white px-6 py-16">
	<div class="mx-auto max-w-screen-xl">

		<!-- Titre + lien -->
		<div class="mb-8 flex items-center justify-between">
			<h2 class="font-grift text-3xl font-extrabold text-ocean-blue">
				Offres d'alternance du moment
			</h2>
			<a href="/jobs" class="font-just-sans text-sm font-medium text-ocean-blue hover:underline">
				Toutes les offres →
			</a>
		</div>

		<!-- Filtres -->
		<div class="mb-8 flex flex-wrap gap-2">
			{#each categories as category}
				<button
					onclick={() => activeCategory = category}
					class={[
						'rounded-full px-4 py-2 font-just-sans text-sm font-medium transition-colors cursor-pointer',
						activeCategory === category
							? 'bg-ocean-blue text-white'
							: 'border border-bleuet-blue bg-white text-ecume-blue hover:border-ocean-blue hover:text-ocean-blue'
					].join(' ')}
				>
					{category}
				</button>
			{/each}
		</div>

		<!-- Grille des offres -->
		<div class="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
			{#each filteredOffers as offer}
				<article class={[
					'flex flex-col justify-between rounded-2xl p-6 transition-shadow hover:shadow-md',
					offer.featured
						? 'bg-ocean-blue border-ocean-blue text-white'
						: 'bg-white border border-[#e8ecff] text-ocean-blue'
				].join(' ')}>

					<!-- Badge -->
					<div>
						<span class={[
							'rounded-full px-3 py-1 font-just-sans text-xs font-medium',
							offer.featured ? 'bg-white/15 text-white' : 'bg-[#f0f3ff] text-ocean-blue'
						].join(' ')}>
							{offer.category}
						</span>

						<h3 class={[
							'mt-4 font-grift text-xl font-bold leading-tight',
							offer.featured ? 'text-white' : 'text-ocean-blue'
						].join(' ')}>
							{offer.title}
						</h3>

						<p class={[
							'mt-2 font-just-sans text-sm font-bold',
							offer.featured ? 'text-white' : 'text-ocean-blue'
						].join(' ')}>
							{offer.company}
						</p>

						<p class={[
							'mt-3 font-just-sans text-sm leading-relaxed',
							offer.featured ? 'text-white/70' : 'text-ecume-blue'
						].join(' ')}>
							{offer.description}
						</p>
					</div>

					<!-- Localisation + bouton -->
					<div class="mt-6 flex items-center justify-between">
						<span class={[
							'font-just-sans text-sm',
							offer.featured ? 'text-white/70' : 'text-ecume-blue'
						].join(' ')}>
							📍 {offer.location}
						</span>
						<a href={offer.url} class="flex h-10 w-10 items-center justify-center rounded-full bg-lighthouse-yellow text-ocean-blue text-lg font-bold hover:opacity-90 transition-opacity">
							<span>&#8594;</span>
						</a>
					</div>
				</article>
			{/each}
		</div>

	</div>
</section>