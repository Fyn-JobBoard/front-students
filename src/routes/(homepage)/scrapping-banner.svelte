<script lang="ts">
	import Button from '../../lib/components/ui/button.svelte';

	const platforms = ['LinkedIn', 'Indeed', 'Welcome to the Jungle', 'Hellowork'];
</script>

<section class="bg-ocean-blue px-6 py-20 text-white">
	<div class="mx-auto max-w-4xl text-center">

		<h2 class="mb-6 text-4xl font-black md:text-5xl">
			Toutes les offres au même endroit
		</h2>

		<p class="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/70">
			FYN agrège automatiquement les offres de LinkedIn, Indeed, Welcome to the Jungle,
			Hellowork et bien d'autres. Plus de navigation entre 10 sites différents.
		</p>

		<div class="mb-10 flex flex-wrap items-center justify-center gap-3">
			{#each platforms as platform}
				<span class="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white">
					{platform}
				</span>
			{/each}
		</div>

		<Button action={{ url: '/jobs' }} type="secondary">
			Explorer toutes les offres →
		</Button>

	</div>
</section>