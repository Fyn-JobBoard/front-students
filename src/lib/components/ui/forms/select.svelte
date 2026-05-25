<script module lang="ts">
	export interface DetailedOption {
		value: string;
		label?: string;
		disabled?: boolean;
	}
	export type Option = string | DetailedOption;
	export type Options = Option[] | { [key: string]: Omit<Option, 'value'> };

	export interface DetailedOptionGroup {
		label: string;
		options: Options;
		disabled?: boolean;
	}
	export type OptionGroups = DetailedOptionGroup[] | { [key: string]: Options };

	export type OptionsOrOptionGroups =
		| (Option | DetailedOptionGroup)[]
		| { [key: string]: Options | Omit<Option, 'value'> };
</script>

<script lang="ts">
	let {
		name,
		label,
		options: givenOptions,
		id: givenId,
		value = $bindable()
	}: {
		name: string;
		label: string;
		id?: string;
		value?: string;

		options: OptionsOrOptionGroups;
	} = $props();

	const options: ({ group: DetailedOptionGroup } | { option: DetailedOption })[] = $derived.by(
		() => {
			if (givenOptions instanceof Array) {
				return givenOptions.map((data) => {
					if (typeof data !== 'string' && 'options' in data) {
						return {
							group: data
						};
					} else {
						return {
							option:
								typeof data === 'string'
									? ({
											value: data,
											label: data
										} satisfies DetailedOption)
									: data
						};
					}
				});
			}

			return Object.entries(givenOptions).map(([key, data]) => {
				if (data instanceof Array || !Object.entries(data).find((v) => typeof v === 'object')) {
					// is group
					return {
						group: {
							label: key,
							options: data as Options
						} satisfies DetailedOptionGroup
					};
				} else {
					return {
						option:
							typeof data === 'string'
								? {
										value: key,
										label: data
									}
								: {
										value: key,
										...data
									}
					};
				}
			});
		}
	);

	const id = $derived(givenId ?? `select_${name}`);
</script>

{#snippet opt_renderer(option: Option)}
	{#if typeof option === 'string'}
		<option value={option}>{option}</option>
	{:else}
		<option disabled={option.disabled} value={option.value}>{option.label}</option>
	{/if}
{/snippet}

<label for={id} class="flex gap-2 items-center text-sm">
	<p class="text-ecume-blue">{label}</p>

	<select {name} {id} bind:value class="rounded-lg border-bleuet-blue border-2 ring-0">
		{#each options as kind}
			{#if 'group' in kind}
				{@const {
					group: { disabled, label, options }
				} = kind}
				<optgroup {label} {disabled}>
					{#if options instanceof Array}
						{#each options as option}
							{@render opt_renderer(option)}
						{/each}
					{:else}
						{#each Object.entries(options) as [value, data]}
							{@render opt_renderer(
								typeof data === 'string'
									? {
											value,
											label: data
										}
									: {
											value,
											...data
										}
							)}
						{/each}
					{/if}
				</optgroup>
			{:else}
				{@render opt_renderer(kind.option)}
			{/if}
		{/each}
	</select>
</label>
