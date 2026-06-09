<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button.svelte';
	import Email from '$lib/components/ui/forms/email.svelte';
	import Password from '$lib/components/ui/forms/password.svelte';
	import Text from '$lib/components/ui/forms/text.svelte';
	import type { PageProps } from './$types';

	let password = $state('');
	let confirmPassword = $state('');

	let passwordError = $derived(
		confirmPassword.length > 0 && password !== confirmPassword
			? 'Les mots de passe ne correspondent pas'
			: ''
	);

	const { form }: PageProps = $props();
	$inspect(form);
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

			<form method="POST" action="/register" class="flex flex-col gap-4" use:enhance>
				{#if form?.error}
					<p class="text-red-400">{form.error}</p>
				{/if}

				<div class="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
					<Text name="first_name" label="Prénom" required />
					<Text name="last_name" label="Nom" required />
				</div>

				<Email required />

				<Password bind:value={password} required />

				<div class="flex flex-col gap-1.5">
					<Password
						name="confirm_password"
						label="Confirmer le mot de passe"
						required
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
