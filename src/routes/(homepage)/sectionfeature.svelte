<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	const features = [
		{
			icon: 'icon-[mdi--file-document-outline]',
			title: 'Vérification CV',
			description: 'Notre IA analyse votre CV et vous donne un score de compatibilité détaillé avec les offres ciblées, plus des suggestions personnalisées pour maximiser vos chances.',
			cta: 'Analyser mon CV →',
			url: '/me/my-cv',
			bg: 'ocean-blue',
			buttonType: 'secondary'
		},
		{
			icon: 'icon-[mdi--account-voice]',
			title: 'Préparer les entretiens',
			description: 'Simulez des entretiens avec notre coach IA. Entraînez-vous sur les questions les plus fréquentes et obtenez un feedback instantané et personnalisé.',
			cta: "S'entraîner →",
			url: '/me/preparation',
			bg: 'lighthouse-yellow',
			buttonType: 'primary'
		},
		{
			icon: 'icon-[mdi--bell-outline]',
			title: 'Alertes personnalisées',
			description: 'Configurez des alertes ciblées et recevez les meilleures nouvelles offres directement dans votre boîte mail dès leur publication sur les plateformes.',
			cta: 'Configurer mes alertes →',
			url: '/me/notifications',
			bg: 'butter-yellow',
			buttonType: 'primary'
		},
		{
			icon: 'icon-[mdi--domain]',
			title: 'Annuaire entreprises',
			description: "Consultez les fiches détaillées de 850+ entreprises partenaires : culture, témoignages d'alternants, processus de recrutement et contacts RH directs.",
			cta: 'Explorer les entreprises →',
			url: '/companies',
			bg: 'white',
			buttonType: 'secondary'
		}
	];
</script>

<section class="bg-lighthouse-white px-6 py-20">
	<div class="mx-auto max-w-screen-xl">

		<!-- Titre + sous-titre -->
		<div class="mb-14 text-center">
			<h2 class="mb-4 font-grift text-4xl font-extrabold text-ocean-blue">
				Des outils pensés pour vous
			</h2>
			<p class="mx-auto max-w-lg font-just-sans text-base text-ecume-blue">
				Maximisez vos chances de décrocher l'alternance idéale
				avec notre suite complète d'outils propulsés par l'IA
			</p>
		</div>

		<!-- Grille 2x2 -->
		<div class="grid grid-cols-2 gap-6 max-md:grid-cols-1">

			<!-- Card 1 — Bleu -->
			<div class="flex flex-col gap-6 rounded-3xl bg-ocean-blue p-8">
				<span class="icon-[mdi--file-document-outline] text-3xl text-white"></span>
				<div>
					<h3 class="mb-3 font-grift text-xl font-bold text-white">Vérification CV</h3>
					<p class="font-just-sans text-sm leading-relaxed text-white/70">
						Notre IA analyse votre CV et vous donne un score de compatibilité détaillé avec les
						offres ciblées, plus des suggestions personnalisées pour maximiser vos chances.
					</p>
				</div>
				<Button type="secondary" action={{ url: '/me/my-cv' }}>
					Analyser mon CV →
				</Button>
			</div>

			<!-- Card 2 — Jaune -->
			<div class="flex flex-col gap-6 rounded-3xl bg-lighthouse-yellow p-8">
				<span class="flex h-10 w-10 rounded-xl bg-white"></span>
				<div>
					<h3 class="mb-3 font-grift text-xl font-bold text-ocean-blue">Préparer les entretiens</h3>
					<p class="font-just-sans text-sm leading-relaxed text-ocean-blue/70">
						Simulez des entretiens avec notre coach IA. Entraînez-vous sur les questions les
						plus fréquentes et obtenez un feedback instantané et personnalisé.
					</p>
				</div>
				<Button type="primary" action={{ url: '/me/preparation' }}>
					S'entraîner →
				</Button>
			</div>

			<!-- Card 3 — Jaune beurre -->
			<div class="flex flex-col gap-6 rounded-3xl bg-butter-yellow p-8">
				<span class="icon-[mdi--bell-outline] text-3xl text-ocean-blue"></span>
				<div>
					<h3 class="mb-3 font-grift text-xl font-bold text-ocean-blue">Alertes personnalisées</h3>
					<p class="font-just-sans text-sm leading-relaxed text-ocean-blue/70">
						Configurez des alertes ciblées et recevez les meilleures nouvelles offres
						directement dans votre boîte mail dès leur publication sur les plateformes.
					</p>
				</div>
				<Button type="primary" action={{ url: '/me/notifications' }}>
					Configurer mes alertes →
				</Button>
			</div>

			<!-- Card 4 — Blanc avec bordure -->
			<div class="flex flex-col gap-6 rounded-3xl border border-bleuet-blue bg-white p-8">
				<span class="icon-[mdi--view-grid-outline] text-3xl text-ocean-blue"></span>
				<div>
					<h3 class="mb-3 font-grift text-xl font-bold text-ocean-blue">Annuaire entreprises</h3>
					<p class="font-just-sans text-sm leading-relaxed text-ecume-blue">
						Consultez les fiches détaillées de 850+ entreprises partenaires : culture,
						témoignages d'alternants, processus de recrutement et contacts RH directs.
					</p>
				</div>
				<Button type="secondary" action={{ url: '/companies' }}>
					Explorer les entreprises →
				</Button>
			</div>

		</div>
	</div>
</section>