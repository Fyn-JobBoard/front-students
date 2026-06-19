<script lang="ts">
	import type { AccountSettingsForm, AccountSettingsProfile } from './account-settings.types';

	let {
		profile,
		form = null,
		onOpenPasswordModal
	}: {
		profile: AccountSettingsProfile;
		form?: AccountSettingsForm;
		onOpenPasswordModal: () => void;
	} = $props();
</script>

<section class="grid gap-5">
	<div>
		<label class="mb-2 block font-just-sans text-sm font-semibold text-ocean-blue" for="email">
			Adresse mail
		</label>
		<input
			class="block w-full rounded-xl border border-ocean-blue/15 bg-lighthouse-white px-4 py-3 font-just-sans text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:ring-4 focus:ring-ocean-blue/10 focus:outline-none"
			id="email"
			name="email"
			type="email"
			value={profile.account.email}
			placeholder="ton.email@fyn.local"
			required
		/>
	</div>

	<div>
		<p class="mb-2 font-just-sans text-sm font-semibold text-ocean-blue">Mot de passe</p>
		<button
			class="rounded-full border-2 border-ocean-blue bg-transparent px-4 py-2.5 font-just-sans text-sm font-semibold text-ocean-blue transition hover:bg-ocean-blue hover:text-white"
			type="button"
			onclick={onOpenPasswordModal}
		>
			Changer le mot de passe
		</button>
		{#if form?.passwordSuccess}
			<p class="mt-2 font-just-sans text-sm font-medium text-green-700">
				{form.passwordSuccess}
			</p>
		{/if}
	</div>
</section>
