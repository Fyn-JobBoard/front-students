<script lang="ts">
	import type { AccountSettingsProfile } from './account-settings';

	let { profile }: { profile: AccountSettingsProfile } = $props();

	let reload = $state(0);
	let links = $derived(profile.links);
</script>

<section class="grid gap-5 border-t border-ocean-blue/10 pt-8">
	<div>
		<h2 class="m-0 font-grift text-2xl font-extrabold text-ocean-blue">
			Liens externes
			<span class="font-just-sans text-base font-normal text-ecume-blue">(optionnel)</span>
		</h2>
		<p class="mt-2 font-just-sans text-sm leading-6 text-ecume-blue">
			Ajoute tes liens publics pour compléter ton profil étudiant.
		</p>
	</div>

	<ul class="grid gap-5">
		{#key reload}
			{#each links as _, index}
				<li class="mb-2 flex items-stretch gap-2">
					<label
						class="block grow font-just-sans text-sm font-semibold text-ocean-blue"
						for="link-{index}"
					>
						<input
							class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
							id="link-{index}"
							name="link"
							type="url"
							bind:value={links[index]}
							placeholder="https://exemple.com"
						/>
					</label>

					<button
						class="grid aspect-square place-content-center rounded-full border border-ocean-blue/20 font-just-sans text-xs font-semibold text-ocean-blue transition hover:border-ocean-blue hover:bg-white"
						type="button"
						onclick={() => {
							profile.links.splice(index, 1);
							reload++;
						}}
						title="Supprimer le lien"
					>
						<span class="icon-[mdi--trash]"></span>
					</button>
				</li>
			{/each}
		{/key}
	</ul>

	<div class="flex justify-start">
		<button
			class="rounded-full border-2 border-ocean-blue bg-transparent px-5 py-3 font-just-sans text-sm font-semibold text-ocean-blue transition hover:bg-ocean-blue hover:text-white"
			type="button"
			onclick={() => {
				profile.links.push('');
				reload++;
			}}
		>
			+ Ajouter un lien
		</button>
	</div>
</section>
