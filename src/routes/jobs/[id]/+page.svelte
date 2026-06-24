<script lang="ts">
	import Apply from '$lib/components/forms/apply.svelte';
	import OfferDetails from '$lib/components/jobs/offer-details.svelte';
	import SimilarOffers from '$lib/components/jobs/similar-offers.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="mt-32 px-12">
	<a href="/jobs" class="hover:underline">← Revenir à la liste des offres</a>

	<div class="mx-auto mt-4 mb-8 flex max-w-400 justify-center gap-8 max-md:flex-col">
		<section class="max-w-200">
			<OfferDetails job={data.job} />
		</section>

		<section class="sticky top-18 h-fit w-fit text-nowrap max-md:w-full">
			<Apply job={data.job} />
		</section>
	</div>

	<SimilarOffers jobs={data.similarJobs} />
</div>