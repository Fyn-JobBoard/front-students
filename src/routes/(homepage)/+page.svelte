<script lang="ts">
	import CtaBand from './cta-band.svelte';
	import Features from './features-section.svelte';
	import Hero from './hero.svelte';
	import HowItWorks from './how-it-works.svelte';
	import Kanban from './kanban.svelte';
	import Offers from './offers-section.svelte';
	import Profile from './profile-section.svelte';
	import ScrappingBanner from './scrapping-banner.svelte';
	import Testimonials from './testimonials-section.svelte';
</script>

<svelte:head>
	<title>Fyn - La plateform #1 des alternants</title>
	<meta
		name="description"
		content="Fyn est un job board spécialisé dans la recherche de stage et alternance"
	/>
</svelte:head>

<Hero />
<Offers />
<HowItWorks />
<ScrappingBanner />
<Profile />
<Kanban />
<Features />
<Testimonials />
<CtaBand />
