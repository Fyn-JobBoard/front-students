<script module lang="ts">
	import type { Job } from 'fyn-api-sdk';

	export type OfferJob = Job & {
		city?: string;
		location?: string;
		tags?: Array<{
			name?: string;
		}>;
	};

	export type offer = {
		title: string;
		company: string;
		location: string;
		category: string;
		exclusive?: boolean;
		applyLink?: string;
		sourceLink?: string;
		details: string[];
		description: string;
		skills: string[];
		companyDescription: string;
		companyWebsite?: string;
		companyTags: string[];
	};
</script>

<script lang="ts">
	const { job }: { job?: OfferJob } = $props();

	const fallbackOffer: offer = {
		category: 'Marketing',
		exclusive: true,
		title: 'Alternance Chef de Projet Marketing Digital',
		company: 'Agence Créative Paris',
		location: 'Paris 9e',
		applyLink: undefined,
		sourceLink: undefined,
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
		skills: ['Marketing digital', 'SEO/SEA', 'Analytics', 'Meta Ads', 'Google Analytics', 'Canva'],
		companyDescription:
			'Agence Créative Paris est une agence indépendante de 45 personnes fondée en 2015. Elle accompagne des marques comme Sézane, Merci et Maison Kitsuné sur leur stratégie digitale et leur identité de marque.',
		companyWebsite: undefined,
		companyTags: ['45 personnes', 'Fondée en 2015', 'Paris 9e']
	};

	const modeLabels: Record<string, string> = {
		remote: 'Télétravail',
		onsite: 'Sur site',
		hybrid: 'Hybride'
	};

	const contractLabels: Record<string, string> = {
		stage: 'Stage',
		internship: 'Alternance',
		alternating_stage: 'Alternance'
	};

	const periodLabels: Record<string, string> = {
		single: '',
		dayly: 'jour',
		weekly: 'semaine',
		monthly: 'mois',
		annualy: 'an'
	};

	const formatDate = (value?: string) => {
		if (!value) return 'Début à définir';

		const date = new Date(value);
		if (Number.isNaN(date.getTime())) return 'Début à définir';

		return `Début ${new Intl.DateTimeFormat('fr-FR', {
			month: 'long',
			year: 'numeric'
		}).format(date)}`;
	};

	const formatDuration = (seconds?: number) => {
		if (!seconds) return 'Durée à définir';

		const months = Math.max(1, Math.round(seconds / (60 * 60 * 24 * 30)));
		return `${months} mois`;
	};

	const formatRemuneration = (amount?: number, period?: unknown) => {
		if (!amount) return 'Rémunération à définir';

		const formattedAmount = new Intl.NumberFormat('fr-FR', {
			maximumFractionDigits: 0
		}).format(Number(amount));
		const periodLabel = period ? periodLabels[String(period)] : undefined;

		return periodLabel ? `${formattedAmount} EUR / ${periodLabel}` : `${formattedAmount} EUR`;
	};

	const formatLocation = (apiJob: OfferJob) => {
		if (apiJob.location) return apiJob.location;
		if (apiJob.city) return apiJob.city;
		if (apiJob.lat && apiJob.lng) return `${apiJob.lat}, ${apiJob.lng}`;

		return 'Localisation à définir';
	};

	const toOffer = (apiJob?: OfferJob): offer => {
		if (!apiJob) return fallbackOffer;

		const mode = modeLabels[apiJob.mode] ?? apiJob.mode;
		const location = formatLocation(apiJob);
		const tags = apiJob.tags
			?.map((tag) => tag.name)
			.filter((name): name is string => Boolean(name));
		const companyTags = [
			apiJob.company.creation_date
				? `Fondée en ${new Date(apiJob.company.creation_date).getFullYear()}`
				: undefined,
			apiJob.company.website_url ? 'Site web disponible' : undefined,
			location
		].filter((tag): tag is string => Boolean(tag));

		return {
			category: apiJob.activity_domain?.name ?? fallbackOffer.category,
			exclusive: !apiJob.scrapped_from,
			applyLink: apiJob.apply_link,
			sourceLink: apiJob.scrapped_from,
			title: apiJob.title,
			company: apiJob.company?.name ?? 'Entreprise',
			location,
			details: [
				location,
				mode,
				formatRemuneration(apiJob.remuneration, apiJob.remuneration_period),
				formatDate(apiJob.period_start),
				contractLabels[apiJob.contract] ?? apiJob.contract,
				formatDuration(apiJob.period_duration)
			],
			description: apiJob.description,
			skills: tags?.length ? tags : [apiJob.activity_domain?.name ?? fallbackOffer.category],
			companyDescription: apiJob.company?.bio ?? fallbackOffer.companyDescription,
			companyWebsite: apiJob.company?.website_url,
			companyTags: companyTags.length ? companyTags : fallbackOffer.companyTags
		};
	};

	const offerDetails = $derived(toOffer(job));
	const offerMeta = $derived([
		{ icon: '📍', label: offerDetails.details[0] },
		{ icon: '🕐', label: offerDetails.details[1] },
		{ icon: '💰', label: offerDetails.details[2] },
		{ icon: '📅', label: offerDetails.details[3] },
		{ icon: '🎓', label: offerDetails.details[4] },
		{ icon: '⏱️', label: offerDetails.details[5] }
	]);
</script>

<section class="bg-lighthouse-white px-4 py-10 sm:px-6 lg:py-14">
	<div
		class="mr-auto grid w-full max-w-[800px] gap-8 pt-24 lg:ml-[60px] lg:grid-cols-[520px] lg:items-start"
	>
		<article
			class="box-border h-auto w-full rounded-2xl border border-[#dbe4ff] bg-white px-6 py-7 shadow-sm sm:px-8 lg:w-[800px]"
		>
			<div class="flex flex-wrap items-center gap-2.5">
				<span class="rounded-full bg-bleuet-blue px-4 py-1.5 text-xs font-medium text-ocean-blue">
					{offerDetails.category}
				</span>

				{#if offerDetails.exclusive}
					<span
						class="rounded-full bg-lighthouse-yellow px-4 py-1.5 text-xs font-medium text-ocean-blue"
					>
						Exclusif FYN
					</span>
				{:else if offerDetails.applyLink}
					<a
						class="rounded-full bg-lighthouse-yellow px-4 py-1.5 text-xs font-medium text-ocean-blue"
						href={offerDetails.applyLink}
						target="_blank"
						rel="noreferrer"
					>
						Offre externe
					</a>
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

			<section>
				<h2 class="font-headings text-xl font-semibold text-ocean-blue">Description de l'offre</h2>
				<div
					class="prose prose-sm mt-3 max-w-none text-base leading-7 font-light text-[#5f6170] prose-headings:font-headings prose-headings:text-ocean-blue prose-li:marker:text-ocean-blue"
				>
					{@html offerDetails.description}
				</div>
			</section>

			<div class="mt-7 flex flex-wrap gap-2.5">
				{#each offerDetails.skills as skill}
					<span
						class="rounded-full bg-bleuet-blue px-3.5 py-1.5 text-xs font-medium text-ocean-blue"
					>
						{skill}
					</span>
				{/each}
			</div>
			<section class="mt-8">
				<h2 class="font-headings text-xl font-semibold text-ocean-blue">L'entreprise</h2>
				<p class="mt-3 text-base text-[15px] leading-7 font-light text-[#5f6170]">
					{offerDetails.companyDescription}
				</p>

				<div class="mt-6 flex flex-wrap gap-2.5">
					{#each offerDetails.companyTags as tag}
						{#if tag === 'Site web disponible' && offerDetails.companyWebsite}
							<a
								class="rounded-full bg-[#f2f3f6] px-3.5 py-1.5 text-xs font-medium text-ecume-blue"
								href={offerDetails.companyWebsite}
								target="_blank"
								rel="noreferrer"
							>
								{tag}
							</a>
						{:else}
							<span
								class="rounded-full bg-[#f2f3f6] px-3.5 py-1.5 text-xs font-medium text-ecume-blue"
							>
								{tag}
							</span>
						{/if}
					{/each}
				</div>
			</section>
		</article>
	</div>
</section>
