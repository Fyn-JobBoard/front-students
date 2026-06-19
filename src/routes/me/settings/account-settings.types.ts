import type { ActionData } from './$types';

export type AccountSettingsProfile = {
	email: string;
	firstName: string;
	lastName: string;
	birthdate: string;
	bio: string;
	links: {
		github: string;
		linkedin: string;
		portfolio: string;
	};
	selectedActivityDomainIds: number[];
};

export type AccountSettingsForm = ActionData | null;
