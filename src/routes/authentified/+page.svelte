<script lang="ts">
	import type { PageData } from './$types';
	import Profile from '$lib/components/Profile/profile.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Kanban from '../(homepage)/kanban.svelte';
	import Info from '$lib/components/cards/info.svelte';

	let { data }: { data: PageData } = $props();
</script>

<section class="px-6 pt-28 pb-10">
	<a
		href="/authentified/account-settings"
		class="block max-w-5xl rounded-2xl border border-ocean-blue/10 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-ocean-blue/25 hover:shadow-lg focus:ring-2 focus:ring-ocean-blue/30 focus:ring-offset-4 focus:outline-none"
		aria-label="Modifier les informations du compte"
	>
		<Profile
			identifier={data.user.identifier}
			firstName={data.user.firstName}
			email={data.user.email}
			info={data.user.info}
			size="lg"
		/>
	</a>
</section>

<Kanban />
<Info />

<div class="mt-4">
	<Button type="primary" size="default" action={{ url: '/logout' }}>Se déconnecter</Button>
</div>
