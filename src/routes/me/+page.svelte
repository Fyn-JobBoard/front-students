<script lang="ts">
	import Info from '$lib/components/cards/info.svelte';
	import Kanban from '$lib/components/kanban/applications.svelte';
	import Profile from '$lib/components/profile/profile.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="px-6 pt-28 pb-10 lg:px-20 xl:px-28">
	<div class="grid w-full items-stretch gap-6 lg:grid-cols-2">
		<a
			href="/me/settings"
			class="block h-full rounded-2xl border border-ocean-blue/10 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-ocean-blue/25 hover:shadow-lg focus:ring-2 focus:ring-ocean-blue/30 focus:ring-offset-4 focus:outline-none"
			aria-label="Modifier les informations du compte"
		>
			<Profile student={data.me} size="lg" />
		</a>

		<a
			href="/me/profile"
			class="block h-full rounded-2xl transition duration-200 hover:-translate-y-1 hover:border-ocean-blue/25 hover:shadow-lg focus:ring-2 focus:ring-ocean-blue/30 focus:ring-offset-4 focus:outline-none"
			aria-label="Voir le profil professionnel"
		>
			<Info />
		</a>
	</div>
</section>

<Kanban applications={data.applications} />

<section class="flex items-center justify-end gap-4 px-6 pt-6 pb-16 lg:px-20 xl:px-28">
	<Button type="neutral" size="default" action={{ url: '/logout' }}>Se déconnecter</Button>
	<Button
		type="danger"
		size="default"
		action={{
			onclick() {
				confirm('Es-tu sûr de vouloir supprimer ton compte ? Ceci est irreversible.');
			},
			type: 'button'
		}}
	>
		Supprimer le compte
	</Button>
</section>
