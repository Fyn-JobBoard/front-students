<script lang="ts">
	import type { PageData } from './$types';
    import OfferDetails from '$lib/components/jobs/offer-details.svelte';

	let { data }: { data: PageData } = $props();

</script>

<OfferDetails />