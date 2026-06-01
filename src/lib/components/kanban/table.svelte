<script module lang="ts">
	import type { TaskProps } from './task.svelte';

	export interface TableProps {
		title: string;
		tasks: Omit<TaskProps, 'parent' | 'themeColor'>[];
		theme: {
			color: string;
			isDarkColor?: boolean;
		};
	}
</script>

<script lang="ts">
	import Task from './task.svelte';
	const { title, tasks, theme }: TableProps = $props();
</script>

<section class="rounded-2xl bg-white p-4">
	<header class="flex items-center justify-center gap-2 font-semibold">
		<h3>{title}</h3>
		<div
			style:background-color={theme.color}
			aria-label="Nombre de tâche présente dans ce tableau"
			class="relative size-[1.5em] rounded-full {theme.isDarkColor && 'text-white'}"
		>
			<span class="absolute top-1/2 left-1/2 -translate-1/2 text-[1em]">
				{tasks.length}
			</span>
		</div>
	</header>

	<main class="mt-6">
		<ul class="grid gap-4">
			{#each tasks as task}
				<li>
					<Task {...task} themeColor={theme.color} />
				</li>
			{/each}
		</ul>
	</main>
</section>
