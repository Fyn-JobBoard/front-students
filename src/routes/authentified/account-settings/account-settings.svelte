<script lang="ts">
	import type { ActivityDomain } from 'fyn-api-sdk';
	import { SvelteSet } from 'svelte/reactivity';
	import type { ActionData } from './$types';

	let {
		activityDomains = [],
		profile,
		form = null
	}: {
		activityDomains?: ActivityDomain[];
		profile: {
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
		form?: ActionData | null;
	} = $props();
	let isPasswordModalOpen = $state(false);
	let hasInitializedDomains = $state(false);

	$effect(() => {
		if (form?.passwordError) {
			isPasswordModalOpen = true;
		}
	});

	const selectedDomainIds = $state(new SvelteSet<number>());
	const selectedDomains = $derived(
		activityDomains.filter((domain) => selectedDomainIds.has(domain.id))
	);
	const availableDomains = $derived(
		activityDomains.filter((domain) => !selectedDomainIds.has(domain.id))
	);

	$effect(() => {
		if (hasInitializedDomains) {
			return;
		}

		for (const id of profile.selectedActivityDomainIds) {
			selectedDomainIds.add(id);
		}

		hasInitializedDomains = true;
	});
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
			<p class="mb-2 w-fit rounded-full bg-lighthouse-yellow px-4 py-1.5 font-just-sans text-xs font-semibold text-ocean-blue">
				Compte
			</p>
			<h1 class="m-0 font-grift text-3xl font-extrabold text-ocean-blue">
				Paramètres du compte
			</h1>
			<p class="mt-3 font-just-sans text-base leading-6 text-ecume-blue">
				Mets à jour tes informations personnelles et tes préférences.
			</p>
		</div>

		<form method="POST" action="?/saveProfile" class="mt-8 grid gap-8">
			{#if form?.profileError}
				<p class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-just-sans text-sm text-red-700">
					{form.profileError}
				</p>
			{/if}

			{#if form?.profileSuccess}
				<p class="rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-just-sans text-sm text-green-700">
					{form.profileSuccess}
				</p>
			{/if}

			{#if form?.profileNotice}
				<p class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 font-just-sans text-sm text-amber-700">
					{form.profileNotice}
				</p>
			{/if}

			<div class="grid gap-5">
				<div>
					<label class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue" for="email">
						Adresse mail
					</label>
					<input
						class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="email"
						name="email"
						type="email"
						value={profile.email}
						placeholder="ton.email@fyn.local"
						required
					/>
				</div>

				<div>
					<p class="mb-2 font-just-sans text-sm font-semibold text-ocean-blue">Mot de passe</p>
					<button
						class="rounded-full border-2 border-ocean-blue bg-transparent px-4 py-2.5 font-just-sans text-sm font-semibold text-ocean-blue transition hover:bg-ocean-blue hover:text-white"
						type="button"
						onclick={() => (isPasswordModalOpen = true)}
					>
						Changer le mot de passe
					</button>
					{#if form?.passwordSuccess}
						<p class="mt-2 font-just-sans text-sm font-medium text-green-700">
							{form.passwordSuccess}
						</p>
					{/if}
				</div>
			</div>

			<div class="grid gap-5 border-t border-ocean-blue/10 pt-8">
				<h2 class="m-0 font-grift text-2xl font-extrabold text-ocean-blue">
					Informations personnelles
				</h2>

				<div class="grid gap-5 md:grid-cols-2">
					<div>
						<label class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue" for="first-name">
							Prénom
						</label>
						<input
							class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
							id="first-name"
							name="first_name"
							type="text"
							value={profile.firstName}
							required
						/>
					</div>

					<div>
						<label class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue" for="last-name">
							Nom
						</label>
						<input
							class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
							id="last-name"
							name="last_name"
							type="text"
							value={profile.lastName}
							required
						/>
					</div>
				</div>

				<div>
					<label class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue" for="birthdate">
						Date de naissance
					</label>
					<input
						class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="birthdate"
						name="birthdate"
						type="date"
						value={profile.birthdate}
						required
					/>
				</div>

				<div>
					<label class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue" for="bio">
						Bio
						<span class="font-normal text-ecume-blue">(optionnel)</span>
					</label>
					<textarea
						class="min-h-28 block w-full resize-y rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm leading-6 text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="bio"
						name="bio"
						placeholder="Présente-toi en quelques mots"
					>{profile.bio}</textarea>
				</div>
			</div>

			<div class="grid gap-5 border-t border-ocean-blue/10 pt-8">
				<div>
					<h2 class="m-0 font-grift text-2xl font-extrabold text-ocean-blue">
						Liens externes
						<span class="font-just-sans text-base font-normal text-ecume-blue">(optionnel)</span>
					</h2>
					<p class="mt-2 font-just-sans text-sm leading-6 text-ecume-blue">
						Ajoute tes liens publics pour compléter ton profil étudiant.
					</p>
				</div>

				<div class="grid gap-5">
					<div>
						<label class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue" for="github-link">
							GitHub
						</label>
						<input
							class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
							id="github-link"
							name="links"
							type="url"
							value={profile.links.github}
							placeholder="https://github.com/ton-profil"
						/>
					</div>

					<div>
						<label class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue" for="linkedin-link">
							LinkedIn
						</label>
						<input
							class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
							id="linkedin-link"
							name="links"
							type="url"
							value={profile.links.linkedin}
							placeholder="https://www.linkedin.com/in/ton-profil"
						/>
					</div>

					<div>
						<label class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue" for="portfolio-link">
							Portfolio
						</label>
						<input
							class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
							id="portfolio-link"
							name="links"
							type="url"
							value={profile.links.portfolio}
							placeholder="https://ton-portfolio.fr"
						/>
					</div>
				</div>
			</div>

			<div class="grid gap-5 border-t border-ocean-blue/10 pt-8">
				<div>
					<h2 class="m-0 font-grift text-2xl font-extrabold text-ocean-blue">
						Domaines d'activité
						<span class="font-just-sans text-base font-normal text-ecume-blue">(optionnel)</span>
					</h2>
					<p class="mt-2 font-just-sans text-sm leading-6 text-ecume-blue">
						Ajoute les domaines qui correspondent à tes recherches et retire ceux qui ne t'intéressent plus.
					</p>
				</div>

				<div class="grid gap-3">
					<p class="m-0 font-just-sans text-sm font-semibold text-ocean-blue">
						Domaines sélectionnés
					</p>

					{#if selectedDomains.length}
						<ul class="flex flex-wrap gap-2">
							{#each selectedDomains as domain (domain.id)}
								<li>
									<input type="hidden" name="activity_domain_ids" value={domain.id} />
									<button
										class="inline-flex items-center gap-2 rounded-full bg-ocean-blue px-4 py-2 font-just-sans text-sm font-semibold text-white transition hover:bg-ecume-blue"
										type="button"
										aria-label="Retirer le domaine {domain.name}"
										onclick={() => selectedDomainIds.delete(domain.id)}
									>
										{domain.name}
										<span aria-hidden="true">×</span>
									</button>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="m-0 rounded-xl border border-dashed border-ocean-blue/20 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ecume-blue">
							Aucun domaine sélectionné.
						</p>
					{/if}
				</div>

				<div class="grid gap-3">
					<p class="m-0 font-just-sans text-sm font-semibold text-ocean-blue">
						Ajouter un domaine
					</p>

					{#if availableDomains.length}
						<ul class="flex flex-wrap gap-2">
							{#each availableDomains as domain (domain.id)}
								<li>
									<button
										class="rounded-full border border-ocean-blue/20 bg-lighthouse-white px-4 py-2 font-just-sans text-sm font-semibold text-ocean-blue transition hover:border-ocean-blue hover:bg-lighthouse-yellow"
										type="button"
										aria-label="Ajouter le domaine {domain.name}"
										onclick={() => selectedDomainIds.add(domain.id)}
									>
										+ {domain.name}
									</button>
								</li>
							{/each}
						</ul>
					{:else if activityDomains.length}
						<p class="m-0 font-just-sans text-sm text-ecume-blue">
							Tous les domaines disponibles sont déjà sélectionnés.
						</p>
					{:else}
						<p class="m-0 rounded-xl border border-dashed border-ocean-blue/20 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ecume-blue">
							Aucun domaine d'activité disponible pour le moment.
						</p>
					{/if}
				</div>
			</div>

			<div class="flex justify-end border-t border-ocean-blue/10 pt-6">
				<button
					class="rounded-full bg-ocean-blue px-5 py-3 font-just-sans text-sm font-semibold text-white transition hover:bg-ecume-blue"
					type="submit"
				>
					Enregistrer les modifications
				</button>
			</div>
		</form>
	</div>
</section>

{#if isPasswordModalOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-ocean-blue/25 px-6 backdrop-blur-xs"
		role="presentation"
		onclick={(event) => {
			if (event.target === event.currentTarget) {
				isPasswordModalOpen = false;
			}
		}}
	>
		<div class="w-full max-w-md rounded-2xl border border-ocean-blue/10 bg-white p-6 shadow-lg">
			<div class="flex items-start justify-between gap-4">
				<div>
					<h2 class="m-0 font-grift text-2xl font-extrabold text-ocean-blue">
						Changer le mot de passe
					</h2>
					<p class="mt-2 font-just-sans text-sm leading-6 text-ecume-blue">
						Saisis ton mot de passe actuel puis choisis-en un nouveau.
					</p>
				</div>

				<button
					class="rounded-full border border-ocean-blue/15 px-3 py-1.5 font-just-sans text-sm font-semibold text-ocean-blue transition hover:bg-lighthouse-white"
					type="button"
					onclick={() => (isPasswordModalOpen = false)}
				>
					Fermer
				</button>
			</div>

			<form method="POST" action="?/changePassword" class="mt-6 grid gap-4">
				<div>
					<label
						class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
						for="current-password"
					>
						Mot de passe actuel
					</label>
					<input
						class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="current-password"
						name="currentPassword"
						type="password"
						autocomplete="current-password"
						required
					/>
				</div>

				<div>
					<label
						class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
						for="new-password"
					>
						Nouveau mot de passe
					</label>
					<input
						class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="new-password"
						name="newPassword"
						type="password"
						autocomplete="new-password"
						required
					/>
				</div>

				<div>
					<label
						class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
						for="confirm-password"
					>
						Confirmer le nouveau mot de passe
					</label>
					<input
						class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="confirm-password"
						name="confirmPassword"
						type="password"
						autocomplete="new-password"
						required
					/>
				</div>

				{#if form?.passwordError}
					<p class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-just-sans text-sm text-red-700">
						{form.passwordError}
					</p>
				{/if}

				<div class="mt-2 flex justify-end gap-3">
					<button
						class="rounded-full border-2 border-ocean-blue bg-transparent px-4 py-2.5 font-just-sans text-sm font-semibold text-ocean-blue transition hover:bg-ocean-blue hover:text-white"
						type="button"
						onclick={() => (isPasswordModalOpen = false)}
					>
						Annuler
					</button>
					<button
						class="rounded-full bg-ocean-blue px-4 py-2.5 font-just-sans text-sm font-semibold text-white transition hover:bg-ecume-blue"
						type="submit"
					>
						Enregistrer
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
