<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const publishDateLabel = $derived(
		new Intl.DateTimeFormat('fr-FR', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		}).format(new Date(data.article.publish_date))
	);
</script>

<svelte:head>
	<title>{data.article.title}</title>
	<meta name="description" content={data.article.description} />
</svelte:head>

<article class="mx-auto w-full max-w-3xl px-4 py-12 pt-28 sm:px-6 lg:px-8">
	<a
		href="/resources"
		class="focus:ring-picton-blue inline-flex items-center text-sm font-medium text-ocean-blue/70 transition hover:text-ocean-blue focus:ring-2 focus:ring-offset-2 focus:outline-none"
	>
		<span class="mr-2 icon-[mdi--arrow-left] size-4" aria-hidden="true"></span>
		Retour aux ressources
	</a>

	<header class="mt-8">
		<p class="text-picton-blue text-sm font-semibold tracking-wider uppercase">
			{publishDateLabel}
		</p>
		<h1 class="font-display mt-3 text-4xl font-semibold text-ocean-blue sm:text-5xl">
			{data.article.title}
		</h1>
		<p class="mt-5 text-lg leading-8 text-ocean-blue/70">{data.article.description}</p>
	</header>

	<div class="prose prose-lg mt-10 max-w-none text-ocean-blue/80">
		{@html data.article.content}
	</div>
</article>
