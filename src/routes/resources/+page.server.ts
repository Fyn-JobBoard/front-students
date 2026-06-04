import type { PageServerLoad } from './$types';

const pdfFiles = import.meta.glob('../../lib/resources/pdf/*.pdf', {
	import: 'default'
}) as Record<string, () => Promise<string>>;

const titleFromFileName = (path: string) => {
	const fileName =
		path
			.split('/')
			.at(-1)
			?.replace(/\.pdf$/i, '') ?? 'Document PDF';

	return fileName
		.split(/[-_\s]+/)
		.filter((part) => !/^[a-f0-9]{16,}$/i.test(part))
		.map((part) => {
			if (/^\d+$/.test(part)) return part;
			return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
		})
		.join(' ');
};

export const load: PageServerLoad = async () => {
	const resources = await Promise.all(
		Object.entries(pdfFiles).map(async ([path, loadFile]) => ({
			title: titleFromFileName(path),
			file: await loadFile()
		}))
	);

	return {
		resources: resources.sort((a, b) => a.title.localeCompare(b.title, 'fr'))
	};
};
