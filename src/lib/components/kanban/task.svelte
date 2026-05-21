<script module lang="ts">
	export interface TaskProps {
		title: string;
		description: string;
		themeColor: string;
	}
</script>

<script lang="ts">
	const { title, description, themeColor }: TaskProps = $props();
</script>

<article
	style:--theme={themeColor}
	class={[
		'grid items-start rounded-lg border-2 border-bleuet-blue bg-bleuet-blue/30 p-4',
		'before:inline-block before:aspect-[10] before:h-1 before:rounded-full before:bg-(--theme) before:content-[""]'
	]}
>
	<h4 class="my-1">{title}</h4>
	<p class="font-light text-ecume-blue">{description}</p>
</article>
