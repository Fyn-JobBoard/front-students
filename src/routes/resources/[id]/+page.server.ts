import { error } from '@sveltejs/kit';
import articlesData from '$lib/data/articles/articles.json';
import type { Article } from '$lib/components/cards/article.svelte';
import type { PageServerLoad } from './$types';

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
