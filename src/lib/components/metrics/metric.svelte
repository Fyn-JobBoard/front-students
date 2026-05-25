<script lang="ts">
	const {
		metric,
		context
	}: {
		metric: string;
		context: string;
	} = $props();
</script>

<p class="w-fit">
	<strong class="grid grid-rows-[repeat(2,auto)] text-center">
		<span class="text-4xl text-ocean-blue">
			{metric}
		</span>
		<span class="font-light text-ecume-blue">
			{context}
		</span>
	</strong>
</p>
