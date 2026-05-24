<script lang="ts">
	let {
		identifier,
		firstName,
		lastName,
		size = 'md'
	}: {
		identifier?: string;
		firstName?: string;
		lastName?: string;
		size?: 'sm' | 'md' | 'lg';
	} = $props();

	const initials = $derived.by(() => {
		if (firstName && lastName) {
			return `${firstName[0]}${lastName[0]}`.toUpperCase();
		}

		if (identifier) {
			return identifier
				.trim()
				.split(/\s+/)
				.slice(0, 2)
				.map((part) => part[0])
				.join('')
				.toUpperCase();
		}

		return '';
	});
</script>

<div
	class={{
		'flex shrink-0 items-center justify-center rounded-full bg-lighthouse-yellow': true,
		'h-8 w-8': size === 'sm',
		'h-12 w-12': size === 'md',
		'h-18 w-18': size === 'lg'
	}}
	aria-label={identifier ?? `${firstName ?? ''} ${lastName ?? ''}`.trim()}
>
	<span
		class={{
			'font-grift font-extrabold text-ocean-blue': true,
			'text-sm': size === 'sm',
			'text-base': size === 'md',
			'text-lg': size === 'lg'
		}}
	>
		{initials}
	</span>
</div>
