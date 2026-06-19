<script lang="ts">
	import type { ActivityDomain } from 'fyn-api-sdk';

	let {
		activityDomains = [],
		selectedDomainIds = []
	}: {
		activityDomains?: ActivityDomain[];
		selectedDomainIds?: number[];
	} = $props();

	const selectedDomains = $derived(
		activityDomains.filter((domain) => selectedDomainIds.includes(domain.id))
	);
	const availableDomains = $derived(
		activityDomains.filter((domain) => !selectedDomainIds.includes(domain.id))
	);
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
		<p class="m-0 font-just-sans text-sm font-semibold text-ocean-blue">Sélection</p>

		{#if activityDomains.length}
			<ul class="flex flex-wrap gap-2">
				{#each activityDomains as domain (domain.id)}
					<li>
						<label
							class={selectedDomainIds.includes(domain.id)
								? 'inline-flex cursor-pointer items-center gap-2 rounded-full bg-ocean-blue px-4 py-2 font-just-sans text-sm font-semibold text-white transition hover:bg-ecume-blue'
								: 'inline-flex cursor-pointer items-center gap-2 rounded-full border border-ocean-blue/20 bg-lighthouse-white px-4 py-2 font-just-sans text-sm font-semibold text-ocean-blue transition hover:border-ocean-blue hover:bg-lighthouse-yellow'}
						>
							<input
								class="sr-only"
								type="checkbox"
								name="activity_domain_ids"
								value={domain.id}
								bind:group={selectedDomainIds}
							/>
							{domain.name}
						</label>
					</li>
				{/each}
			</ul>
			{#if !selectedDomains.length}
				<p class="m-0 rounded-xl border border-dashed border-ocean-blue/20 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ecume-blue">
					Aucun domaine sélectionné.
				</p>
			{/if}
			{#if !availableDomains.length}
				<p class="m-0 font-just-sans text-sm text-ecume-blue">
					Tous les domaines disponibles sont sélectionnés.
				</p>
			{/if}
		{:else}
			<p class="m-0 rounded-xl border border-dashed border-ocean-blue/20 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ecume-blue">
				Aucun domaine d'activité disponible pour le moment.
			</p>
		{/if}
	</div>
</section>
