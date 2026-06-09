<script lang="ts">
	import { page } from '$app/state';

	const {
		lat,
		lng
	}: {
		lat: number;
		lng: number;
	} = $props();

	const params = $derived(
		new URLSearchParams({
			lat: lat.toString(),
			lng: lng.toString()
		})
	);

	const url = $derived(new URL(`/api/resolve/city?${params.toString()}`, page.url));
</script>

{#await fetch(url).then((r) => r.json())}
	{lat}/{lng}
{:then { city }}
	{city}
{/await}
