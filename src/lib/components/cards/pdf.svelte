<script lang="ts">
	type Resource = {
		title: string;
		file: string;
	};

	let { resources = [] }: { resources?: Resource[] } = $props();
</script>

<section class="mx-auto w-full max-w-6xl px-4 py-12 pt-28 sm:px-6 lg:px-8">
	<div class="mb-8 max-w-2xl">
		<p class="text-picton-blue text-sm font-semibold tracking-wider uppercase">Ressources</p>
		<h1 class="font-display mt-2 text-3xl font-semibold text-ocean-blue sm:text-4xl">
			Guides et documents utiles
		</h1>
	</div>

	<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
		{#each resources as resource}
			<article
				class="rounded-lg border border-ocean-blue/10 bg-white p-5 shadow-sm transition hover:border-ocean-blue/25 hover:shadow-md"
			>
				<div
					class="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-lighthouse-white text-ocean-blue"
				>
					<span class="icon-[mdi--file-pdf-box] size-7" aria-hidden="true"></span>
				</div>

				<h2 class="text-xl font-semibold text-ocean-blue">{resource.title}</h2>

				<div class="mt-5 flex flex-wrap gap-3">
					<a
						href={resource.file}
						target="_blank"
						rel="noreferrer"
						class="focus:ring-picton-blue inline-flex items-center rounded-md bg-ocean-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-ocean-blue/90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
					>
						Consulter
					</a>
					<a
						href={resource.file}
						download
						class="focus:ring-picton-blue inline-flex items-center rounded-md border border-ocean-blue/20 px-4 py-2 text-sm font-medium text-ocean-blue transition hover:border-ocean-blue/40 hover:bg-lighthouse-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
					>
						Telecharger
					</a>
				</div>
			</article>
		{/each}
	</div>
</section>
