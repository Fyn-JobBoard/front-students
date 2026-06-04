<script lang="ts">
	import PdfGuide from './pdf-guide.svelte';
	import type { PageData } from './$types';
    import Article from '$lib/components/cards/article.svelte';

	let { data }: { data: PageData } = $props();
</script>

<PdfGuide resources={data.resources} />
<Article />