<script lang="ts">
	import type { ExperienceForm } from './utils.d';

	let {
		experiences = [],
		onAddExperience,
		onRemoveExperience
	}: {
		experiences?: ExperienceForm[];
		onAddExperience: () => void;
		onRemoveExperience: (id: number) => void;
	} = $props();
</script>

<section class="grid gap-6 border-t border-ocean-blue/10 pt-8">
	<div>
		<h2 class="m-0 font-grift text-2xl font-extrabold text-ocean-blue">
			Expériences
		</h2>
		<p class="mt-2 font-just-sans text-sm leading-6 text-ecume-blue">
			Ajoute tes expériences professionnelles, stages, missions ou projets significatifs.
		</p>
	</div>

	{#each experiences as experience, index (experience.id)}
		<fieldset class="grid gap-5 rounded-2xl border border-ocean-blue/10 bg-lighthouse-white p-5">
			<input type="hidden" name="experiences[{index}][id]" value={experience.id} />
			<div class="flex items-center justify-between gap-4">
				<legend class="font-grift text-xl font-extrabold text-ocean-blue">
					Expérience {index + 1}
				</legend>

				{#if experiences.length > 1}
					<button
						class="rounded-full border border-ocean-blue/20 px-3 py-1.5 font-just-sans text-xs font-semibold text-ocean-blue transition hover:border-ocean-blue hover:bg-white"
						type="button"
						onclick={() => onRemoveExperience(experience.id)}
					>
						Supprimer
					</button>
				{/if}
			</div>

			<div>
				<label
					class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
					for="experience-{experience.id}-title"
				>
					Titre de l'expérience
				</label>
				<input
					class="block w-full rounded-xl border border-ocean-blue/15 bg-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
					id="experience-{experience.id}-title"
					name="experiences[{index}][title]"
					type="text"
					maxlength="100"
					bind:value={experience.title}
					placeholder="Développeur Front-end"
					required
				/>
			</div>

			<div>
				<label
					class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
					for="experience-{experience.id}-company-fallback-name"
				>
					Entreprise
					<span class="font-normal text-ecume-blue">(optionnel)</span>
				</label>
				<input
					class="block w-full rounded-xl border border-ocean-blue/15 bg-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
					id="experience-{experience.id}-company-fallback-name"
					name="experiences[{index}][company_fallback_name]"
					type="text"
					maxlength="70"
					bind:value={experience.company_fallback_name}
					placeholder="Nom de l'entreprise"
				/>
			</div>

			<div>
				<label
					class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
					for="experience-{experience.id}-description"
				>
					Description
				</label>
				<textarea
					class="min-h-32 block w-full resize-y rounded-xl border border-ocean-blue/15 bg-white px-4 py-3 font-just-sans text-sm leading-6 text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
					id="experience-{experience.id}-description"
					name="experiences[{index}][description]"
					maxlength="2048"
					bind:value={experience.description}
					placeholder="Décris tes missions, responsabilités et résultats. (max. 2048 caractères)"
					required
				></textarea>
			</div>

			<div class="grid gap-5 md:grid-cols-2">
				<div>
					<label
						class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
						for="experience-{experience.id}-begin-date"
					>
						Date de début
					</label>
					<input
						class="block w-full rounded-xl border border-ocean-blue/15 bg-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="experience-{experience.id}-begin-date"
						name="experiences[{index}][begin_date]"
						type="date"
						bind:value={experience.begin_date}
						required
					/>
				</div>

				<div>
					<label
						class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
						for="experience-{experience.id}-end-date"
					>
						Date de fin
						<span class="font-normal text-ecume-blue">(optionnel)</span>
					</label>
					<input
						class="block w-full rounded-xl border border-ocean-blue/15 bg-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="experience-{experience.id}-end-date"
						name="experiences[{index}][end_date]"
						type="date"
						bind:value={experience.end_date}
					/>
				</div>
			</div>
		</fieldset>
	{/each}

	<div class="flex justify-start">
		<button
			class="rounded-full border-2 border-ocean-blue bg-transparent px-5 py-3 font-just-sans text-sm font-semibold text-ocean-blue transition hover:bg-ocean-blue hover:text-white"
			type="button"
			onclick={onAddExperience}
		>
			+ Ajouter une expérience
		</button>
	</div>
</section>
