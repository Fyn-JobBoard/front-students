<script lang="ts">
	import type { ActivityDomain, Experience, Formation, Skill } from 'fyn-api-sdk';
	import type { ActionData } from './$types';

	type FormationForm = {
		id: number;
		title: string;
		info_url: string;
		description: string;
		obtention_date: string;
		duration: string;
		activity_domain_id: string;
	};

	type ExperienceForm = {
		id: number;
		title: string;
		company_fallback_name: string;
		description: string;
		begin_date: string;
		end_date: string;
	};

	type SkillForm = {
		id: number;
		name: string;
		type: 'hard' | 'soft';
	};

	let {
		activityDomains = [],
		formations: initialFormations = [],
		experiences: initialExperiences = [],
		skills: initialSkills = [],
		form = null
	}: {
		activityDomains?: ActivityDomain[];
		formations?: Formation[];
		experiences?: Experience[];
		skills?: Skill[];
		form?: ActionData | null;
	} = $props();
	let hasInitializedProfileData = $state(false);

	const emptyFormation = (id: number): FormationForm => ({
		id,
		title: '',
		info_url: '',
		description: '',
		obtention_date: '',
		duration: '',
		activity_domain_id: ''
	});

	const emptyExperience = (id: number): ExperienceForm => ({
		id,
		title: '',
		company_fallback_name: '',
		description: '',
		begin_date: '',
		end_date: ''
	});

	const emptySkill = (id: number): SkillForm => ({
		id,
		name: '',
		type: 'hard'
	});

	const mapFormation = (formation: Formation): FormationForm => ({
		id: formation.id,
		title: formation.title ?? '',
		info_url: formation.info_url ?? '',
		description: formation.description ?? '',
		obtention_date: formation.obtention_date ?? '',
		duration: String(formation.duration ?? ''),
		activity_domain_id: formation.activity_domain?.id ? String(formation.activity_domain.id) : ''
	});

	const mapExperience = (experience: Experience): ExperienceForm => ({
		id: experience.id,
		title: experience.title ?? '',
		company_fallback_name: experience.company_fallback_name ?? experience.company?.name ?? '',
		description: experience.description ?? '',
		begin_date: experience.begin_date ?? '',
		end_date: experience.end_date ?? ''
	});

	const mapSkill = (skill: Skill): SkillForm => ({
		id: skill.id,
		name: skill.name ?? '',
		type: String(skill.type) === 'soft' ? 'soft' : 'hard'
	});

	let nextFormationId = 1;
	let formations = $state<FormationForm[]>([emptyFormation(0)]);
	let nextExperienceId = 1;
	let experiences = $state<ExperienceForm[]>([emptyExperience(0)]);
	let nextSkillId = 1;
	let skills = $state<SkillForm[]>([emptySkill(0)]);

	$effect(() => {
		if (hasInitializedProfileData) {
			return;
		}

		const mappedFormations = initialFormations.map(mapFormation);
		const mappedExperiences = initialExperiences.map(mapExperience);
		const mappedSkills = initialSkills.map(mapSkill);

		formations = mappedFormations.length ? mappedFormations : [emptyFormation(0)];
		experiences = mappedExperiences.length ? mappedExperiences : [emptyExperience(0)];
		skills = mappedSkills.length ? mappedSkills : [emptySkill(0)];

		nextFormationId = Math.max(0, ...mappedFormations.map((formation) => formation.id)) + 1;
		nextExperienceId = Math.max(0, ...mappedExperiences.map((experience) => experience.id)) + 1;
		nextSkillId = Math.max(0, ...mappedSkills.map((skill) => skill.id)) + 1;

		hasInitializedProfileData = true;
	});

	const addFormation = () => {
		formations.push(emptyFormation(nextFormationId));
		nextFormationId += 1;
	};

	const removeFormation = (id: number) => {
		formations = formations.filter((formation) => formation.id !== id);
	};

	const addExperience = () => {
		experiences.push(emptyExperience(nextExperienceId));
		nextExperienceId += 1;
	};

	const removeExperience = (id: number) => {
		experiences = experiences.filter((experience) => experience.id !== id);
	};

	const addSkill = () => {
		skills.push(emptySkill(nextSkillId));
		nextSkillId += 1;
	};

	const removeSkill = (id: number) => {
		skills = skills.filter((skill) => skill.id !== id);
	};
</script>

<section class="min-h-screen bg-lighthouse-white px-6 pt-28 pb-16">
	<div class="mx-auto max-w-3xl rounded-2xl border border-ocean-blue/10 bg-white p-8 shadow-sm">
		<a
			href="/authentified"
			class="mb-6 inline-flex items-center gap-2 font-just-sans text-sm font-semibold text-ocean-blue transition hover:text-ecume-blue"
		>
			<span aria-hidden="true">←</span>
			Retour
		</a>

		<div class="border-b border-ocean-blue/10 pb-6">
			<p
				class="mb-2 w-fit rounded-full bg-lighthouse-yellow px-4 py-1.5 font-just-sans text-xs font-semibold text-ocean-blue"
			>
				Profil professionnel
			</p>
			<h1 class="m-0 font-grift text-3xl font-extrabold text-ocean-blue">
				Formations
			</h1>
			<p class="mt-3 font-just-sans text-base leading-6 text-ecume-blue">
				Ajoute toutes les formations qui valorisent ton parcours étudiant.
			</p>
		</div>

		<form method="POST" action="?/saveProfileJob" class="mt-8 grid gap-8">
			{#if form?.profileJobError}
				<p class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-just-sans text-sm text-red-700">
					{form.profileJobError}
				</p>
			{/if}

			{#if form?.profileJobSuccess}
				<p class="rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-just-sans text-sm text-green-700">
					{form.profileJobSuccess}
				</p>
			{/if}

			{#if form?.profileJobNotice}
				<p class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 font-just-sans text-sm text-amber-700">
					{form.profileJobNotice}
				</p>
			{/if}

			<div class="grid gap-6">
				{#each formations as formation, index (formation.id)}
					<fieldset class="grid gap-5 rounded-2xl border border-ocean-blue/10 bg-lighthouse-white p-5">
						<input type="hidden" name="formations[{index}][id]" value={formation.id} />
						<div class="flex items-center justify-between gap-4">
							<legend class="font-grift text-xl font-extrabold text-ocean-blue">
								Formation {index + 1}
							</legend>

							{#if formations.length > 1}
								<button
									class="rounded-full border border-ocean-blue/20 px-3 py-1.5 font-just-sans text-xs font-semibold text-ocean-blue transition hover:border-ocean-blue hover:bg-white"
									type="button"
									onclick={() => removeFormation(formation.id)}
								>
									Supprimer
								</button>
							{/if}
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
								class="min-h-32 block w-full resize-y rounded-xl border border-ocean-blue/15 bg-white px-4 py-3 font-just-sans text-sm leading-6 text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
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
								<p class="mt-2 font-just-sans text-xs text-ecume-blue">
									Durée de la formation en mois.
								</p>
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
			</div>

			<div class="flex justify-start">
				<button
					class="rounded-full border-2 border-ocean-blue bg-transparent px-5 py-3 font-just-sans text-sm font-semibold text-ocean-blue transition hover:bg-ocean-blue hover:text-white"
					type="button"
					onclick={addFormation}
				>
					+ Ajouter une formation
				</button>
			</div>

			<div class="grid gap-6 border-t border-ocean-blue/10 pt-8">
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
									onclick={() => removeExperience(experience.id)}
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
						onclick={addExperience}
					>
						+ Ajouter une expérience
					</button>
				</div>
			</div>

			<div class="grid gap-6 border-t border-ocean-blue/10 pt-8">
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
									onclick={() => removeSkill(skill.id)}
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
						onclick={addSkill}
					>
						+ Ajouter une compétence
					</button>
				</div>
			</div>

			<div class="flex justify-end border-t border-ocean-blue/10 pt-6">
				<button
					class="rounded-full bg-ocean-blue px-5 py-3 font-just-sans text-sm font-semibold text-white transition hover:bg-ecume-blue"
					type="submit"
				>
					Enregistrer le profil professionnel
				</button>
			</div>
		</form>
	</div>
</section>
