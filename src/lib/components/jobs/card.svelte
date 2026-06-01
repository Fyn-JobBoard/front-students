<script lang="ts">
	const {
		id,
		category,
		title,
		company,
		description,
		location,
		featured = false
	}: {
		id: string;
		category: string;
		title: string;
		company: string;
		description: string;
		location: string;
		featured?: boolean;
	} = $props();
</script>

<a href="/jobs/{id}" class="block h-full">
	<article class={[
		'flex flex-col justify-between rounded-2xl p-6 h-full transition-shadow hover:shadow-md',
		featured
			? 'bg-ocean-blue border-ocean-blue text-white'
			: 'bg-white border border-[#e8ecff] text-ocean-blue'
]}>

		<div>
			<span class={[
				'rounded-full px-3 py-1 font-corps text-xs font-medium',
				featured ? 'bg-white/15 text-white' : 'bg-[#f0f3ff] text-ocean-blue'
			].join(' ')}>
				{category}
			</span>

			<h3 class={[
				'mt-4 font-headings text-xl font-bold leading-tight',
				featured ? 'text-white' : 'text-ocean-blue'
			].join(' ')}>
				{title}
			</h3>

			<p class={[
				'mt-2 font-corps text-sm font-bold',
				featured ? 'text-white' : 'text-ocean-blue'
			].join(' ')}>
				{company}
			</p>

			<p class={[
				'mt-3 font-corps text-sm leading-relaxed',
				featured ? 'text-white/70' : 'text-ecume-blue'
			].join(' ')}>
				{description}
			</p>
		</div>

		<div class="mt-6 flex items-center justify-between">
			<span class={[
				'font-corps text-sm',
				featured ? 'text-white/70' : 'text-ecume-blue'
			].join(' ')}>
				📍 {location}
			</span>
			<span class="flex h-10 w-10 items-center justify-center rounded-full bg-lighthouse-yellow text-ocean-blue text-lg font-bold">
				&#8594;
			</span>
		</div>

	</article>
</a>