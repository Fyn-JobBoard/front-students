<script lang="ts">
	import type { TableProps } from '$lib/components/kanban/table.svelte';
	import Table from '$lib/components/kanban/table.svelte';
	import { Application as ApplicationModel } from 'fyn-api-sdk';

	ApplicationModel.StatusEnum.Draft;
	ApplicationModel.StatusEnum.Refused;
	ApplicationModel.StatusEnum.Sent;
	ApplicationModel.StatusEnum.Accepted;

	let {
		applications,
		compact = false
	}: {
		applications?: ApplicationModel[];
		compact?: boolean;
	} = $props();

	export const TABLES: TableProps[] = [
		{
			title: 'Brouillons',
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
			title: 'Envoyées',
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
			title: 'Acceptées',
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
			title: 'Refusées',
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

	const statusColumns: Record<ApplicationModel.StatusEnum, Omit<TableProps, 'tasks'>> = {
		[ApplicationModel.StatusEnum.Draft]: {
			title: 'Brouillons',
			theme: {
				color: 'var(--color-lighthouse-yellow)'
			}
		},
		[ApplicationModel.StatusEnum.Sent]: {
			title: 'Envoyées',
			theme: {
				color: 'var(--color-ocean-blue)',
				isDarkColor: true
			}
		},
		[ApplicationModel.StatusEnum.Accepted]: {
			title: 'Acceptées',
			theme: {
				color: '#10965B',
				isDarkColor: true
			}
		},
		[ApplicationModel.StatusEnum.Refused]: {
			title: 'Refusées',
			theme: {
				color: '#D13838',
				isDarkColor: true
			}
		}
	};
	const statusOrder = [
		ApplicationModel.StatusEnum.Draft,
		ApplicationModel.StatusEnum.Sent,
		ApplicationModel.StatusEnum.Accepted,
		ApplicationModel.StatusEnum.Refused
	];

	const applicationTables = $derived.by<TableProps[]>(() => {
		if (!applications) {
			return TABLES;
		}

		const applicationList = Array.isArray(applications) ? applications : [];

	return statusOrder.map((status) => ({
			...statusColumns[status],
			tasks: applicationList
				.filter((application) => application.status != null && application.status === status)
				.map((application) => ({
					title: application.job?.company?.name ?? application.job?.title ?? 'Candidature',
					description: application.job?.title ?? application.message
				}))
		}));
	});
</script>

<section
	class={compact
		? 'mx-6 overflow-hidden rounded-[2rem] bg-bleuet-blue px-6 py-5 lg:mx-20 xl:mx-28'
		: 'bg-bleuet-blue p-20 max-md:px-6'}
>
	<div class="text-center">
		<h2 class={compact ? 'font-headings text-2xl font-extrabold' : 'font-headings text-[size:--spacing(9)] font-extrabold'}>
			Suivi de tes candidatures
		</h2>
		<p class={compact ? 'mt-1 text-sm font-light text-ecume-blue' : 'font-light text-ecume-blue'}>
			Visualise l'état de chaque candidature en temps réel
		</p>
	</div>

	<ol class={compact ? 'mx-auto mt-5 grid max-w-[72rem] grid-cols-1 items-start gap-3 md:grid-cols-2 xl:grid-cols-4' : 'mt-8 grid grid-cols-1 md:grid-cols-2 lg:flex items-start justify-stretch gap-4'}>
		{#each applicationTables as table}
			<li class="w-full">
				<Table {...table} {compact} />
			</li>
		{/each}
	</ol>
</section>
