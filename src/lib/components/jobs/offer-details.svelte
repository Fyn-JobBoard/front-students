<script module lang="ts">
	export type offer = {
		title: string;
		company: string;
		location: string;
		category: string;
		exclusive?: boolean;
		details: string[];
		description: string;
		missions: string[];
		profile: string[];
		skills: string[];
		companyDescription: string;
		companyTags: string[];
	};
</script>

<script lang="ts">
	const offerDetails: offer = {
		category: 'Marketing',
		exclusive: true,
		title: 'Alternance Chef de Projet Marketing Digital',
		company: 'Agence Créative Paris',
		location: 'Paris 9e',
		details: [
			'Paris 9e - Hybride',
			'3j entreprise / 2j école',
			'800 - 1200 EUR / mois',
			'Début septembre 2026',
			'Bac+3 minimum',
			'12 mois'
		],
		description:
			"Tu rejoins l'équipe marketing d'une agence créative parisienne en pleine croissance. Tu travailles directement avec la directrice marketing sur des campagnes 360 degres pour des marques nationales et internationales.",
		missions: [
			'Piloter les campagnes digitales (SEO/SEA, social, email)',
			'Suivre et analyser les KPIs de performance',
			'Coordonner les prestataires et agences créatives',
			'Participer aux réunions clients et aux briefs créatifs',
			'Contribuer à la stratégie de contenu mensuelle'
		],
		profile: [
			'En formation Bac+3 à Bac+5 en marketing ou communication',
			"À l'aise avec les outils Google Analytics, Meta Ads, Canva",
			"Curieux-se, rigoureux-se, à l'aise à l'écrit",
			'Première expérience en stage ou alternance appréciée'
		],
		skills: ['Marketing digital', 'SEO/SEA', 'Analytics', 'Meta Ads', 'Google Analytics', 'Canva'],
		companyDescription:
			'Agence Créative Paris est une agence indépendante de 45 personnes fondée en 2015. Elle accompagne des marques comme Sézane, Merci et Maison Kitsuné sur leur stratégie digitale et leur identité de marque.',
		companyTags: ['45 personnes', 'Fondée en 2015', 'Paris 9e']
	};

	const offerMeta = [
		{ icon: '📍', label: offerDetails.details[0] },
		{ icon: '🕐', label: offerDetails.details[1] },
		{ icon: '💰', label: offerDetails.details[2] },
		{ icon: '📅', label: offerDetails.details[3] },
		{ icon: '🎓', label: offerDetails.details[4] },
		{ icon: '⏱️', label: offerDetails.details[5] }
	];
</script>

<section class="bg-lighthouse-white px-4 py-10 sm:px-6 lg:py-14">
	<div
		class="mr-auto grid w-full max-w-[800px] gap-8 pt-24 lg:ml-[60px] lg:grid-cols-[520px] lg:items-start"
	>
		<article
			class="box-border h-auto w-full rounded-2xl border border-[#dbe4ff] bg-white px-6 py-7 shadow-sm sm:px-8 lg:w-[800px]"
		>
			<div class="flex flex-wrap items-center gap-2.5">
				<span
					class="font-corps rounded-full bg-bleuet-blue px-4 py-1.5 text-xs font-semibold text-ocean-blue"
				>
					{offerDetails.category}
				</span>

				{#if offerDetails.exclusive}
					<span
						class="font-corps rounded-full bg-lighthouse-yellow px-4 py-1.5 text-xs font-semibold text-ocean-blue"
					>
						Exclusif FYN
					</span>
				{/if}
			</div>

			<header class="mt-5">
				<h1 class="font-grift text-[26px] leading-tight font-bold text-ocean-blue sm:text-[28px]">
					{offerDetails.title}
				</h1>
				<p class="mt-2 text-[16px] font-normal text-ecume-blue">
					{offerDetails.company} · {offerDetails.location}
				</p>
			</header>

			<div class="my-5 h-px bg-[#e4e9fb]"></div>

			<div class="grid gap-x-8 gap-y-4 sm:grid-cols-3">
				{#each offerMeta as meta}
					<div
						class="font-corps flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-ocean-blue/80"
					>
						<span class="text-sm leading-none">{meta.icon}</span>
						<span>{meta.label}</span>
					</div>
				{/each}
			</div>

			<div class="my-5 h-px bg-[#e4e9fb]"></div>

			<section class="space-y-7">

				<div>
					<h3 class="font-headings text-base font-semibold text-ocean-blue">Le poste</h3>
					<p class="font-corps mt-3 text-[15px] leading-7 text-[#5f6170]">
						{offerDetails.description}
					</p>
				</div>

				<div>
					<h3 class="font-headings text-base font-semibold text-ocean-blue">Tes missions</h3>
					<ul class="font-corps mt-3 space-y-2.5 text-[15px] leading-6 text-[#6b6d78]">
						{#each offerDetails.missions as mission}
							<li class="flex gap-3">
								<span class="mt-2.5 size-1 shrink-0 rounded-full bg-ocean-blue"></span>
								<span>{mission}</span>
							</li>
						{/each}
					</ul>
				</div>

				<div>
					<h3 class="font-headings text-base font-semibold text-ocean-blue">Profil recherché</h3>
					<ul class="font-corps mt-3 space-y-2.5 text-[15px] leading-6 text-[#6b6d78]">
						{#each offerDetails.profile as item}
							<li class="flex gap-3">
								<span class="mt-2.5 size-1 shrink-0 rounded-full bg-ocean-blue"></span>
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</div>
			</section>

			<div class="mt-7 flex flex-wrap gap-2.5">
				{#each offerDetails.skills as skill}
					<span
						class="font-medium rounded-full bg-bleuet-blue px-3.5 py-1.5 text-xs text-ocean-blue"
					>
						{skill}
					</span>
				{/each}
			</div>
			<section class="mt-8">
				<h2 class="font-headings text-xl font-semibold text-ocean-blue">L'entreprise</h2>
				<p class="font-corps mt-3 text-[15px] leading-7 text-[#5f6170]">
					{offerDetails.companyDescription}
				</p>

				<div class="mt-6 flex flex-wrap gap-2.5">
					{#each offerDetails.companyTags as tag}
						<span
							class="font-medium rounded-full bg-[#f2f3f6] px-3.5 py-1.5 text-xs text-ecume-blue"
						>
							{tag}
						</span>
					{/each}
				</div>
			</section>
		</article>
	</div>
</section>
