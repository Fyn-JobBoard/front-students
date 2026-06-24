<script lang="ts">
	let {
		firstName,
		lastName,
		size = 'md'
	}: {
		firstName: string;
		lastName: string;
		size?: 'sm' | 'md' | 'lg';
	} = $props();
</script>

<div
	class={{
		'flex shrink-0 items-center justify-center rounded-full bg-lighthouse-yellow': true,
		'h-8 w-8': size === 'sm',
		'h-12 w-12': size === 'md',
		'h-18 w-18': size === 'lg'
	}}
>
	<span
		class={{
			'font-grift font-extrabold text-ocean-blue': true,
			'text-sm': size === 'sm',
			'text-base': size === 'md',
			'text-lg': size === 'lg'
		}}
	>
		{firstName[0]}{lastName[0]}
	</span>
</div>
