<script lang="ts">
	let {
		name,
		label,
		checked = $bindable(),
		extra_label,
		id: givenId,
		value
	}: {
		name: string;
		label: string;
		checked: boolean;

		id?: string;
		value?: string;
		extra_label?: string;
	} = $props();

	const id = $derived(givenId ?? `checkbox_${name}`);
</script>

<label
	for={id}
	class="grid items-center justify-start gap-2 text-sm font-normal {extra_label
		? 'grid-cols-[auto_auto_1fr]'
		: 'grid-cols-[auto_auto]'}"
>
	<input
		type="checkbox"
		class="appearance-none rounded-sm border-2 border-ocean-blue bg-white checked:bg-ocean-blue"
		{name}
		{id}
		{value}
		bind:checked
	/>
	<p class="text-black">{label}</p>

	{#if extra_label}
		<span class="justify-self-end text-ecume-blue text-xs font-light">{extra_label}</span>
	{/if}
</label>
