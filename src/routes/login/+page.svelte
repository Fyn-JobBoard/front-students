<script lang="ts">

	let showPassword = $state(false);
</script>

<svelte:head>
	<title>Fyn - Connexion</title>
	<meta name="description" content="Connectez-vous à votre compte Fyn" />
</svelte:head>

<main class="min-h-screen bg-lighthouse-white flex items-center justify-center px-4 pt-24 pb-12">
	<div class="w-full max-w-md">

		<div class="bg-white rounded-3xl border border-bleuet-blue p-8 shadow-sm">

			<h1 class="font-headings text-2xl font-extrabold text-ocean-blue mb-2 text-center">
				Content de te revoir
			</h1>
			<p class="font-corps text-sm text-ecume-blue mb-8">
				Connecte-toi pour accéder à tes offres et candidatures
			</p>

			<form method="POST" action="/login" class="flex flex-col gap-4">

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

				<div class="mt-2 flex justify-center">
	            <button
	         	type="submit"
		        class="rounded-full py-2.5 px-4 font-corps bg-ocean-blue text-white hover:opacity-90 transition-opacity">
	        	Se connecter
	            </button>
                </div>

				<div class="flex justify-center">
					<a href="/forgot-password" class="font-corps text-xs text-ecume-blue hover:underline">
						Mot de passe oublié ?
					</a>
				</div>
			</form>
		</div>

		<p class="text-center font-corps text-sm text-ecume-blue mt-6">
			Pas encore de compte ?
			<a href="/register" class="font-semibold text-ocean-blue hover:underline">
				S'inscrire gratuitement
			</a>
		</p>

	</div>
</main>