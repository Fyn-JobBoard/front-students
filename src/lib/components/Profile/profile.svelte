<script lang="ts">
	import ProfilePicture from './profile-picture.svelte';

	let {
		identifier,
		firstName,
		lastName,
		info,
		size = 'md'
	}: {
		identifier?: string;
		firstName?: string;
		lastName?: string;
		info: string;
		size?: 'sm' | 'md' | 'lg';
	} = $props();

	const name = $derived(firstName && lastName ? `${firstName} ${lastName}` : (identifier ?? ''));
</script>

<div class="flex items-center gap-5">
	<ProfilePicture {identifier} {firstName} {lastName} {size} />

	<div>
		<h3 class="m-0 font-grift text-lg leading-tight font-extrabold text-ocean-blue">
			{name}
		</h3>
		<p class="m-0 font-just-sans text-base leading-6 font-light text-ecume-blue">
			{info}
		</p>
	</div>
</div>
