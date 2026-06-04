<script lang="ts">
	import articlesData from '$lib/data/articles/articles.json';

	type Article = {
		id: number;
		title: string;
		description: string;
		content: string;
		publish_date: string;
	};

	const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
		day: '2-digit',
		month: 'long',
		year: 'numeric'
	});

	const articles = (articlesData as Article[])
		.toSorted((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
		.map((article) => ({
			...article,
			publishDateLabel: dateFormatter.format(new Date(article.publish_date))
		}));
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
			<article
				class="flex h-full flex-col rounded-lg border border-ocean-blue/10 bg-white p-5 shadow-sm transition hover:border-ocean-blue/25 hover:shadow-md"
			>
				<div
					class="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-lighthouse-white text-ocean-blue"
				>
					<span class="icon-[mdi--newspaper-variant-outline] size-7" aria-hidden="true"></span>
				</div>

				<div class="flex flex-1 flex-col">
					<p class="text-sm font-medium text-ocean-blue/60">{article.publishDateLabel}</p>
					<h3 class="mt-2 text-xl font-semibold text-ocean-blue">{article.title}</h3>
					<p class="mt-3 text-sm leading-6 text-ocean-blue/70">{article.description}</p>

					<details class="mt-5">
						<summary
							class="focus:ring-picton-blue inline-flex w-fit cursor-pointer list-none items-center rounded-md bg-ocean-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-ocean-blue/90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
						>
							Lire l'article
						</summary>
						<div class="prose prose-sm mt-4 max-w-none text-ocean-blue/80">
							{@html article.content}
						</div>
					</details>
				</div>
			</article>
		{/each}
	</div>
</section>
