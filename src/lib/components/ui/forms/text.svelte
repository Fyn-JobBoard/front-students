<script lang="ts">
	let {
		name,
		label,
		value = $bindable(''),
		id: givenId,
		required = false,
		placeholder = ''
	}: {
		name: string;
		label: string;
		value?: string;
		id?: string;
		required?: boolean;
		placeholder?: string;
	} = $props();

	const id = $derived(givenId ?? `text_${name}`);
</script>

<div class="flex flex-col gap-1.5">
	<label for={id} class="font-corps text-sm font-medium text-ocean-blue">
		{label}
	</label>
	<input
		{id}
		{name}
		type="text"
		{required}
		{placeholder}
		bind:value
		class="font-corps rounded-xl border border-bleuet-blue px-4 py-3 text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:outline-none"
	/>
</div>