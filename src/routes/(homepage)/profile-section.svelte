<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
</script>

<section class="bg-lighthouse-white px-3.5 pt-20 pb-14">
	<div class="mx-auto grid max-w-screen-2xl grid-cols-2 items-center gap-12 max-lg:grid-cols-1">
		<div class="flex flex-col items-start gap-6 pl-25 max-lg:pl-0">
			<span
				class="rounded-full bg-butter-yellow px-4 py-1.5 font-inter text-xs font-semibold text-ocean-blue"
			>
				Ton profil centralisé
			</span>
			<h2 class="max-w-xs font-grift text-4xl leading-tight font-extrabold text-ocean-blue">
				Un profil qui parle pour toi
			</h2>
			<p class="max-w-lg font-inter text-base font-normal text-ecume-blue">
				Crée un profil riche et attractif. Les recruteurs peuvent te trouver et te contacter
				directement. Mets en valeur tes compétences, expériences et projets.
			</p>
			<ul class="space-y-4">
				<li class="flex items-center gap-4 font-just-sans text-[15px] font-light">
					<span
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lighthouse-yellow font-inter text-sm font-bold text-ocean-blue"
						>✓</span
					>
					CV généré automatiquement depuis ton profil
				</li>
				<li class="flex items-center gap-4 font-just-sans text-[15px] font-light">
					<span
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lighthouse-yellow font-inter text-sm font-bold text-ocean-blue"
						>✓</span
					>
					Score de compatibilité avec les offres
				</li>
				<li class="flex items-center gap-4 font-just-sans text-[15px] font-light">
					<span
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lighthouse-yellow font-inter text-sm font-bold text-ocean-blue"
						>✓</span
					>
					Visible par 850+ entreprises partenaires
				</li>
				<li class="flex items-center gap-4 font-just-sans text-[15px] font-light">
					<span
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lighthouse-yellow font-inter text-sm font-bold text-ocean-blue"
						>✓</span
					>
					Suggestions de compétences à développer
				</li>
			</ul>

			<Button type="primary" size="default" action={{ url: '/wip' }}
				>Créer mon profil gratuitement →</Button
			>
		</div>

		<article
			class="min-h-110 w-full max-w-140 justify-self-center rounded-3xl border border-[#dfe6ff] bg-white px-7 py-6"
		>
			<div class="flex items-start gap-5">
				<div
					class="flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-reflect-yellow"
				>
					<span class="font-inter text-lg font-black text-ocean-blue">ML</span>
				</div>

				<div class="flex flex-col gap-1">
					<h3 class="font-inter text-base leading-tight font-semibold text-ocean-blue">
						Marie Laurent
					</h3>
					<p class="font-inter text-[13px] font-light text-ecume-blue">
						Master Marketing Digital · Paris
					</p>
					<div
						class="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-[#DCFCE7] px-3 py-1 font-inter text-[11px] font-medium text-[#166634]"
					>
						<span class="h-2.5 w-2.5 rounded-full bg-[#166634]"></span>
						Disponible – Sept. 2026
					</div>
				</div>
			</div>

			<div class="my-8 h-px bg-[#dbe2f8]"></div>

			<div class="flex flex-wrap gap-3">
				<span
					class="rounded-full bg-bleuet-blue px-4 py-1.5 font-inter text-xs font-medium text-ocean-blue"
				>
					SEO/SEA
				</span>
				<span
					class="rounded-full bg-bleuet-blue px-4 py-1.5 font-inter text-xs font-medium text-ocean-blue"
				>
					Social Media
				</span>
				<span
					class="rounded-full bg-bleuet-blue px-4 py-1.5 font-inter text-xs font-medium text-ocean-blue"
				>
					Analytics
				</span>
				<span
					class="rounded-full bg-bleuet-blue px-4 py-1.5 font-inter text-xs font-medium text-ocean-blue"
				>
					Canva
				</span>
			</div>

			<p class="mt-6 max-w-155 font-inter text-base leading-7 font-light text-ecume-blue italic">
				Passionnée par le marketing digital, je cherche une alternance pour mettre en pratique mes
				compétences en stratégie de contenu.
			</p>
		</article>
	</div>
</section>
