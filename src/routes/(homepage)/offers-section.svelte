<script lang="ts" module>
	import { Job } from 'fyn-api-sdk';

	type PartialJob = Partial<Omit<Job, 'company'>> & {
		company: { name: string };
		featured?: boolean;
	};

	const offers: PartialJob[] = [
		{
			id: '',
			activity_domain: { id: 1, name: 'Marketing' },
			title: 'Chef de Projet Marketing Digital',
			company: { name: 'Publicis Groupe' },
			description:
				'Pilotez des campagnes 360° pour des marques internationales. Gestion budget & KPIs.',
			lat: 48.866667,
			lng: 2.333333,
			featured: true
		},
		{
			id: '',
			activity_domain: { id: 2, name: 'Développement' },
			title: 'Développeur Full Stack React/Node',
			company: { name: 'Doctolib' },
			description: 'Développez des features critiques pour 60 millions de patients en Europe.',
			lat: 48.866667,
			lng: 2.333333,
			featured: false
		},
		{
			id: '',
			activity_domain: { id: 2, name: 'Finance' },
			title: 'Analyste M&A Junior',
			company: { name: 'BNP Paribas' },
			description:
				'Participez à des opérations de fusion-acquisition dans les secteurs tech & santé.',
			lat: 48.866667,
			lng: 2.333333,
			featured: false
		},
		{
			id: '',
			activity_domain: { id: 3, name: 'Design' },
			title: 'Product Designer UX/UI',
			company: { name: 'Figma' },
			description:
				'Imaginez les futurs outils de design collaboratif utilisés par des millions de créatifs.',
			mode: Job.ModeEnum.Remote,
			featured: false
		},
		{
			id: '',
			activity_domain: { id: 4, name: 'RH' },
			title: 'Talent Acquisition Specialist',
			company: { name: 'Decathlon' },
			description: 'Recrutez les talents de demain et développez notre marque employeur sportive.',
			lat: 50.62925,
			lng: 3.057256,
			featured: false
		},
		{
			id: '',
			activity_domain: { id: 5, name: 'Commerce' },
			title: 'Business Developer SaaS B2B',
			company: { name: 'HubSpot' },
			description: 'Développez notre portefeuille PME et startups sur le marché francophone.',
			lat: 45.75,
			lng: 4.85,
			featured: false
		}
	];
</script>

<script lang="ts">
	import JobCard from '$lib/components/jobs/card.svelte';
	import Tag from '$lib/components/ui/tag.svelte';

	let activeCategory: string | undefined = $state(undefined);

	let filteredOffers = $derived(
		activeCategory === undefined
			? offers
			: offers.filter((o) => o.activity_domain.name === activeCategory)
	);
</script>

<section class="bg-white px-6 py-16">
	<div class="mx-auto max-w-7xl">
		<div class="mb-8 flex items-center justify-between">
			<h2 class="font-headings text-3xl font-extrabold text-ocean-blue">
				Offres d'alternance du moment
			</h2>
			<a href="/jobs" class="font-corps text-sm font-medium text-ocean-blue hover:underline">
				Toutes les offres →
			</a>
		</div>

		<ul class="mb-8 flex flex-wrap gap-2">
			<li>
				<button onclick={() => (activeCategory = undefined)}>
					<Tag text="Tous" selected={activeCategory === undefined} />
				</button>
			</li>
			{#each offers.map((j) => j.activity_domain.name) as category}
				<li>
					<button onclick={() => (activeCategory = category)}>
						<Tag text={category} selected={activeCategory === category} />
					</button>
				</li>
			{/each}
		</ul>

		<ul class="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
			{#each filteredOffers as offer}
				<li>
					<JobCard job={offer} featured={offer.featured} />
				</li>
			{/each}
		</ul>
	</div>
</section>
