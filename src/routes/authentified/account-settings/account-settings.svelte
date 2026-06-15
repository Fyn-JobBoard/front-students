<script lang="ts">
	import type { ActivityDomain } from 'fyn-api-sdk';
	import { SvelteSet } from 'svelte/reactivity';

	let { activityDomains = [] }: { activityDomains?: ActivityDomain[] } = $props();

	const selectedDomainIds = $state(new SvelteSet<number>());
	const selectedDomains = $derived(
		activityDomains.filter((domain) => selectedDomainIds.has(domain.id))
	);
	const availableDomains = $derived(
		activityDomains.filter((domain) => !selectedDomainIds.has(domain.id))
	);
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

		<form class="mt-8 grid gap-8">
			<div class="grid gap-5">
				<div>
					<label class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue" for="email">
						Adresse mail
					</label>
					<input
						class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="email"
						type="email"
						placeholder="ton.email@fyn.local"
						required
					/>
				</div>

				<div>
					<p class="mb-2 font-just-sans text-sm font-semibold text-ocean-blue">Mot de passe</p>
					<button
						class="rounded-full border-2 border-ocean-blue bg-transparent px-4 py-2.5 font-just-sans text-sm font-semibold text-ocean-blue transition hover:bg-ocean-blue hover:text-white"
						type="button"
					>
						Changer le mot de passe
					</button>
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
							type="text"
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
							type="text"
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
						type="date"
						required
					/>
				</div>

				<div>
					<label class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue" for="bio">
						Bio
					</label>
					<textarea
						class="min-h-28 block w-full resize-y rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm leading-6 text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="bio"
						placeholder="Présente-toi en quelques mots"
					></textarea>
				</div>
			</div>

			<div class="grid gap-5 border-t border-ocean-blue/10 pt-8">
				<div>
					<h2 class="m-0 font-grift text-2xl font-extrabold text-ocean-blue">
						Domaines d'activité
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
