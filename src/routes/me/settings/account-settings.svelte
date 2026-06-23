<script lang="ts">
	import type { ActivityDomain } from 'fyn-api-sdk';
	import AccountAccessSection from './account-access-section.svelte';
	import AccountSettingsHeader from './account-settings-header.svelte';
	import type { AccountSettingsForm, AccountSettingsProfile } from './account-settings';
	import ActivityDomainsSection from './activity-domains-section.svelte';
	import ExternalLinksSection from './external-links-section.svelte';
	import PasswordModal from './password-modal.svelte';
	import PersonalInfoSection from './personal-info-section.svelte';

	let {
		activityDomains = [],
		profile,
		form = null
	}: {
		activityDomains?: ActivityDomain[];
		profile: AccountSettingsProfile;
		form?: AccountSettingsForm;
	} = $props();
	let isPasswordModalOpen = $state(false);
	let selectedDomainIds = $derived<number[]>(
		profile.activity_domains?.map((domain) => domain.id) ?? []
	);

	$effect(() => {
		if (form?.passwordError) {
			isPasswordModalOpen = true;
		}
	});

	const openPasswordModal = () => {
		isPasswordModalOpen = true;
	};

	const closePasswordModal = () => {
		isPasswordModalOpen = false;
	};
</script>

<section class="min-h-screen bg-lighthouse-white px-6 pt-28 pb-16">
	<div class="mx-auto max-w-3xl rounded-2xl border border-ocean-blue/10 bg-white p-8 shadow-sm">
		<a
			href="/me"
			class="mb-6 inline-flex items-center gap-2 font-just-sans text-sm font-semibold text-ocean-blue transition hover:text-ecume-blue"
		>
			<span aria-hidden="true">←</span>
			Retour
		</a>

		<AccountSettingsHeader />

		<form method="POST" action="?/saveProfile" class="mt-8 grid gap-8">
			{#if form?.profileError}
				<p
					class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-just-sans text-sm text-red-700"
				>
					{form.profileError}
				</p>
			{/if}

			{#if form?.profileSuccess}
				<p
					class="rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-just-sans text-sm text-green-700"
				>
					{form.profileSuccess}
				</p>
			{/if}

			{#if form?.profileNotice}
				<p
					class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 font-just-sans text-sm text-amber-700"
				>
					{form.profileNotice}
				</p>
			{/if}

			<AccountAccessSection {profile} {form} onOpenPasswordModal={openPasswordModal} />

			<PersonalInfoSection {profile} />

			<ExternalLinksSection {profile} />

			<ActivityDomainsSection {activityDomains} bind:selectedDomainIds />

			<div class="flex justify-end border-t border-ocean-blue/10 pt-6">
				<button
					class="rounded-full bg-ocean-blue px-5 py-3 font-just-sans text-sm font-semibold text-white transition hover:bg-ecume-blue"
					type="submit"
				>
					Enregistrer les modifications
				</button>
			</div>
		</form>
	</div>
</section>

{#if isPasswordModalOpen}
	<PasswordModal {form} onClose={closePasswordModal} />
{/if}
