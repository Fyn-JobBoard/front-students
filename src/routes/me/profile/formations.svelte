<script lang="ts">
	import type { ActivityDomain } from 'fyn-api-sdk';
	import type { FormationForm } from './utils.d';

	let {
		activityDomains = [],
		formations = [],
		onAddFormation,
		onRemoveFormation
	}: {
		activityDomains?: ActivityDomain[];
		formations?: FormationForm[];
		onAddFormation: () => void;
		onRemoveFormation: (id: number) => void;
	} = $props();
</script>

<section class="grid gap-6">
	{#each formations as formation, index (formation.id)}
		<fieldset class="grid gap-5 rounded-2xl border border-ocean-blue/10 bg-lighthouse-white p-5">
			<input type="hidden" name="formations[{index}][id]" value={formation.id} />
			<div class="flex items-center justify-between gap-4">
				<legend class="font-grift text-xl font-extrabold text-ocean-blue">
					Formation {index + 1}
				</legend>

				<button
					class="rounded-full border border-ocean-blue/20 px-3 py-1.5 font-just-sans text-xs font-semibold text-ocean-blue transition hover:border-ocean-blue hover:bg-white"
					type="button"
					onclick={() => onRemoveFormation(formation.id)}
				>
					Supprimer
				</button>
			</div>

			<div>
				<label
					class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
					for="formation-{formation.id}-title"
				>
					Titre de la formation
				</label>
				<input
					class="block w-full rounded-xl border border-ocean-blue/15 bg-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
					id="formation-{formation.id}-title"
					name="formations[{index}][title]"
					type="text"
					maxlength="100"
					bind:value={formation.title}
					placeholder="Bachelor Développement Web"
					required
				/>
			</div>

			<div>
				<label
					class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
					for="formation-{formation.id}-info-url"
				>
					Lien d'information
					<span class="font-normal text-ecume-blue">(optionnel)</span>
				</label>
				<input
					class="block w-full rounded-xl border border-ocean-blue/15 bg-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
					id="formation-{formation.id}-info-url"
					name="formations[{index}][info_url]"
					type="url"
					maxlength="200"
					bind:value={formation.info_url}
					placeholder="https://ecole.fr/formation"
				/>
			</div>

			<div>
				<label
					class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
					for="formation-{formation.id}-description"
				>
					Description
					<span class="font-normal text-ecume-blue">(optionnel)</span>
				</label>
				<textarea
					class="block min-h-32 w-full resize-y rounded-xl border border-ocean-blue/15 bg-white px-4 py-3 font-just-sans text-sm leading-6 text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
					id="formation-{formation.id}-description"
					name="formations[{index}][description]"
					maxlength="1024"
					bind:value={formation.description}
					placeholder="Décris rapidement le programme, les projets ou les compétences acquises. (max. 1024 caractères)"
				></textarea>
			</div>

			<div class="grid gap-5 md:grid-cols-2">
				<div>
					<label
						class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
						for="formation-{formation.id}-obtention-date"
					>
						Date d'obtention
						<span class="font-normal text-ecume-blue">(optionnel)</span>
					</label>
					<input
						class="block w-full rounded-xl border border-ocean-blue/15 bg-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="formation-{formation.id}-obtention-date"
						name="formations[{index}][obtention_date]"
						type="date"
						bind:value={formation.obtention_date}
					/>
				</div>

				<div>
					<label
						class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
						for="formation-{formation.id}-duration"
					>
						Durée
					</label>
					<input
						class="block w-full rounded-xl border border-ocean-blue/15 bg-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="formation-{formation.id}-duration"
						name="formations[{index}][duration]"
						type="number"
						min="0"
						step="1"
						bind:value={formation.duration}
						placeholder="12"
						required
					/>
					<p class="mt-2 font-just-sans text-xs text-ecume-blue">Durée de la formation en mois.</p>
				</div>
			</div>

			<div>
				<label
					class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
					for="formation-{formation.id}-activity-domain"
				>
					Domaine d'activité
					<span class="font-normal text-ecume-blue">(optionnel)</span>
				</label>
				<select
					class="block w-full rounded-xl border border-ocean-blue/15 bg-white px-4 py-3 font-just-sans text-sm text-ocean-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
					id="formation-{formation.id}-activity-domain"
					name="formations[{index}][activity_domain_id]"
					bind:value={formation.activity_domain_id}
				>
					<option value="">Aucun domaine</option>
					{#each activityDomains as domain (domain.id)}
						<option value={domain.id}>{domain.name}</option>
					{/each}
				</select>
			</div>
		</fieldset>
	{/each}

	<div class="flex justify-start">
		<button
			class="rounded-full border-2 border-ocean-blue bg-transparent px-5 py-3 font-just-sans text-sm font-semibold text-ocean-blue transition hover:bg-ocean-blue hover:text-white"
			type="button"
			onclick={onAddFormation}
		>
			+ Ajouter une formation
		</button>
	</div>
</section>
