import type { ActionData } from './$types';

export type FormationForm = {
	id: number;
	title: string;
	info_url: string;
	description: string;
	obtention_date: string;
	duration: string;
	activity_domain_id: string;
};

export type ExperienceForm = {
	id: number;
	title: string;
	company_fallback_name: string;
	description: string;
	begin_date: string;
	end_date: string;
};

export type SkillForm = {
	id: number;
	name: string;
	type: 'hard' | 'soft';
};

export type ProfileJobForm = ActionData | null;
