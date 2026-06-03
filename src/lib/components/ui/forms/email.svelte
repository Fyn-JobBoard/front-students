<script lang="ts">
	let {
		name = 'email',
		label = 'Email',
		value = $bindable(''),
		id: givenId
	}: {
		name?: string;
		label?: string;
		value?: string;
		id?: string;
	} = $props();

	const id = $derived(givenId ?? `email_${name}`);
</script>

<div class="flex flex-col gap-1.5">
	<label for={id} class="font-corps text-sm font-medium text-ocean-blue">
		{label}
	</label>
	<input
		{id}
		{name}
		type="email"
		required
		bind:value
		pattern={'[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}'}
		title="Veuillez entrer une adresse email valide"
		class="font-corps rounded-xl border border-bleuet-blue px-4 py-3 text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:outline-none"
	/>
</div>
