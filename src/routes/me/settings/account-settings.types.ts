import type { ActivityDomain, MeRouteAsStudentResponse } from 'fyn-api-sdk';
import type { ActionData } from './$types';

export type AccountSettingsProfile = MeRouteAsStudentResponse & {
	activity_domains?: ActivityDomain[];
	splitLinks: {
		github: string;
		linkedin: string;
		portfolio: string;
	};
};
export type AccountSettingsForm = ActionData | null;
