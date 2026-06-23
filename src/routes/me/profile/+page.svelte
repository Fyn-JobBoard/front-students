<script lang="ts">
	import type { PageProps } from './$types';
	import Form from './form.svelte';

	const { data, form }: PageProps = $props();
</script>

<Form
	{...data}
	form={form}
/>
