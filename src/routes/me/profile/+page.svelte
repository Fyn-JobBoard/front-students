<script lang="ts">
	import type { PageProps } from './$types';
	import ProfileJob from './profile-job.svelte';

	const { data, form }: PageProps = $props();
</script>

<ProfileJob
	{...data}
	form={form}
/>
