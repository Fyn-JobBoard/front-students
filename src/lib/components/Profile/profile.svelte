<script lang="ts">
	import type { Account, Student } from 'fyn-api-sdk';
	import ProfilePicture from './profile-picture.svelte';

	type ProfileProps = {
		identifier?: string;
		firstName?: string;
		lastName?: string;
		email?: string;
		account?: Pick<Account, 'email'> | null;
		student?: Pick<Student, 'first_name' | 'last_name' | 'birthdate'> & {
			account?: Pick<Account, 'email'> | null;
		};
		metaLabel?: string;
		metaValue?: string;
		size?: 'sm' | 'md' | 'lg';
	};

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
	}: ProfileProps = $props();

	const resolvedFirstName = $derived(student?.first_name ?? firstName);
	const resolvedLastName = $derived(student?.last_name ?? lastName);
	const resolvedEmail = $derived(student?.account?.email ?? account?.email ?? email);
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
	const secondaryLabel = $derived(
		birthdateLabel ? 'Date de naissance :' : metaValue ? `${metaLabel ?? 'Info'} :` : undefined
	);
	const secondaryValue = $derived(birthdateLabel ?? metaValue);
	const name = $derived(
		resolvedFirstName && resolvedLastName
			? `${resolvedFirstName} ${resolvedLastName}`
			: (identifier ?? '')
	);
</script>

<div class="flex items-center gap-5">
	<ProfilePicture
		{identifier}
		firstName={resolvedFirstName}
		lastName={resolvedLastName}
		{size}
	/>

	<div class="grid gap-y-1">
		<p class="m-0 font-headings text-lg font-extrabold leading-tight text-ocean-blue">
			{name}
		</p>
		{#if secondaryLabel && secondaryValue}
			<p class="m-0 font-just-sans text-base leading-tight font-light text-ocean-blue/65">
				{secondaryValue}
			</p>
		{/if}
		{#if resolvedEmail}
			<p class="m-0 font-just-sans text-sm leading-6 text-ecume-blue">
				{resolvedEmail}
			</p>
		{/if}
	</div>
</div>
