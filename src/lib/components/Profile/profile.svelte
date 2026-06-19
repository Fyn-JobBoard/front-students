<script lang="ts">
	import type { Account, Student } from 'fyn-api-sdk';
	import ProfilePicture from './profile-picture.svelte';

	let {
		identifier,
		firstName,
		lastName,
		email,
		account,
		student,
		metaLabel,
		metaValue,
		size = 'md'
	}: {
		identifier?: string;
		firstName?: string;
		lastName?: string;
		email?: string;
		account?: Pick<Account, 'email'> | null;
		student?: Pick<Student, 'first_name' | 'last_name' | 'birthdate'> | null;
		metaLabel?: string;
		metaValue?: string;
		size?: 'sm' | 'md' | 'lg';
	} = $props();

	const resolvedFirstName = $derived(student?.first_name ?? firstName);
	const resolvedLastName = $derived(student?.last_name ?? lastName);
	const resolvedEmail = $derived(account?.email ?? email);
	const birthdate = $derived(student?.birthdate);
	const birthdateLabel = $derived(
		birthdate
			? new Intl.DateTimeFormat('fr-FR', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric'
				}).format(new Date(birthdate))
			: undefined
	);
	const secondaryLabel = $derived(birthdateLabel ? 'Date de naissance :' : metaValue ? `${metaLabel ?? 'Info'} :` : undefined);
	const secondaryValue = $derived(birthdateLabel ?? metaValue);
	const name = $derived(
		resolvedFirstName && resolvedLastName
			? `${resolvedFirstName} ${resolvedLastName}`
			: (identifier ?? '')
	);
</script>

<div class="flex items-start gap-5">
	<ProfilePicture
		{identifier}
		firstName={resolvedFirstName}
		lastName={resolvedLastName}
		{size}
	/>

	<div class="grid gap-y-3">
		<p class="m-0 font-just-sans text-base leading-6 text-ocean-blue">
			<span class="font-semibold">Nom :</span>
			<span class="m-0 font-just-sans text-base leading-6 text-ecume-blue">{name}</span>
		</p>
		{#if secondaryLabel && secondaryValue}
			<p class="m-0 font-just-sans text-base leading-6 text-ecume-blue">
				<span class="font-semibold text-ocean-blue">{secondaryLabel}</span>
				{secondaryValue}
			</p>
		{/if}
		{#if resolvedEmail}
			<p class="m-0 font-just-sans text-base leading-6 text-ecume-blue">
				<span class="font-semibold text-ocean-blue">Adresse mail :</span>
				{resolvedEmail}
			</p>
		{/if}
	</div>
</div>
