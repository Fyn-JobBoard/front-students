<script lang="ts">
	import type { ActivityDomain } from 'fyn-api-sdk';

	let {
		activityDomains = [],
		selectedDomains = [],
		availableDomains = [],
		onAddDomain,
		onRemoveDomain
	}: {
		activityDomains?: ActivityDomain[];
		selectedDomains?: ActivityDomain[];
		availableDomains?: ActivityDomain[];
		onAddDomain: (domainId: number) => void;
		onRemoveDomain: (domainId: number) => void;
	} = $props();
</script>

<section class="grid gap-5 border-t border-ocean-blue/10 pt-8">
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
							onclick={() => onRemoveDomain(domain.id)}
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
							onclick={() => onAddDomain(domain.id)}
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
</section>
