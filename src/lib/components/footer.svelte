<script lang="ts" module>
	export const NAVIGATIONS: {
		[key: string]: { [key: string]: string | URL };
	} = {
		Features: {
			'Vérification CV': '/me/cv',
			'Coach entretiens': '/preparation',
			'Suivi candidature': '/me/applies',
			'Alertes offres': '/me/notifications',
			'Annuaires entreprises': '/companies'
		},
		'Learn more': {
			'A propos de Fyn': '/fyn',
			'Comment ça marche': '/fyn#how',
			Témoignages: '/fyn#testimonies',
			'Blog & conseils': '/actualities',
			"Rejoindre l'équipe": '/fyn/join'
		},
		Support: {
			"Centre d'aide": '/help',
			'Nous contacter': '/contact',
			'Signaler un bug': '/help#bug',
			Confidentialité: '/legals',
			CGU: '/legals#cgu'
		}
	};

	export const SOCIALS: {
		[key: string]: {
			url: string | URL;
			icon: string;
		};
	} = {
		LinkedIn: {
			url: 'https://linkedin.com/fyn',
			icon: 'icon-[fa7-brands--linkedin-in]'
		},
		X: {
			url: 'https://x.com/fyn',
			icon: 'icon-[fa7-brands--x-twitter]'
		},
		Instagram: {
			url: 'https://instagram.com/fyn',
			icon: 'icon-[fa7-brands--instagram]'
		}
	};
</script>

<script lang="ts">
	import { page } from '$app/state';

	import Logo from '$lib/assets/brand/logo.png';
</script>

<footer class="bg-blue-800 text-[#8C99C7]">
	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-14 md:grid-cols-[230px_220px_1fr]">
		<div>
			<img src={Logo} alt="Logo Fyn" class="h-auto w-24" />
		</div>
		<div>
			<p class="max-w-sm text-sm leading-6 text-[#8C99C7]">
				La plateforme qui connecte les étudiants ambitieux avec les meilleures entreprises.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
			{#each Object.entries(NAVIGATIONS) as [section, links]}
				<div>
					<h2 class="mb-5 text-xs font-bold tracking-widest text-white uppercase">
						{section}
					</h2>

					<nav>
						<ul class="space-y-2">
							{#each Object.entries(links) as [label, url_str]}
								{@const url = new URL(url_str, page.url)}
								{@const is_local = url.host === page.url.host}

								<li>
									<a href={url.toString()} target={is_local ? '_self' : '_blank'}>
										{label}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				</div>
			{/each}
		</div>
	</div>

	<div class="class mx-auto w-[85%] border-t border-white/10">
		<div
			class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-3 py-18 md:flex-row"
		>
			<p class="text-sm text-[#8C99C7]">
				© 2026 FYN - Tous droits réservés. Fait avec ❤ pour les alternants de France.
			</p>

			<nav>
				<ul class="flex items-center gap-6">
					{#each Object.entries(SOCIALS) as [network, { url, icon }]}
						<li>
							<a
								href={url.toString()}
								target="_blank"
								title="Retrouve-nous sur {network} !"
								class="flex h-10 w-10 items-center justify-center rounded-full border border-[#8C99C7]/30 text-xl text-[#8C99C7]"
							>
								<span class={[icon]}></span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>
</footer>
