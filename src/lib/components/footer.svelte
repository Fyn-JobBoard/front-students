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

<footer class="bg-blue-800">
	<div>
		<img src={Logo} alt="Logo Fyn" />

		<p>La plateforme qui connecte les étudiants ambitieux avec les meilleures entreprises.</p>

		<ul>
			{#each Object.entries(NAVIGATIONS) as [section, links]}
				<li>
					<h2>{section}</h2>

					<nav>
						<ul>
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
				</li>
			{/each}
		</ul>
	</div>

	<div>
		<p>© 2025 FYN - Tous droits réservés. Fait avec ❤️ pour les alternants de France.</p>

		<nav>
			<ul>
				{#each Object.entries(SOCIALS) as [network, { url, icon }]}
					<li>
						<a href={url.toString()} target="_blank" title="Retrouve-nous sur {network} !">
							<span class={[icon]}></span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</footer>
