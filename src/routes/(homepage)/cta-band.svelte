<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
</script>

<section class="bg-lighthouse-yellow px-6 py-24">
	<div class="mx-auto max-w-3xl text-center">

		<h2 class="mb-6 font-grift text-5xl font-extrabold leading-tight text-ocean-blue max-md:text-4xl">
			Prêt à décrocher ton alternance idéale ?
		</h2>

		<p class="mb-10 font-just-sans text-lg font-normal text-ocean-blue/70">
			Rejoins 12 000+ étudiants qui ont déjà trouvé leur voie. C'est gratuit.
		</p>

		<div class="flex items-center justify-center gap-4 flex-wrap">
			<Button type="primary" action={{ url: '/register' }}>
				Commencer maintenant →
			</Button>
			<Button type="neutral" action={{ url: '/jobs' }}>
				Voir les offres
			</Button>
		</div>

	</div>
</section>