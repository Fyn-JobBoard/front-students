<script lang="ts">
	import type { TableProps } from '$lib/components/kanban/table.svelte';
	import Table from '$lib/components/kanban/table.svelte';

	export const TABLES: TableProps[] = [
		{
			title: 'En cours',
			theme: {
				color: 'var(--color-lighthouse-yellow)'
			},
			tasks: [
				{
					title: 'Publicis Groupe',
					description: 'Chef de Projet Marketing'
				},
				{
					title: 'Doctolib',
					description: 'Développeur Full Stack'
				},
				{
					title: 'BNP Paribas',
					description: 'Analyste Junior'
				}
			]
		},
		{
			title: 'Envoyés',
			theme: {
				color: 'var(--color-ocean-blue)',
				isDarkColor: true
			},
			tasks: [
				{ title: 'Figma', description: 'Product Designer' },
				{
					title: 'HubSpot',
					description: 'Business Dev'
				},
				{
					title: 'Decathlon',
					description: 'Talent Acquisition'
				}
			]
		},
		{
			title: 'Acceptée',
			theme: {
				color: '#10965B',
				isDarkColor: true
			},
			tasks: [
				{
					title: 'FYN',
					description: 'Stage UX Design'
				},
				{
					title: 'Leboncoin',
					description: 'Data Analyst'
				}
			]
		},
		{
			title: 'Refusée',
			theme: {
				color: '#D13838',
				isDarkColor: true
			},
			tasks: [
				{
					title: 'Startup XYZ',
					description: 'Dev React'
				}
			]
		}
	];
</script>

<section class="bg-bleuet-blue p-20 max-md:px-6">
	<div class="text-center">
		<h2 class="font-headings text-[size:--spacing(9)] font-extrabold">Suivi de tes candidatures</h2>
		<p class="font-light text-ecume-blue">Visualise l'état de chaque candidature en temps réel</p>
	</div>

	<ol class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:flex items-start justify-stretch gap-4">
		{#each TABLES as table}
			<li class="w-full">
				<Table {...table} />
			</li>
		{/each}
	</ol>
</section>
