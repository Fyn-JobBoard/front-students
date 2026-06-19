<script module lang="ts">
	export interface PdfResource {
		title: string;
		file: string;
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	let { resource }: { resource: PdfResource } = $props();

	const formspreeEndpoint = import.meta.env.APP_FORMSPREE;
	const leadStorageKey = 'fyn-pdf-lead-submitted';

	let isFormOpen = $state(false);
	let isSubmitting = $state(false);
	let formSubmitted = $state(false);
	let errorMessage = $state('');

	const hasSubmittedLeadForm = () => {
		try {
			return localStorage.getItem(leadStorageKey) === 'true';
		} catch {
			return false;
		}
	};

	const rememberLeadSubmission = () => {
		try {
			localStorage.setItem(leadStorageKey, 'true');
		} catch {
			// Ignore storage failures: the current download can still continue.
		}
	};

	const requestDownload = () => {
		if (hasSubmittedLeadForm()) {
			formSubmitted = true;
			return;
		}

		errorMessage = '';
		isFormOpen = true;
	};

	const closeForm = () => {
		if (isSubmitting) {
			return;
		}

		isFormOpen = false;
	};

	const submitLeadForm = async (event: SubmitEvent) => {
		event.preventDefault();

		if (!formspreeEndpoint) {
			errorMessage = 'Le formulaire de téléchargement doit être configuré.';
			return;
		}

		const form = event.currentTarget;

		if (!(form instanceof HTMLFormElement)) {
			return;
		}

		isSubmitting = true;
		errorMessage = '';

		const formData = new FormData(form);
		formData.set('Document', resource.title);
		formData.set('Fichier', resource.file);

		try {
			const response = await fetch(formspreeEndpoint, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json'
				}
			});

			if (!response.ok) {
				errorMessage = "Impossible de valider le formulaire pour l'instant.";
				return;
			}

			rememberLeadSubmission();
			formSubmitted = true;
			form.reset();
			isFormOpen = false;
		} catch {
			errorMessage = 'Une erreur réseau est survenue. Réessaie dans quelques instants.';
		} finally {
			isSubmitting = false;
		}
	};

	onMount(() => {
		formSubmitted = hasSubmittedLeadForm();
	});
</script>

<article
	class="rounded-lg border border-ocean-blue/10 bg-white p-5 shadow-sm transition hover:border-ocean-blue/25 hover:shadow-md"
>
	<div
		class="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-lighthouse-white text-ocean-blue"
	>
		<span class="icon-[mdi--file-pdf-box] size-7" aria-hidden="true"></span>
	</div>

	<h2 class="text-xl font-semibold text-ocean-blue">{resource.title}</h2>

	<div class="mt-5 flex flex-wrap gap-3">
		{#if formSubmitted}
			<a
				href={resource.file}
				download
				class="focus:ring-picton-blue inline-flex items-center rounded-md bg-ocean-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-ocean-blue/90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
			>
				Télécharger
			</a>
		{:else}
			<button
				type="button"
				onclick={requestDownload}
				class="focus:ring-picton-blue inline-flex items-center rounded-md bg-ocean-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-ocean-blue/90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
			>
				Télécharger
			</button>
		{/if}
	</div>
</article>

{#if isFormOpen}
	<dialog
		class="fixed inset-0 z-50 m-0 h-screen w-screen max-h-none max-w-none border-0 bg-transparent p-0"
		aria-labelledby="pdf-download-title"
		open
	>
		<button
			type="button"
			class="absolute inset-0 bg-ocean-blue/40 backdrop-blur-sm"
			aria-label="Fermer le formulaire"
			onclick={closeForm}
		></button>

		<div class="relative flex min-h-full items-start justify-center px-4 py-6 sm:items-center">
			<div class="relative w-full max-w-lg rounded-lg border border-ocean-blue/10 bg-white p-6 shadow-xl">
				<div class="flex items-start justify-between gap-4">
					<div>
						<p class="text-picton-blue text-sm font-semibold uppercase">Téléchargement</p>
						<h3 id="pdf-download-title" class="mt-1 text-xl font-semibold text-ocean-blue">
							{resource.title}
						</h3>
					</div>

					<button
						type="button"
						class="inline-flex h-9 w-9 items-center justify-center rounded-md text-ocean-blue transition hover:bg-lighthouse-white focus:ring-2 focus:ring-picton-blue focus:outline-none"
						aria-label="Fermer"
						onclick={closeForm}
					>
						<span class="icon-[mdi--close] size-5" aria-hidden="true"></span>
					</button>
				</div>

				<form class="mt-6 space-y-4" onsubmit={submitLeadForm}>
					<div class="grid gap-4 sm:grid-cols-2">
						<div>
							<label for={`first-name-${resource.title}`} class="text-sm font-medium text-ocean-blue">
								Prénom
							</label>
							<input
								id={`first-name-${resource.title}`}
								name="Prénom"
								type="text"
								required
								autocomplete="given-name"
								class="mt-2 block w-full rounded-md border border-ocean-blue/15 bg-lighthouse-white px-4 py-2.5 text-sm text-ocean-blue outline-none transition focus:border-picton-blue focus:ring-2 focus:ring-picton-blue/20"
							/>
						</div>

						<div>
							<label for={`last-name-${resource.title}`} class="text-sm font-medium text-ocean-blue">
								Nom
							</label>
							<input
								id={`last-name-${resource.title}`}
								name="Nom"
								type="text"
								required
								autocomplete="family-name"
								class="mt-2 block w-full rounded-md border border-ocean-blue/15 bg-lighthouse-white px-4 py-2.5 text-sm text-ocean-blue outline-none transition focus:border-picton-blue focus:ring-2 focus:ring-picton-blue/20"
							/>
						</div>
					</div>

					<div>
						<label for={`email-${resource.title}`} class="text-sm font-medium text-ocean-blue">
							Email
						</label>
						<input
							id={`email-${resource.title}`}
							name="email"
							type="email"
							required
							autocomplete="email"
							class="mt-2 block w-full rounded-md border border-ocean-blue/15 bg-lighthouse-white px-4 py-2.5 text-sm text-ocean-blue outline-none transition focus:border-picton-blue focus:ring-2 focus:ring-picton-blue/20"
						/>
					</div>

					<input type="hidden" name="Document" value={resource.title} />
					<input type="hidden" name="Fichier" value={resource.file} />

					{#if errorMessage}
						<p class="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
					{/if}

					<div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
						<button
							type="button"
							class="rounded-md border border-ocean-blue/15 px-4 py-2 text-sm font-medium text-ocean-blue transition hover:bg-lighthouse-white focus:ring-2 focus:ring-picton-blue focus:outline-none"
							onclick={closeForm}
							disabled={isSubmitting}
						>
							Annuler
						</button>
						<button
							type="submit"
							class="rounded-md bg-ocean-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-ocean-blue/90 focus:ring-2 focus:ring-picton-blue focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Validation...' : 'Valider et télécharger'}
						</button>
					</div>
				</form>
			</div>
		</div>
	</dialog>
{/if}
