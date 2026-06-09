<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button.svelte';
	import Email from '$lib/components/ui/forms/email.svelte';
	import Password from '$lib/components/ui/forms/password.svelte';
	import type { PageProps } from './$types';

	const { form }: PageProps = $props();
</script>

<svelte:head>
	<title>Fyn - Connexion</title>
	<meta name="description" content="Connectez-vous à votre compte Fyn" />
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-lighthouse-white px-4 pt-24 pb-12">
	<div class="w-full max-w-md">
		<div class="rounded-3xl border border-bleuet-blue bg-white p-8 shadow-sm">
			<h1 class="mb-2 text-center font-headings text-2xl font-extrabold text-ocean-blue">
				Content de te revoir
			</h1>
			<p class="font-corps mb-8 text-center text-sm text-ecume-blue">
				Connecte-toi pour accéder à tes offres et candidatures
			</p>

			<form method="POST" class="flex flex-col gap-4" use:enhance>
				{#if form?.error}
					<p class="text-red-400">{form.error}</p>
				{/if}

				<Email />

				<Password />

				<div class="mt-2 flex justify-center">
					<Button type="primary" action={{ type: 'submit' }}>Se connecter</Button>
				</div>

				<div class="flex justify-center">
					<a href="/forgot-password" class="font-corps text-xs text-ecume-blue hover:underline">
						Mot de passe oublié ?
					</a>
				</div>
			</form>
		</div>

		<p class="font-corps mt-6 text-center text-sm text-ecume-blue">
			Pas encore de compte ?
			<a href="/register" class="font-semibold text-ocean-blue hover:underline">
				S'inscrire gratuitement
			</a>
		</p>
	</div>
</main>
