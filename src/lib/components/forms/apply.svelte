<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import type { Job, MeRouteAsStudentResponse } from 'fyn-api-sdk';
	import Button from '../ui/button.svelte';
	import Email from '../ui/forms/email.svelte';
	import File from '../ui/forms/file.svelte';
	import Textarea from '../ui/forms/textarea.svelte';

	const {
		job,
		student
	}: {
		job: Job;
		student?: MeRouteAsStudentResponse;
	} = $props();
</script>

<section class="rounded-md bg-white p-8">
	<h3 class="text-2xl font-light">Postuler à cette offre</h3>
	<p class="text-sm font-light text-ecume-blue">
		{#if job.scrapped_from}
			Offre d'emploi provenant de {new URL(job.scrapped_from).host}
		{:else}
			Candidature envoyée directement - sans redirection
		{/if}
	</p>
	<hr class="my-8 border-ecume-blue" />
	{#if job.scrapped_from}
		<Button
			type="primary"
			action={{
				url: job.scrapped_from,
				target: '_blank'
			}}
		>
			Accéder à l'offre
		</Button>
	{:else if student}
		<form action="/job/{job.id}/apply" method="post" use:enhance>
			<File label="Ton CV" required name="cv" />
			<br />
			<Textarea
				name="message"
				label="Lettre de motivation"
				placeholder="Présente toi en quelques lignes"
			/>
			<br />
			<Email value={student.account.email} required />
			<br />
			<Button action={{ type: 'submit' }} type="primary">Envoyer ma candidature</Button>
		</form>
	{:else}
		<Button
			type="primary"
			action={{
				url: `/login?redirect=${encodeURIComponent(page.url.toString())}`
			}}
		>
			Connecte toi pour postuler
		</Button>
	{/if}
</section>
