<script lang="ts">
	import { page } from '$app/state';
	import TextareaField from '$lib/components/forms/textareafield.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import JobHiddenFields from './jobhiddenfields.svelte';

	let {
		jobId = page.url.searchParams.get('job_id') ?? page.url.searchParams.get('jobId') ?? '',
		jobTitle = page.url.searchParams.get('job_title') ?? page.url.searchParams.get('jobTitle') ?? ''
	}: {
		jobId?: string;
		jobTitle?: string;
	} = $props();
</script>

<section class="mx-auto w-full max-w-4xl px-5 pt-28 pb-24 sm:px-6 lg:pt-32">
	<div class="mb-8 max-w-2xl">
		<h1 class="text-3xl font-bold text-ocean-blue sm:text-4xl">Envoyer ma candidature</h1>
		<p class="mt-3 text-base leading-7 text-ocean-blue/70">Ajoutez un long message.</p>
	</div>

	<form class="rounded-3xl border border-ocean-blue/10 bg-white/70 p-5 shadow-sm sm:p-8">
		<div class="grid gap-6">
			<div class="rounded-2xl border border-ocean-blue/10 bg-bleuet-blue/60 p-5">
				<p class="text-sm font-semibold tracking-[0.14em] text-ecume-blue uppercase">
					Offre ciblée
				</p>
				<h2 class="mt-2 text-xl font-bold text-ocean-blue">
					{jobTitle || 'Nom du poste non renseigné'}
				</h2>
			</div>

			<TextareaField
				label="Message"
				name="message"
				rows={7}
				minHeight="min-h-44"
				maxlength={8192}
				placeholder="Expliquez pourquoi vous postulez à cette offre et pourquoi vous êtes le candidat idéal pour ce poste. (max. 8192 caractères)"
				required
			/>

			<JobHiddenFields {jobId} {jobTitle} />

			<div class="flex justify-start pt-2">
				<Button type="primary" action={{ type: 'submit' }}>Envoyer ma candidature</Button>
			</div>
		</div>
	</form>
</section>
