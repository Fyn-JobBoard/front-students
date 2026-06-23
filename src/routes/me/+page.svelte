<script lang="ts">
	import { goto } from '$app/navigation';
	import Kanban from '$lib/components/kanban/applications.svelte';
	import Profile from '$lib/components/profile/profile.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const birthdate = $derived(
		new Intl.DateTimeFormat('fr-FR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		}).format(new Date(data.me.birthdate))
	);

	const profileActions: {
		[key: string]: {
			icon: string;
			url: string;
		};
	} = {
		'Modifier mon profil': {
			icon: 'icon-[mdi--account-edit]',
			url: '/me/profile'
		},
		'Modifier mon compte': {
			icon: 'icon-[mdi--gear]',
			url: '/me/settings'
		}
	};
</script>

<section class="px-6 pt-28 pb-10 lg:px-20 xl:px-28">
	<div
		class="block h-full rounded-2xl border border-ocean-blue/10 bg-white p-6 shadow-sm md:relative"
	>
		<Profile
			firstName={data.me.first_name}
			lastName={data.me.last_name}
			email={data.me.account.email}
			extra={{
				label: 'Né le',
				value: birthdate
			}}
		/>

		<nav class="top-2 right-2 max-md:mt-8 md:absolute">
			<ul class="flex flex-wrap gap-2 max-md:justify-end">
				{#each Object.entries(profileActions) as [label, { icon, url }] (url)}
					<li>
						<a
							href={url}
							aria-label={label}
							class="group/action relative flex items-center gap-2 rounded-full bg-bleuet-blue p-2"
						>
							<span class={icon}></span>
							<p
								class="top-[110%] left-1/2 text-nowrap md:pointer-events-none md:absolute md:-translate-x-1/2 md:transition-[translate_opacity] md:not-group-hover/action:-translate-y-2 md:not-group-hover/action:opacity-0"
							>
								{label}
							</p>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</section>

<Kanban applications={data.applications} />

<section class="flex flex-wrap items-center justify-end gap-4 px-6 pt-6 pb-16 lg:px-20 xl:px-28">
	<Button type="neutral" size="default" action={{ url: '/logout' }}>Se déconnecter</Button>
	<Button
		type="danger"
		size="default"
		action={{
			onclick() {
				if (confirm('Es-tu sûr de vouloir supprimer ton compte ? Ceci est irreversible.')) {
					goto('/unregister');
				}
			},
			type: 'button'
		}}
	>
		Supprimer le compte
	</Button>
</section>
