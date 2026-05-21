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

<article class="min-h-[282px] rounded-[20px] bg-white p-8">
	<div class="flex flex-col gap-6">
		<div class="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFDD3C]">
			<span class="text-2xl leading-none font-extrabold text-[#30428f]">{number}</span>
		</div>
		<div class="flex flex-col gap-5">
			<h3 class="m-0 font-just-sans text-xl leading-tight font-semibold text-[#30428f]">{title}</h3>
			<p
				class="m-0 max-w-[250px] font-just-sans text-base leading-[1.55] font-light text-[#7f8dcc]"
			>
				{description}
			</p>
		</div>
	</div>
</article>
