<script lang="ts">
	import type { AccountSettingsProfile } from './account-settings.types';

	let { profile }: { profile: AccountSettingsProfile } = $props();
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
		{#each profile.links as link, index}
			<li>
				<label
					class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue"
					for="link-{index}"
				>
					<input
						class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
						id="github-link"
						name="links[{index}]"
						type="url"
						value={link}
						placeholder="https://exemple.com"
					/>
				</label>
			</li>
		{/each}
		<!-- <div>
			<label class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue" for="github-link">
				GitHub
			</label>
			<input
				class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
				id="github-link"
				name="links"
				type="url"
				value={profile.splitLinks.github}
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
				value={profile.splitLinks.linkedin}
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
				value={profile.splitLinks.portfolio}
				placeholder="https://ton-portfolio.fr"
			/>
		</div> -->
	</ul>
</section>
