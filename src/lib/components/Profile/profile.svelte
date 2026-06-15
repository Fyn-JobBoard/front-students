<script lang="ts">
	import ProfilePicture from './profile-picture.svelte';

	let {
		identifier,
		firstName,
		lastName,
		email,
		info,
		size = 'md'
	}: {
		identifier?: string;
		firstName?: string;
		lastName?: string;
		email?: string;
		info: string;
		size?: 'sm' | 'md' | 'lg';
	} = $props();

	const name = $derived(firstName && lastName ? `${firstName} ${lastName}` : (identifier ?? ''));
</script>

<div class="flex items-start gap-5">
	<ProfilePicture {identifier} {firstName} {lastName} {size} />

	<div class="grid gap-y-3">
		<p class="m-0 font-just-sans text-base leading-6 text-ocean-blue">
			<span class="font-semibold">Nom :</span>
			<span class="font-grift font-extrabold text-ecume-blue">{name}</span>
		</p>
		<p class="m-0 font-just-sans text-base leading-6 text-ecume-blue">
			<span class="font-semibold text-ocean-blue">Date de naissance :</span>
			{info}
		</p>
		{#if email}
			<p class="m-0 font-just-sans text-base leading-6 text-ecume-blue">
				<span class="font-semibold text-ocean-blue">Adresse mail :</span>
				{email}
			</p>
		{/if}
	</div>
</div>
