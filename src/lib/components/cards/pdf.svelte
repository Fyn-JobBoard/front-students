<script module lang="ts">
	export interface PdfResource {
		title: string;
		file: string;
	};
</script>

<script lang="ts">
	let { resource }: { resource: PdfResource } = $props();
</script>

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
			Télecharger
		</a>
	</div>
</article>
