<script lang="ts" module>
	const CATEGORIES = ['Marketing', 'Développement', 'Design', 'Finance', 'RH', 'Commerce', 'Data'];

	const offers = [
		{
			id: '1',
			category: 'Marketing',
			title: 'Chef de Projet Marketing Digital',
			company: 'Publicis Groupe',
			description: 'Pilotez des campagnes 360° pour des marques internationales. Gestion budget & KPIs.',
			location: 'Paris (75)',
			featured: true
		},
		{
			id: '2',
			category: 'Développement',
			title: 'Développeur Full Stack React/Node',
			company: 'Doctolib',
			description: 'Développez des features critiques pour 60 millions de patients en Europe.',
			location: 'Paris (75)',
			featured: false
		},
		{
			id: '3',
			category: 'Finance',
			title: 'Analyste M&A Junior',
			company: 'BNP Paribas',
			description: 'Participez à des opérations de fusion-acquisition dans les secteurs tech & santé.',
			location: 'La Défense (92)',
			featured: false
		},
		{
			id: '4',
			category: 'Design',
			title: 'Product Designer UX/UI',
			company: 'Figma',
			description: 'Imaginez les futurs outils de design collaboratif utilisés par des millions de créatifs.',
			location: 'Remote',
			featured: false
		},
		{
			id: '5',
			category: 'RH',
			title: 'Talent Acquisition Specialist',
			company: 'Decathlon',
			description: 'Recrutez les talents de demain et développez notre marque employeur sportive.',
			location: 'Lille (59)',
			featured: false
		},
		{
			id: '6',
			category: 'Commerce',
			title: 'Business Developer SaaS B2B',
			company: 'HubSpot',
			description: 'Développez notre portefeuille PME et startups sur le marché francophone.',
			location: 'Dublin / Remote',
			featured: false
		}
	];
</script>

<script lang="ts">
	import Tag from '$lib/components/ui/tag.svelte';
	import JobCard from './job-card.svelte';

	let activeCategory: string | undefined = $state(undefined);

	let filteredOffers = $derived(
		activeCategory === 'Tous'
			? offers
			: offers.filter((o) => o.category === activeCategory)
	);
</script>

<section class="bg-white px-6 py-16">
	<div class="mx-auto max-w-screen-xl">

		<div class="mb-8 flex items-center justify-between">
			<h2 class="font-headings text-3xl font-extrabold text-ocean-blue">
				Offres d'alternance du moment
			</h2>
			<a href="/jobs" class="font-corps text-sm font-medium text-ocean-blue hover:underline">
				Toutes les offres →
			</a>
		</div>

		<ul class="mb-8 flex flex-wrap gap-2">
			{#each categories as category}
				<li>
					<button onclick={() => activeCategory = category}>
						<Tag text={category} selected={activeCategory === category} />
					</button>
				</li>
			{/each}
		</ul>

		<ul class="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
			{#each filteredOffers as offer}
				<li>
					<JobCard
						{...offer}
					/>
				</li>
			{/each}
		</ul>

	</div>
</section>