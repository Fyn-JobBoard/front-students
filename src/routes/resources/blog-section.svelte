<script lang="ts">
	import ArticleCard, { type Article } from '$lib/components/cards/article.svelte';
	import articlesData from '$lib/data/articles/articles.json';

	const articles = [...(articlesData as Article[])].sort(
		(a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
	);
</script>

<section class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="mb-8 max-w-2xl">
		<p class="text-picton-blue text-sm font-semibold tracking-wider uppercase">Blog</p>
		<h2 class="font-display mt-2 text-3xl font-semibold text-ocean-blue sm:text-4xl">
			Articles récents
		</h2>
	</div>

	<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
		{#each articles as article (article.id)}
			<ArticleCard {article} />
		{/each}
	</div>
</section>
