<script lang="ts">
	import type { SkillForm } from './utils.d';

	let {
		skills = [],
		onAddSkill,
		onRemoveSkill
	}: {
		skills?: SkillForm[];
		onAddSkill: () => void;
		onRemoveSkill: (id: number) => void;
	} = $props();
</script>

<section class="grid gap-6 border-t border-ocean-blue/10 pt-8">
	<div>
		<h2 class="m-0 font-grift text-2xl font-extrabold text-ocean-blue">
			Compétences
		</h2>
		<p class="mt-2 font-just-sans text-sm leading-6 text-ecume-blue">
			Ajoute tes compétences techniques et humaines.
		</p>
	</div>

	{#each skills as skill, index (skill.id)}
		<fieldset class="grid gap-5 rounded-2xl border border-ocean-blue/10 bg-lighthouse-white p-5">
			<input type="hidden" name="skills[{index}][id]" value={skill.id} />
			<div class="flex items-center justify-between gap-4">
				<legend class="font-grift text-xl font-extrabold text-ocean-blue">
					Compétence {index + 1}
				</legend>

				{#if skills.length > 1}
					<button
						class="rounded-full border border-ocean-blue/20 px-3 py-1.5 font-just-sans text-xs font-semibold text-ocean-blue transition hover:border-ocean-blue hover:bg-white"
						type="button"
						onclick={() => onRemoveSkill(skill.id)}
					>
						Supprimer
					</button>
				{/if}
			</div>

			<div class="grid gap-5 md:grid-cols-[minmax(0,1fr)_12rem]">
				<div>
					<label
						class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
						for="skill-{skill.id}-name"
					>
						Nom de la compétence
					</label>
					<input
						class="block w-full rounded-xl border border-ocean-blue/15 bg-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="skill-{skill.id}-name"
						name="skills[{index}][name]"
						type="text"
						maxlength="60"
						bind:value={skill.name}
						placeholder="Svelte, React, communication..."
						required
					/>
				</div>

				<div>
					<label
						class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
						for="skill-{skill.id}-type"
					>
						Type
					</label>
					<select
						class="block w-full rounded-xl border border-ocean-blue/15 bg-white px-4 py-3 font-just-sans text-sm text-ocean-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="skill-{skill.id}-type"
						name="skills[{index}][type]"
						bind:value={skill.type}
						required
					>
						<option value="hard">Hard skill</option>
						<option value="soft">Soft skill</option>
					</select>
				</div>
			</div>
		</fieldset>
	{/each}

	<div class="flex justify-start">
		<button
			class="rounded-full border-2 border-ocean-blue bg-transparent px-5 py-3 font-just-sans text-sm font-semibold text-ocean-blue transition hover:bg-ocean-blue hover:text-white"
			type="button"
			onclick={onAddSkill}
		>
			+ Ajouter une compétence
		</button>
	</div>
</section>
