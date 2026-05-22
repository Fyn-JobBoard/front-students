<script lang="ts">
	let {
		name,
		value = $bindable(),
		id: givenId,
		label,
		max,
		min,
		step
	}: {
		name: string;
		value: number;
		label?: string;
		id?: string;

		min?:
			| number
			| {
					value: number;
					label: string;
			  };
		max?:
			| number
			| {
					value: number;
					label: string;
			  };
		step?: number;
	} = $props();

	const id = $derived(givenId ?? `range_${name}`);
</script>

{#snippet range_label(aria: string, label: string, classes?: string)}
	<span class="absolute top-full font-light text-ecume-blue {classes}" aria-label={aria}>
		{label}
	</span>
{/snippet}

<label for={id}>
	{#if label}
		<p>{label}</p>
	{/if}

	<div class="relative">
		<input
			type="range"
			{name}
			{id}
			bind:value
			min={typeof min === 'object' ? min.value : min}
			max={typeof max === 'object' ? max.value : max}
			class="h-2 w-full cursor-col-resize appearance-none rounded-full bg-ecume-blue text-ocean-blue"
		/>

		{#if typeof min === 'object'}
			{@render range_label('Minimum possible', min.label, 'left-0')}
		{/if}
		{#if typeof max === 'object'}
			{@render range_label('Maximum possible', max.label, 'right-0')}
		{/if}
	</div>
</label>

<style>
	input {
		&::-ms-thumb,
		&::-webkit-slider-thumb,
		&::-moz-range-thumb,
		&::slider-thumb {
			appearance: none;
			width: 2px;
			height: 2px;
			background: transparent;
		}

		&::-moz-progress-bar,
		&::-moz-range-progress,
		&::-webkit-progress-value,
		&::-webkit-progress-bar {
			background-color: currentColor;
			height: 100%;
			border-radius: calc(1px * infinity);
		}
	}
</style>
