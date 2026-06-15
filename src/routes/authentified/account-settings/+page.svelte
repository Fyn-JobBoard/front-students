<script lang="ts">
	import type { PageProps } from './$types';
	import AccountSettings from './account-settings.svelte';

	const { data }: PageProps = $props();
</script>

<AccountSettings activityDomains={data.activityDomains} />
