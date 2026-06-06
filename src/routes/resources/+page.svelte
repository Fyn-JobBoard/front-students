<script lang="ts">
	import BlogSection from './blog-section.svelte';
	import PdfGuide from './pdf-guide.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<PdfGuide resources={data.resources} />
<BlogSection />
