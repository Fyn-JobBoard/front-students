import { error } from '@sveltejs/kit';
import articlesData from '$lib/data/articles/articles.json';
import type { PageServerLoad } from './$types';

type Article = {
	id: number;
	title: string;
	description: string;
	content: string;
	publish_date: string;
};

const articles = articlesData as Article[];

export const load: PageServerLoad = ({ params }) => {
	const articleId = Number(params.id);
	const article = articles.find((item) => item.id === articleId);

	if (!article) {
		error(404, 'Article introuvable');
	}

	return {
		article
	};
};
