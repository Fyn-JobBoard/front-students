<script module lang="ts">
	export interface TaskProps {
		title: string;
		description: string;
		themeColor: string;
		compact?: boolean;
	}
</script>

<script lang="ts">
	const { title, description, themeColor, compact = false }: TaskProps = $props();
</script>

<article
	style:--theme={themeColor}
	class={[
		'grid items-start rounded-lg border-2 border-bleuet-blue bg-bleuet-blue/30',
		compact ? 'p-2.5 text-sm' : 'p-4',
		'before:inline-block before:aspect-[10] before:h-1 before:rounded-full before:bg-(--theme) before:content-[""]'
	]}
>
	<h4 class={compact ? 'my-0.5 text-sm font-semibold' : 'my-1'}>{title}</h4>
	<p class={compact ? 'text-xs font-light text-ecume-blue' : 'font-light text-ecume-blue'}>{description}</p>
</article>
