<script lang="ts">
	import Profile from '$lib/components/Profile/profile.svelte';

	const STAR_COUNT = 5;

	let {
		stars,
		review,
		reviewer
	}: {
		stars: number;
		review: string;
		reviewer: {
			first_name: string;
			last_name: string;
			status: string;
		};
	} = $props();
</script>

<article class="flex h-full w-full max-w-100 flex-col rounded-3xl bg-white px-6 py-8">
	<div class="mb-6 flex gap-1 text-lg leading-none">
		{#each Array.from({ length: STAR_COUNT }) as _, index}
			<span class={index < stars ? 'text-lighthouse-yellow' : 'text-bleuet-blue'}>★</span>
		{/each}
	</div>

	<p class="m-0 mb-6 max-w-xs font-just-sans text-sm leading-7 font-light text-gray-700 italic">
		"{review}"
	</p>

	<div class="mt-auto flex items-center gap-5">
		<Profile
			firstName={reviewer.first_name}
			lastName={reviewer.last_name}
			metaLabel="Statut"
			metaValue={reviewer.status}
		/>
	</div>
</article>
