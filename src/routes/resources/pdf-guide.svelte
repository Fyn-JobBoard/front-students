<script lang="ts">
	import PdfCards from '$lib/components/cards/pdf.svelte';

	type Resource = {
		title: string;
		file: string;
	};

	let { resources = [] }: { resources?: Resource[] } = $props();
</script>

<PdfCards {resources} />
