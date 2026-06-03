<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Email from '$lib/components/ui/forms/email.svelte';
	import Password from '$lib/components/ui/forms/password.svelte';

	let password = $state('');
	let confirmPassword = $state('');

	let passwordError = $derived(
		confirmPassword.length > 0 && password !== confirmPassword
			? 'Les mots de passe ne correspondent pas'
			: ''
	);

	let canSubmit = $derived(
		password.length > 0 && confirmPassword.length > 0 && password === confirmPassword
	);
</script>

<svelte:head>
	<title>Fyn - Inscription</title>
	<meta name="description" content="Crée ton compte Fyn gratuitement" />
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-lighthouse-white px-4 pt-24 pb-12">
	<div class="w-full max-w-md">
		<div class="rounded-3xl border border-bleuet-blue bg-white p-8 shadow-sm">
			<h1 class="mb-2 text-center font-headings text-2xl font-extrabold text-ocean-blue">
				Crée ton compte
			</h1>
			<p class="font-corps mb-8 text-center text-sm text-ecume-blue">
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
							class="font-corps rounded-xl border border-bleuet-blue px-4 py-3 text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:outline-none"
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
							class="font-corps rounded-xl border border-bleuet-blue px-4 py-3 text-sm text-ocean-blue placeholder:text-ecume-blue focus:border-ocean-blue focus:outline-none"
						/>
					</div>
				</div>

				<Email />

				<Password bind:value={password} />

				<div class="flex flex-col gap-1.5">
					<Password
						name="confirm_password"
						label="Confirmer le mot de passe"
						bind:value={confirmPassword}
					/>
					{#if passwordError}
						<p class="font-corps text-xs text-red-500">{passwordError}</p>
					{/if}
				</div>

				<div class="mt-2 flex justify-center">
					<Button type="primary" action={{ type: 'submit' }}>Créer mon compte gratuitement</Button>
				</div>
			</form>
		</div>

		<p class="font-corps mt-6 text-center text-sm text-ecume-blue">
			Déjà un compte ?
			<a href="/login" class="font-semibold text-ocean-blue hover:underline"> Se connecter </a>
		</p>
	</div>
</main>
