<script lang="ts">
	let {
		number,
		title,
		description
	}: {
		number: string;
		title: string;
		description: string;
	} = $props();
</script>

<article class="rounded-3xl bg-white px-8 py-12">
	<div class="flex flex-col gap-6">
		<div class="flex h-14 w-14 items-center justify-center rounded-full bg-lighthouse-yellow">
			<span class="text-2xl leading-none font-extrabold text-ocean-blue">{number}</span>
		</div>
		<div class="flex flex-col gap-5">
			<h3 class="m-0 font-just-sans text-xl leading-tight font-semibold text-ocean-blue">
				{title}
			</h3>
			<p class="m-0 max-w-64 font-just-sans text-base leading-6 font-light text-ecume-blue">
				{description}
			</p>
		</div>
	</div>
</article>
