<script module lang="ts">
	export type Article = {
		id: number;
		title: string;
		description: string;
		content: string;
		publish_date: string;
	};
</script>

<script lang="ts">
	let { article }: { article: Article } = $props();

	const publishDateLabel = $derived(
		new Intl.DateTimeFormat('fr-FR', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		}).format(new Date(article.publish_date))
	);
</script>

<article
	class="flex h-full flex-col rounded-lg border border-ocean-blue/10 bg-white p-5 shadow-sm transition hover:border-ocean-blue/25 hover:shadow-md"
>
	<div
		class="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-lighthouse-white text-ocean-blue"
	>
		<span class="icon-[mdi--newspaper-variant-outline] size-7" aria-hidden="true"></span>
	</div>

	<div class="flex flex-1 flex-col">
		<p class="text-sm font-medium text-ocean-blue/60">{publishDateLabel}</p>
		<h3 class="mt-2 text-xl font-semibold text-ocean-blue">{article.title}</h3>
		<p class="mt-3 text-sm leading-6 text-ocean-blue/70">{article.description}</p>

		<a
			href={`/resources/${article.id}`}
			class="focus:ring-picton-blue mt-5 inline-flex w-fit items-center rounded-md bg-ocean-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-ocean-blue/90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
		>
			Lire l'article
		</a>
	</div>
</article>
