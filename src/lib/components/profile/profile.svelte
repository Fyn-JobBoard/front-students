<script module lang="ts">
	export interface ProfileInformations {
		firstName: string;
		lastName: string;

		email?: string;

		extra?: {
			label?: string;
			value: string;
		};
	}
</script>

<script lang="ts">
	import ProfilePicture from './profile-picture.svelte';

	const { firstName, lastName, email, extra }: ProfileInformations = $props();
</script>

<div class="flex items-center gap-5">
	<ProfilePicture {firstName} {lastName} size="lg" />

	<div class="grid gap-y-1">
		<p class="m-0 font-headings text-lg leading-tight font-extrabold text-ocean-blue">
			{firstName}
			{lastName}
		</p>
		{#if extra}
			<p class="m-0 font-just-sans text-base leading-tight font-light text-ocean-blue/65">
				{extra.value}
			</p>
		{/if}
		{#if email}
			<p class="m-0 font-just-sans text-sm leading-6 text-ecume-blue">
				{email}
			</p>
		{/if}
	</div>
</div>
