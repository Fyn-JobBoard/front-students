<script lang="ts">
	import type { Job } from 'fyn-api-sdk';
	import City from '../resolvers/city.svelte';

	const {
		job,
		featured = false,
		max_description_length = 200
	}: {
		job: Job;
		featured?: boolean;
		max_description_length?: number;
	} = $props();

	const { id, title, description, company, lat, lng, activity_domain } = $derived(job);
	const description_preview = $derived.by(() => {
		const stripped = description.replaceAll(/<\/?\w+(?:\s+.*?)?>/g, '');
		if (stripped.length > max_description_length) {
			return stripped.slice(0, 200).replace(/\w+(?!\s+)$/, '') + '...';
		}
		return stripped;
	});
</script>

<a href="/jobs/{id}" class="block h-full">
	<article
		class={[
			'flex h-full flex-col justify-between rounded-2xl p-6 transition-shadow hover:shadow-md',
			featured
				? 'border-ocean-blue bg-ocean-blue text-white'
				: 'border border-[#e8ecff] bg-white text-ocean-blue'
		]}
	>
		<div>
			<span
				class={[
					'font-corps rounded-full px-3 py-1 text-xs font-medium',
					featured ? 'bg-white/15 text-white' : 'bg-[#f0f3ff] text-ocean-blue'
				].join(' ')}
			>
				{activity_domain.name}
			</span>

			<h3
				class={[
					'mt-4 font-headings text-xl leading-tight font-bold',
					featured ? 'text-white' : 'text-ocean-blue'
				].join(' ')}
			>
				{title}
			</h3>

			<p
				class={[
					'font-corps mt-2 text-sm font-bold',
					featured ? 'text-white' : 'text-ocean-blue'
				].join(' ')}
			>
				{company.name}
			</p>

			<p
				class={[
					'font-corps mt-3 max-h-60 overflow-hidden text-sm',
					featured ? 'text-white/70' : 'text-ecume-blue'
				].join(' ')}
			>
				{description_preview}
			</p>
		</div>

		<div class="mt-6 flex items-center justify-between">
			<span
				class={['font-corps text-sm', featured ? 'text-white/70' : 'text-ecume-blue'].join(' ')}
			>
				{#if lat && lng}
					📍 <City {lat} {lng} />
				{/if}
			</span>
			<span
				class="flex h-10 w-10 items-center justify-center rounded-full bg-lighthouse-yellow text-lg font-bold text-ocean-blue"
			>
				&#8594;
			</span>
		</div>
	</article>
</a>
