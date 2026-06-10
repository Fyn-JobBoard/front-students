<script lang="ts">
	import { Job } from 'fyn-api-sdk';
	import City from '../resolvers/city.svelte';

	type JobWithNamedTags = Job & {
		tags: Array<{
			name?: string;
		}>;
	};

	const { job }: { job: JobWithNamedTags } = $props();

	const modeLabels: Record<Job.ModeEnum, string> = {
		[Job.ModeEnum.Remote]: 'Télétravail',
		[Job.ModeEnum.Onsite]: 'Sur site',
		[Job.ModeEnum.Hybrid]: 'Hybride'
	};

	const contractLabels: Record<Job.ContractEnum, string> = {
		[Job.ContractEnum.Stage]: 'Stage',
		[Job.ContractEnum.Internship]: 'Alternance',
		[Job.ContractEnum.AlternatingStage]: 'Alternance'
	};

	const periodLabels: Record<Job.RemunerationPeriodEnum, string> = {
		[Job.RemunerationPeriodEnum.Single]: '',
		[Job.RemunerationPeriodEnum.Dayly]: 'jour',
		[Job.RemunerationPeriodEnum.Weekly]: 'semaine',
		[Job.RemunerationPeriodEnum.Monthly]: 'mois',
		[Job.RemunerationPeriodEnum.Annualy]: 'an'
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

	const formatRemuneration = (amount?: number, period?: Job.RemunerationPeriodEnum) => {
		if (!amount) return 'Rémunération à définir';

		const formattedAmount = new Intl.NumberFormat('fr-FR', {
			maximumFractionDigits: 0
		}).format(Number(amount));
		const periodLabel = period ? periodLabels[period] : undefined;

		return periodLabel ? `${formattedAmount} EUR / ${periodLabel}` : `${formattedAmount} EUR`;
	};

	const mode = $derived(modeLabels[job.mode] ?? job.mode);
	const category = $derived(job.activity_domain?.name ?? 'Offre');
	const title = $derived(job.title);
	const companyName = $derived(job.company?.name ?? 'Entreprise');
	const fallbackLocation = 'Localisation à définir';
	const exclusive = $derived(!job.scrapped_from);
	const applyLink = $derived(job.apply_link);
	const description = $derived(job.description);
	const companyDescription = $derived(job.company?.bio?.trim() || 'Présentation à venir.');
	const companyWebsite = $derived(job.company?.website_url);
	const skills = $derived.by(() => {
		const tagNames = job.tags
			?.map((tag) => tag.name)
			.filter((name): name is string => Boolean(name));

		if (tagNames?.length) return tagNames;
		return [category];
	});
	const companyTags = $derived(
		[
			job.company?.creation_date
				? `Fondée en ${new Date(job.company.creation_date).getFullYear()}`
				: undefined,
			companyWebsite ? 'Site web disponible' : undefined
		].filter((tag): tag is string => Boolean(tag))
	);
	const details = $derived([
		fallbackLocation,
		mode,
		formatRemuneration(job.remuneration, job.remuneration_period),
		formatDate(job.period_start),
		contractLabels[job.contract] ?? job.contract,
		formatDuration(job.period_duration)
	]);
	const hasCoordinates = $derived(job.lat != null && job.lng != null);
	const offerMeta = $derived([
		{ icon: '📍', label: details[0], type: 'location' },
		{ icon: '🕐', label: details[1] },
		{ icon: '💰', label: details[2] },
		{ icon: '📅', label: details[3] },
		{ icon: '🎓', label: details[4] },
		{ icon: '⏱️', label: details[5] }
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
					{category}
				</span>

				{#if exclusive}
					<span
						class="rounded-full bg-lighthouse-yellow px-4 py-1.5 text-xs font-medium text-ocean-blue"
					>
						Exclusif FYN
					</span>
				{:else if applyLink}
					<a
						class="rounded-full bg-lighthouse-yellow px-4 py-1.5 text-xs font-medium text-ocean-blue"
						href={applyLink}
						target="_blank"
						rel="noreferrer"
					>
						Offre externe
					</a>
				{/if}
			</div>

			<header class="mt-5">
				<h1 class="font-grift text-[26px] leading-tight font-bold text-ocean-blue sm:text-[28px]">
					{title}
				</h1>
				<p class="mt-2 text-[16px] font-normal text-ecume-blue">
					{companyName} ·
					{#if hasCoordinates && job}
						<City lat={job.lat} lng={job.lng} />
					{:else}
						{fallbackLocation}
					{/if}
				</p>
			</header>

			<div class="my-5 h-px bg-[#e4e9fb]"></div>

			<div class="grid gap-x-8 gap-y-4 sm:grid-cols-3">
				{#each offerMeta as meta}
					<div
						class="font-corps flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-ocean-blue/80"
					>
						<span class="text-sm leading-none">{meta.icon}</span>
						<span>
							{#if meta.type === 'location' && hasCoordinates && job}
								<City lat={job.lat} lng={job.lng} />
							{:else}
								{meta.label}
							{/if}
						</span>
					</div>
				{/each}
			</div>

			<div class="my-5 h-px bg-[#e4e9fb]"></div>

			<section>
				<h2 class="font-headings text-xl font-semibold text-ocean-blue">Description de l'offre</h2>
				<div
					class="prose prose-sm mt-3 max-w-none text-base leading-7 font-light text-[#5f6170] prose-headings:font-headings prose-headings:text-ocean-blue prose-li:marker:text-ocean-blue"
				>
					{@html description}
				</div>
			</section>

			<div class="mt-7 flex flex-wrap gap-2.5">
				{#each skills as skill}
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
					{companyDescription}
				</p>

				<div class="mt-6 flex flex-wrap gap-2.5">
					{#each companyTags as tag}
						{#if tag === 'Site web disponible' && companyWebsite}
							<a
								class="rounded-full bg-[#f2f3f6] px-3.5 py-1.5 text-xs font-medium text-ecume-blue"
								href={companyWebsite}
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
					{#if hasCoordinates && job}
						<span
							class="rounded-full bg-[#f2f3f6] px-3.5 py-1.5 text-xs font-medium text-ecume-blue"
						>
							<City lat={job.lat} lng={job.lng} />
						</span>
					{/if}
				</div>
			</section>
		</article>
	</div>
</section>
