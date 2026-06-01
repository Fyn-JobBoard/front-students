<script lang="ts">
	let {
		label,
		name,
		placeholder,
		rows = 5,
		minHeight = '300px',
		maxlength = 8192,
		required = false,
		value = $bindable('')
	}: {
		label: string;
		name: string;
		placeholder?: string;
		rows?: number;
		minHeight?: string;
		maxlength?: number;
		required?: boolean;
		value?: string;
	} = $props();
</script>

<div class="flex flex-col gap-2">
	<label for={name} class="text-base font-semibold text-ocean-blue">
		{label}

		{#if required}
			<span class="text-red-500">*</span>
		{/if}
	</label>

	<textarea
		id={name}
		{name}
		bind:value
		{rows}
		{required}
		{placeholder}
		{maxlength}
		class:--min-h={minHeight}
		class="min-h-(--min-h) resize-y rounded-2xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 text-base leading-7 text-ocean-blue shadow-inner transition outline-none placeholder:text-ocean-blue/45 focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10"
	></textarea>
</div>
