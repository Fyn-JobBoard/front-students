<script lang="ts">

	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	let password = $state('');
	let confirmPassword = $state('');

	let passwordError = $derived(
		confirmPassword.length > 0 && password !== confirmPassword
			? 'Les mots de passe ne correspondent pas'
			: ''
	);

	let canSubmit = $derived(
		password.length > 0 &&
		confirmPassword.length > 0 &&
		password === confirmPassword
	);
</script>

<svelte:head>
	<title>Fyn - Inscription</title>
	<meta name="description" content="Crée ton compte Fyn gratuitement" />
</svelte:head>

<main class="min-h-screen bg-lighthouse-white flex items-center justify-center px-4 pt-24 pb-12">
	<div class="w-full max-w-md">

		<div class="bg-white rounded-3xl border border-bleuet-blue p-8 shadow-sm">

			<h1 class="font-headings text-2xl font-extrabold text-ocean-blue mb-2 text-center">
				Crée ton compte
			</h1>
			<p class="font-corps text-sm text-ecume-blue mb-8 text-center">
				Rejoins 12 000+ étudiants qui ont déjà trouvé leur alternance sur Fyn
			</p>

			<form method="POST" action="/register" class="flex flex-col gap-4">

				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col gap-1.5">
						<label for="firstname" class="font-corps text-sm font-medium text-ocean-blue">
							Prénom
						</label>
						<input
							id="firstname"
							name="firstname"
							type="text"
							required
							class="rounded-xl border border-bleuet-blue px-4 py-3 font-corps text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:outline-none"
						/>
					</div>
					<div class="flex flex-col gap-1.5">
						<label for="lastname" class="font-corps text-sm font-medium text-ocean-blue">
							Nom
						</label>
						<input
							id="lastname"
							name="lastname"
							type="text"
							required
							class="rounded-xl border border-bleuet-blue px-4 py-3 font-corps text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:outline-none"
						/>
					</div>
				</div>

				<div class="flex flex-col gap-1.5">
					<label for="email" class="font-corps text-sm font-medium text-ocean-blue">
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						class="rounded-xl border border-bleuet-blue px-4 py-3 font-corps text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:outline-none"
					/>
				</div>

				<div class="flex flex-col gap-1.5">
					<label for="password" class="font-corps text-sm font-medium text-ocean-blue">
						Mot de passe
					</label>
					<div class="relative">
						<input
							id="password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							required
							bind:value={password}
							class="w-full rounded-xl border border-bleuet-blue px-4 py-3 pr-12 font-corps text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:outline-none"
						/>
						<button
							type="button"
							onclick={() => showPassword = !showPassword}
							class="absolute right-4 top-1/2 -translate-y-1/2 text-ecume-blue hover:text-ocean-blue transition-colors"
							aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
						>
							{#if showPassword}
								<span class="icon-[mdi--eye-off] text-xl"></span>
							{:else}
								<span class="icon-[mdi--eye] text-xl"></span>
							{/if}
						</button>
					</div>
				</div>

				<div class="flex flex-col gap-1.5">
					<label for="confirm_password" class="font-corps text-sm font-medium text-ocean-blue">
						Confirmer le mot de passe
					</label>
					<div class="relative">
						<input
							id="confirm_password"
							name="confirm_password"
							type={showConfirmPassword ? 'text' : 'password'}
							required
							bind:value={confirmPassword}
							class="w-full rounded-xl border px-4 py-3 pr-12 font-corps text-sm text-ocean-blue placeholder:text-ecume-blue focus:outline-none
								{passwordError ? 'border-red-400 focus:border-red-400' : 'border-bleuet-blue focus:border-ocean-blue'}"
						/>
						<button
							type="button"
							onclick={() => showConfirmPassword = !showConfirmPassword}
							class="absolute right-4 top-1/2 -translate-y-1/2 text-ecume-blue hover:text-ocean-blue transition-colors"
							aria-label={showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
						>
							{#if showConfirmPassword}
								<span class="icon-[mdi--eye-off] text-xl"></span>
							{:else}
								<span class="icon-[mdi--eye] text-xl"></span>
							{/if}
						</button>
				 </div>
					{#if passwordError}
						<p class="font-corps text-xs text-red-500 mt-1">{passwordError}</p>
					{/if}
				</div>

				<div class="mt-2 flex justify-center">
                <button
                type="submit"
                disabled={!canSubmit}
                class="rounded-full py-2.5 px-4 font-corps transition-opacity
                {canSubmit
                ? 'bg-ocean-blue text-white hover:opacity-90 cursor-pointer'
                : 'bg-bleuet-blue text-ecume-blue cursor-not-allowed opacity-60'}">
                Créer mon compte gratuitement
               </button>
             </div>

			</form>
		</div>

		<p class="text-center font-corps text-sm text-ecume-blue mt-6">
			Déjà un compte ?
			<a href="/login" class="font-semibold text-ocean-blue hover:underline">
				Se connecter
			</a>
		</p>

	</div>
</main>