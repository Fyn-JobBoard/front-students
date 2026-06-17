<script lang="ts">
	import type { PageProps } from './$types';
	import ProfileJob from './profile-job.svelte';

	const { data, form }: PageProps = $props();
</script>

<ProfileJob
	activityDomains={data.activityDomains}
	formations={data.formations}
	experiences={data.experiences}
	skills={data.skills}
	form={form}
/>
