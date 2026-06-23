<script lang="ts">
	import type { ActivityDomain, Experience, Formation, Skill } from 'fyn-api-sdk';
	import ProfileJobExperiences from './experiences.svelte';
	import ProfileJobFormations from './formations.svelte';
	import ProfileJobHeader from './header.svelte';
	import ProfileJobSkills from './skills.svelte';
	import type { ExperienceForm, FormationForm, ProfileJobForm, SkillForm } from './utils';

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
		form?: ProfileJobForm;
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
	let formations = $state<FormationForm[]>([]);
	let nextExperienceId = 1;
	let experiences = $state<ExperienceForm[]>([]);
	let nextSkillId = 1;
	let skills = $state<SkillForm[]>([]);

	$effect(() => {
		if (hasInitializedProfileData) {
			return;
		}

		const mappedFormations = initialFormations.map(mapFormation);
		const mappedExperiences = initialExperiences.map(mapExperience);
		const mappedSkills = initialSkills.map(mapSkill);

		formations = mappedFormations.length ? mappedFormations : [];
		experiences = mappedExperiences.length ? mappedExperiences : [];
		skills = mappedSkills.length ? mappedSkills : [];

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
			href="/me"
			class="mb-6 inline-flex items-center gap-2 font-just-sans text-sm font-semibold text-ocean-blue transition hover:text-ecume-blue"
		>
			<span aria-hidden="true">←</span>
			Retour
		</a>

		<ProfileJobHeader />

		<form method="POST" action="?/saveProfileJob" class="mt-8 grid gap-8">
			{#if form?.profileJobError}
				<p
					class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-just-sans text-sm text-red-700"
				>
					{form.profileJobError}
				</p>
			{/if}

			{#if form?.profileJobSuccess}
				<p
					class="rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-just-sans text-sm text-green-700"
				>
					{form.profileJobSuccess}
				</p>
			{/if}

			{#if form?.profileJobNotice}
				<p
					class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 font-just-sans text-sm text-amber-700"
				>
					{form.profileJobNotice}
				</p>
			{/if}

			<ProfileJobFormations
				{activityDomains}
				{formations}
				onAddFormation={addFormation}
				onRemoveFormation={removeFormation}
			/>

			<ProfileJobExperiences
				{experiences}
				onAddExperience={addExperience}
				onRemoveExperience={removeExperience}
			/>

			<ProfileJobSkills {skills} onAddSkill={addSkill} onRemoveSkill={removeSkill} />

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
