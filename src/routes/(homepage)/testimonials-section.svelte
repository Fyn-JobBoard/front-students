<script lang="ts">
	import reviews from '$lib/data/reviews.json';
	import ReviewCard from './review-card.svelte';
</script>

<section class="bg-lighthouse-white px-3.5 pt-20 pb-14">
	<h2 class="m-0 mb-4 text-center font-grift text-4xl leading-tight font-extrabold text-ocean-blue">
		Ce qu'ils en pensent
	</h2>
	<p class="m-0 mb-13 text-center font-just-sans text-base leading-6 font-light text-ecume-blue">
		Plus de 12 000 étudiants ont déjà trouvé leur voie grâce à FYN
	</p>

	<div class="mx-auto grid max-w-7xl grid-cols-3 gap-1 max-lg:grid-cols-2 max-sm:grid-cols-1">
		{#each reviews as review}
			<ReviewCard {...review} />
		{/each}
	</div>
</section>
