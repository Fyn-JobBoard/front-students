<script lang="ts">
	let {
		label,
		name,
		accept,
		helper,
		required = false,
		files = $bindable()
	}: {
		label: string;
		name: string;
		accept?: string;
		helper?: string;
		required?: boolean;
		files?: FileList;
	} = $props();
</script>

<div class="flex flex-col gap-2">
	<label for={name} class="text-base font-semibold text-ocean-blue">
		{label}

		{#if required}
			<span class="text-red-500">*</span>
		{/if}
	</label>

	<div
		class="rounded-2xl border border-dashed border-ocean-blue/25 bg-lighthouse-white px-4 py-5 transition focus-within:border-ocean-blue focus-within:ring-4 focus-within:ring-ocean-blue/10"
	>
		<input
			id={name}
			{name}
			type="file"
			{accept}
			{required}
			bind:files
			class="w-full cursor-pointer text-sm font-medium text-ocean-blue file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-lighthouse-yellow file:px-5 file:py-2.5 file:text-sm file:font-semibold file:text-ocean-blue hover:file:bg-reflect-yellow"
		/>

		{#if helper}
			<p class="mt-3 text-sm text-ocean-blue/60">{helper}</p>
		{/if}
	</div>
</div>
