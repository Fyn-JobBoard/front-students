<script lang="ts">
	import type { PageData } from './$types';
	import Profile from '$lib/components/Profile/profile.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Kanban from '../(homepage)/kanban.svelte';
	import Info from '$lib/components/cards/info.svelte';

	let { data }: { data: PageData } = $props();
</script>

<section class="px-6 pt-28 pb-10 lg:px-20 xl:px-28">
	<div class="grid w-full items-stretch gap-6 lg:grid-cols-2">
		<a
			href="/me/settings"
			class="block h-full rounded-2xl border border-ocean-blue/10 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-ocean-blue/25 hover:shadow-lg focus:ring-2 focus:ring-ocean-blue/30 focus:ring-offset-4 focus:outline-none"
			aria-label="Modifier les informations du compte"
		>
			<Profile
				identifier={data.user.identifier}
				account={data.account}
				student={data.student}
				size="lg"
			/>
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

<Kanban compact applications={data.applications} />

<section class="px-6 pt-6 pb-16 lg:px-20 xl:px-28">
	<div class="flex justify-end gap-3">
		<div class="transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
			<Button type="neutral" size="default" action={{ url: '/logout' }}>
				Se déconnecter
			</Button>
		</div>
		<div class="transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
			<Button type="danger" size="default" action={{ url: '/delete-account' }}>
				Supprimer le compte
			</Button>
		</div>
	</div>
</section>
