<script lang="ts">
	const {
		text,
		ping,
		thin,
		selected,
		class: extraClass
	}: {
		ping?: boolean;
		text: string;
		thin?: boolean;
		selected?: boolean;
		class?: string;
	} = $props();
</script>

<p
	class={[
		'rounded-full',
		thin ? 'px-4 py-1' : 'px-6 py-2',
		selected
			? 'bg-ocean-blue font-semibold text-white'
			: 'bg-bleuet-blue font-normal text-ocean-blue',

		ping &&
			'grid grid-cols-[auto_1fr] w-fit items-center gap-3 before:block before:size-[0.75em] before:rounded-full before:bg-lighthouse-yellow before:content-[""]',

		extraClass
	]}
>
	{text}
</p>
