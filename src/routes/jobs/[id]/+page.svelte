<script lang="ts">
	import Apply from '$lib/components/forms/apply.svelte';
	import OfferDetails from '$lib/components/jobs/offer-details.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto mt-32 mb-8 flex max-w-400 justify-center gap-8">
	<section class="max-w-200">
		<OfferDetails job={data.job} />
	</section>

	<section class="sticky top-18 h-fit">
		<Apply job={data.job} />
	</section>
</div>
