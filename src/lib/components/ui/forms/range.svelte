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

	const min_value = $derived(typeof min === 'object' ? min.value : (min ?? 0));
	const max_value = $derived(typeof max === 'object' ? max.value : (max ?? 100));
	const progress = $derived((value - min_value) / (max_value - min_value));
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

	<div
		class="relative before:w-full before:bg-bleuet-blue after:w-(--progress) after:bg-ocean-blue"
		style:--progress={progress * 100 + '%'}
	>
		<input
			type="range"
			{name}
			{id}
			bind:value
			min={typeof min === 'object' ? min.value : min}
			max={typeof max === 'object' ? max.value : max}
			class="
				h-2 w-full cursor-col-resize appearance-none rounded-full bg-ecume-blue text-ocean-blue opacity-0
			"
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
	label > div {
		&::before,
		&::after {
			content: '';
			position: absolute;
			height: 30%;
			top: 50%;
			left: 0;
			translate: 0 -50%;

			border-radius: calc(1px * infinity);
		}
	}
</style>
