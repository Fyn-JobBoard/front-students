<script lang="ts">
	import type { AccountSettingsProfile } from './account-settings';

	let { profile }: { profile: AccountSettingsProfile } = $props();
</script>

<section class="grid gap-5 border-t border-ocean-blue/10 pt-8">
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
				value={profile.first_name}
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
				value={profile.last_name}
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
</section>
