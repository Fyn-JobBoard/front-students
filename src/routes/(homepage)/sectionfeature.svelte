<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	const features = [
		{
			icon: 'icon-[mdi--file-document-outline]',
			title: 'Vérification CV',
			description: 'Notre IA analyse votre CV et vous donne un score de compatibilité détaillé avec les offres ciblées, plus des suggestions personnalisées pour maximiser vos chances.',
			cta: 'Analyser mon CV →',
			url: '/me/my-cv',
			bg: 'bg-ocean-blue',
			iconColor: 'text-white',
			titleColor: 'text-white',
			descColor: 'text-white/70',
			buttonType: 'secondary' as const
		},
		{
			icon: 'icon-[mdi--account-voice]',
			title: 'Préparer les entretiens',
			description: "Simulez des entretiens avec notre coach IA. Entraînez-vous sur les questions les plus fréquentes et obtenez un feedback instantané et personnalisé.",
			cta: "S'entraîner →",
			url: '/me/preparation',
			bg: 'bg-lighthouse-yellow',
			iconColor: 'text-ocean-blue',
			titleColor: 'text-ocean-blue',
			descColor: 'text-ocean-blue/70',
			buttonType: 'primary' as const
		},
		{
			icon: 'icon-[mdi--bell-outline]',
			title: 'Alertes personnalisées',
			description: 'Configurez des alertes ciblées et recevez les meilleures nouvelles offres directement dans votre boîte mail dès leur publication sur les plateformes.',
			cta: 'Configurer mes alertes →',
			url: '/me/notifications',
			bg: 'bg-butter-yellow',
			iconColor: 'text-ocean-blue',
			titleColor: 'text-ocean-blue',
			descColor: 'text-ocean-blue/70',
			buttonType: 'primary' as const
		},
		{
			icon: 'icon-[mdi--view-grid-outline]',
			title: 'Annuaire entreprises',
			description: "Consultez les fiches détaillées de 850+ entreprises partenaires : culture, témoignages d'alternants, processus de recrutement et contacts RH directs.",
			cta: 'Explorer les entreprises →',
			url: '/companies',
			bg: 'bg-white border border-bleuet-blue',
			iconColor: 'text-ocean-blue',
			titleColor: 'text-ocean-blue',
			descColor: 'text-ecume-blue',
			buttonType: 'secondary' as const
		}
	];
</script>

<section class="bg-lighthouse-white px-6 py-20">
	<div class="mx-auto max-w-screen-xl">

		
		<div class="mb-14 text-center">
			<h2 class="mb-4 font-grift text-4xl font-extrabold text-ocean-blue">
				Des outils pensés pour vous
			</h2>
			<p class="mx-auto max-w-lg font-just-sans text-base text-ecume-blue">
				Maximisez vos chances de décrocher l'alternance idéale
				avec notre suite complète d'outils propulsés par l'IA
			</p>
		</div>

		
		<ul class="grid grid-cols-2 gap-6 max-md:grid-cols-1">
			{#each features as feature}
				<li class="flex flex-col gap-6 rounded-3xl p-8 {feature.bg}">
					<span class="{feature.icon} text-3xl {feature.iconColor}"></span>
					<div>
						<h3 class="mb-3 font-grift text-xl font-bold {feature.titleColor}">
							{feature.title}
						</h3>
						<p class="font-just-sans text-sm leading-relaxed {feature.descColor}">
							{feature.description}
						</p>
					</div>
					<Button type={feature.buttonType} action={{ url: feature.url }}>
						{feature.cta}
					</Button>
				</li>
			{/each}
		</ul>

	</div>
</section>