<script lang="ts">
	let {
		name = 'password',
		label = 'Mot de passe',
		value = $bindable(''),
		id: givenId
	}: {
		name?: string;
		label?: string;
		value?: string;
		id?: string;
	} = $props();

	const id = $derived(givenId ?? `password_${name}`);
	let showPassword = $state(false);
</script>

<div class="flex flex-col gap-1.5">
	<label for={id} class="font-corps text-sm font-medium text-ocean-blue">
		{label}
	</label>
	<div class="relative">
		<input
			{id}
			{name}
			type={showPassword ? 'text' : 'password'}
			required
			bind:value
			class="w-full rounded-xl border border-bleuet-blue px-4 py-3 pr-12 font-corps text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:outline-none"
		/>
		<button
			type="button"
			onclick={() => (showPassword = !showPassword)}
			class="absolute right-4 top-1/2 -translate-y-1/2 text-ecume-blue hover:text-ocean-blue transition-colors"
			aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
		>
			{#if showPassword}
				<span class="icon-[mdi--eye-off] text-xl"></span>
			{:else}
				<span class="icon-[mdi--eye] text-xl"></span>
			{/if}
		</button>
	</div>
</div>