<script lang="ts">
	const pdfFiles = import.meta.glob('../../resources/pdf/*.pdf', {
		eager: true,
		import: 'default'
	}) as Record<string, string>;

	const titleFromFileName = (path: string) => {
		const fileName =
			path
				.split('/')
				.at(-1)
				?.replace(/\.pdf$/i, '') ?? 'Document PDF';

		return fileName
			.split(/[-_\s]+/)
			.filter((part) => !/^[a-f0-9]{16,}$/i.test(part))
			.map((part) => {
				if (/^\d+$/.test(part)) return part;
				return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
			})
			.join(' ');
	};

	const resources = Object.entries(pdfFiles)
		.map(([path, file]) => ({
			title: titleFromFileName(path),
			file
		}))
		.sort((a, b) => a.title.localeCompare(b.title, 'fr'));
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
			<article class="overflow-hidden rounded-lg border border-ocean-blue/10 bg-white shadow-sm">
				<div class="relative bg-lighthouse-white">
					<iframe
						src={`${resource.file}#toolbar=0&navpanes=0&scrollbar=0`}
						title={`Aperçu PDF - ${resource.title}`}
						class="pointer-events-none h-72 w-full border-0"
					></iframe>
					<a
						href={resource.file}
						target="_blank"
						rel="noreferrer"
						aria-label={`Ouvrir ${resource.title}`}
						class="focus:ring-picton-blue absolute inset-0 cursor-pointer focus:ring-2 focus:outline-none focus:ring-inset"
					></a>
				</div>

				<div class="p-5">
					<h2 class="text-xl font-semibold text-ocean-blue">{resource.title}</h2>

					<div class="mt-5 flex flex-wrap gap-3">
						<a
							href={resource.file}
							download
							class="focus:ring-picton-blue inline-flex items-center rounded-md border border-ocean-blue/20 px-4 py-2 text-sm font-medium text-ocean-blue transition hover:border-ocean-blue/40 hover:bg-lighthouse-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
						>
							Telecharger
						</a>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>
