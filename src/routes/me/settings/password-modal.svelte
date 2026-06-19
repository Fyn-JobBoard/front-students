<script lang="ts">
	import type { AccountSettingsForm } from './account-settings.types';

	let {
		form = null,
		onClose
	}: {
		form?: AccountSettingsForm;
		onClose: () => void;
	} = $props();
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-ocean-blue/25 px-6 backdrop-blur-xs"
	role="presentation"
	onclick={(event) => {
		if (event.target === event.currentTarget) {
			onClose();
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
				onclick={onClose}
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
					onclick={onClose}
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
