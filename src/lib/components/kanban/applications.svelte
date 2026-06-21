<script lang="ts">
	import type { TableProps } from '$lib/components/kanban/table.svelte';
	import Table from '$lib/components/kanban/table.svelte';
	import { Application } from 'fyn-api-sdk';

	let {
		applications
	}: {
		applications: Application[];
	} = $props();

	const TABLES: Record<Application.StatusEnum, TableProps> = {
		[Application.StatusEnum.Draft]: {
			title: 'Brouillons',
			theme: {
				color: 'var(--color-lighthouse-yellow)'
			},
			tasks: []
		},
		[Application.StatusEnum.Sent]: {
			title: 'Envoyées',
			theme: {
				color: 'var(--color-ocean-blue)',
				isDarkColor: true
			},
			tasks: []
		},
		[Application.StatusEnum.Accepted]: {
			title: 'Acceptées',
			theme: {
				color: '#10965B',
				isDarkColor: true
			},
			tasks: []
		},
		[Application.StatusEnum.Refused]: {
			title: 'Refusées',
			theme: {
				color: '#D13838',
				isDarkColor: true
			},
			tasks: []
		}
	};

	$effect(() => {
		applications.map((application) => {
			TABLES[application.status].tasks.push({
				title: application.job.title,
				description: application.message
			});
		});
	});
</script>

<section class="mx-6 overflow-hidden rounded-4xl bg-bleuet-blue px-6 py-5 lg:mx-20 xl:mx-28">
	<div class="text-center">
		<h2 class="font-headings text-2xl font-extrabold">Suivi de tes candidatures</h2>
		<p class="mt-1 text-sm font-light text-ecume-blue">
			{#if applications.length}
				Visualise l'état de chaque candidature en temps réel
			{:else}
				Tu n'as candidaté à aucune candidatures.
				<a href="/jobs" class="underline"> Rends-toi sur la page des offres </a>
				pour commencer !
			{/if}
		</p>
	</div>

	{#if applications.length}
		<ol
			class="mx-auto mt-5 grid max-w-6xl grid-cols-1 items-start gap-3 md:grid-cols-2 xl:grid-cols-4"
		>
			{#each Object.values(TABLES) as table}
				<li class="w-full">
					<Table {...table} />
				</li>
			{/each}
		</ol>
	{/if}
</section>
