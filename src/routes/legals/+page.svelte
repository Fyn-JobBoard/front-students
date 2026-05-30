<script module lang="ts">
	export const FYN_INFO = {
		adresse: '15 Rue de la Paix, 75002 Paris',
		siret: '987 654 321 00015',
		villeRcs: 'Paris'
	};
</script>

<script lang="ts">
	import Simple from '$lib/components/heros/simple.svelte';
</script>

<Simple title="Mentions légales" class="mt-24" />

<article class="mx-auto prose max-w-7xl px-4">
	<section id="cgu">
		<h2>Conditions Générales d'Utilisation (CGU)</h2>

		<header class="version-info">
			<p>
				<strong>Plateforme Fyn</strong> : Jobboard agrégateur d'offres d'alternance et de stages
			</p>
			<p>Version 1.0 : En vigueur à compter du 15/06/2026 | fyn.fr</p>
		</header>

		<blockquote class="intro-box">
			<p>
				Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de
				la plateforme Fyn, accessible à l'adresse fyn.fr et via l'application mobile Fyn. Toute
				utilisation de la plateforme implique l'acceptation pleine et entière des présentes CGU.
			</p>
		</blockquote>

		<article>
			<h3>Article 1 : Présentation de la plateforme</h3>
			<p>
				Fyn est une plateforme numérique d'intermédiation 100 % dédiée aux offres d'alternance et de
				stages en France. Elle est éditée par la société Fyn SAS, dont le siège social est situé à {FYN_INFO.adresse},
				immatriculée au RCS de {FYN_INFO.villeRcs} sous le numéro {FYN_INFO.siret}.
			</p>
			<p>Fyn propose :</p>
			<ul>
				<li>
					Un espace étudiant permettant la recherche et la candidature à des offres d'alternance et
					de stages ;
				</li>
				<li>Un espace recruteur permettant la publication et la gestion d'offres ;</li>
				<li>Un back-office administratif réservé à l'équipe Fyn ;</li>
				<li>Des contenus pédagogiques (articles, guides, newsletters) accessibles librement.</li>
			</ul>
		</article>

		<article>
			<h3>Article 2 : Accès à la plateforme et création de compte</h3>

			<h4>2.1 Conditions d'accès</h4>
			<p>
				L'accès à la plateforme Fyn est ouvert à toute personne physique ou morale disposant d'une
				connexion internet. La consultation du blog et des ressources ressources pédagogiques est
				libre et sans inscription. La création d'un compte est obligatoire pour accéder aux
				fonctionnalités de recherche d'offre, de candidature et de publication d'offre.
			</p>

			<h4>2.2 Types de comptes</h4>
			<ul>
				<li>
					<strong>Compte Étudiant :</strong> ouvert à toute personne physique préparant un diplôme en
					alternance ou recherchant un stage ;
				</li>
				<li>
					<strong>Compte Recruteur :</strong> ouvert à toute personne morale (entreprise, association,
					administration) souhaitant recruter un alternant ou un stagiaire ;
				</li>
				<li>
					<strong>Compte Institutionnel :</strong> ouvert aux organismes partenaires (CFA, OPCO, Ministères)
					sur accord préalable de Fyn.
				</li>
			</ul>

			<h4>2.3 Création et sécurité du compte</h4>
			<p>
				L'utilisateur s'engage à fournir des informations exactes, complètes et à jour lors de la
				création de son compte. Il est seul responsable de la confidentialité de ses identifiants et
				de toute activité effectuée depuis son compte.
			</p>
			<p>
				Fyn se réserve le droit de suspendre ou supprimer tout compte dont les informations
				s'avèrent inexactes, frauduleuses ou contraires aux présentes CGU, notamment les comptes
				d'établissements de formation publiant de fausses offres à des fins de recrutement d'élèves.
			</p>
		</article>

		<article>
			<h3>Article 3 : Règles d'utilisation de la plateforme</h3>

			<h4>3.1 Obligations communes à tous les utilisateurs</h4>
			<p>Tout utilisateur s'engage à :</p>
			<ul>
				<li>Utiliser la plateforme conformément à son objet et aux présentes CGU ;</li>
				<li>
					Ne pas porter atteinte aux droits de tiers (propriété intellectuelle, vie privée,
					réputation) ;
				</li>
				<li>
					Ne pas tenter de perturber, pirater ou compromettre le fonctionnement de la plateforme ;
				</li>
				<li>
					Ne pas publier de contenus illicites, diffamatoires, discriminatoires ou trompeurs ;
				</li>
				<li>Respecter la réglementation applicable, notamment le RGPD et le Code du travail.</li>
			</ul>

			<h4>3.2 Obligations spécifiques aux étudiants</h4>
			<p>L'étudiant s'engage à :</p>
			<ul>
				<li>Fournir un profil sincère et à jour (formations, compétences, expériences) ;</li>
				<li>
					Postuler uniquement aux offres pour lesquelles il est éligible et sincèrement motivé ;
				</li>
				<li>Ne pas utiliser la plateforme à des fins commerciales ou de prospection.</li>
			</ul>

			<h4>3.3 Obligations spécifiques aux recruteurs</h4>
			<p>Le recruteur s'engage à :</p>
			<ul>
				<li>
					Publier uniquement des offres réelles, correspondant à de véritables besoins de
					recrutement en alternance ou en stage ;
				</li>
				<li>
					Ne publier aucune offre de CDI, CDD ou autre contrat de travail salarié hors dispositif de
					formation en alternance ou stage ;
				</li>
				<li>
					Vérifier la conformité de ses offres avec la réglementation applicable aux contrats
					d'apprentissage et de professionnalisation ;
				</li>
				<li>Répondre aux candidatures reçues dans un délai raisonnable ;</li>
				<li>
					Ne pas utiliser la plateforme pour collecter des CVs à des fins autres que le recrutement
					annoncé.
				</li>
			</ul>
		</article>

		<article>
			<h3>Article 4 : Contenu et qualité des offres</h3>
			<p>
				Fyn s'engage à maintenir une plateforme exclusivement dédiée aux contrats étudiants. À ce
				titre :
			</p>
			<ul>
				<li>
					Tout contenu de type CDI, CDD, intérim ou autre contrat salarié est automatiquement bloqué
					;
				</li>
				<li>
					Les annonces publiées par des établissements de formation dans le but de recruter leurs
					propres élèves sont détectées et bloquées ;
				</li>
				<li>Le SIRET de chaque entreprise recruteur est vérifié à l'inscription ;</li>
				<li>Un système de signalement permet aux utilisateurs de signaler toute offre suspecte.</li>
			</ul>
			<p>
				Fyn met en œuvre des moyens techniques et humains de modération, mais ne peut garantir
				l'exactitude ou la légitimité de l'ensemble des offres publiées. Fyn décline toute
				responsabilité quant au contenu des offres publiées par les recruteurs.
			</p>
		</article>

		<article>
			<h3>Article 5 : Propriété intellectuelle</h3>
			<p>
				L'ensemble des éléments constituant la plateforme Fyn (nom, logo, design, contenus
				éditoriaux, code source, base de données) sont la propriété exclusive de Fyn SAS et sont
				protégés par le droit de la propriété intellectuelle.
			</p>
			<p>
				Toute reproduction, représentation, modification, adaptation ou exploitation non autorisée
				de ces éléments est strictement interdite.
			</p>
			<p>
				Les utilisateurs conservent la propriété des contenus qu'ils publient sur la plateforme (CV,
				lettres de motivation, offres d'emploi) et accordent à Fyn une licence non exclusive,
				mondiale et gratuite pour les utiliser dans le cadre du fonctionnement du service.
			</p>
		</article>

		<article>
			<h3>Article 6 : Protection des données personnelles</h3>
			<p>
				Fyn accorde une importance primordiale à la protection des données personnelles de ses
				utilisateurs. Le traitement des données est effectué conformément au Règlement Général sur
				la Protection des Données (RGPD) et à la loi Informatique et Libertés.
			</p>

			<h4>6.1 Données collectées</h4>
			<p>Fyn collecte uniquement les données nécessaires au fonctionnement du service :</p>
			<ul>
				<li>
					<strong>Étudiants :</strong> nom, prénom, email, formation, compétences, expériences professionnelles,
					CV, historique de candidatures ;
				</li>
				<li>
					<strong>Recruteurs :</strong> nom, prénom, email professionnel, SIRET, informations sur l'entreprise,
					offres publiées.
				</li>
			</ul>

			<h4>6.2 Droits des utilisateurs</h4>
			<p>Conformément au RGPD, tout utilisateur dispose des droits suivants :</p>
			<ul>
				<li>Droit d'accès à ses données ;</li>
				<li>Droit de rectification ;</li>
				<li>
					Droit à l'effacement (droit à l'oubli) : exercice via Paramètres &gt; Supprimer mon compte
					;
				</li>
				<li>Droit à la portabilité ;</li>
				<li>Droit d'opposition au traitement.</li>
			</ul>
			<p>Pour exercer ces droits : <a href="mailto:privacy@fyn.fr">privacy@fyn.fr</a></p>

			<h4>6.3 Cookies</h4>
			<p>
				Fyn utilise des cookies techniques nécessaires au fonctionnement du service et des cookies
				analytiques soumis au consentement préalable de l'utilisateur. Le refus des cookies
				analytiques n'empêche pas l'accès à la plateforme.
			</p>
		</article>

		<article>
			<h3>Article 7 : Disponibilité et responsabilité</h3>
			<p>
				Fyn s'efforce d'assurer la disponibilité de la plateforme 24h/24 et 7j/7, avec un objectif
				de disponibilité (SLA) de 99,9 %. Toutefois, des interruptions pour maintenance, mises à
				jour ou cas de force majeure peuvent survenir.
			</p>
			<p>Fyn décline toute responsabilité pour :</p>
			<ul>
				<li>Les contenus publiés par les utilisateurs (offres, profils, messages) ;</li>
				<li>Les décisions de recrutement prises par les entreprises ;</li>
				<li>L'issue des processus de recrutement initiés via la plateforme ;</li>
				<li>
					Les dommages indirects liés à l'utilisation ou l'impossibilité d'utilisation de la
					plateforme.
				</li>
			</ul>
		</article>

		<article>
			<h3>Article 8 : Suspension et résiliation de compte</h3>
			<p>Fyn se réserve le droit de suspendre ou résilier tout compte sans préavis en cas de :</p>
			<ul>
				<li>Violation des présentes CGU ;</li>
				<li>Publication d'offres fictives ou de fausses informations ;</li>
				<li>Comportement frauduleux ou préjudiciable à la communauté Fyn ;</li>
				<li>Non-respect de la réglementation applicable.</li>
			</ul>
			<p>
				L'utilisateur peut supprimer son compte à tout moment depuis les paramètres de son espace
				personnel. Les données associées sont supprimées dans un délai de 48 heures, sous réserve
				des obligations légales de conservation.
			</p>
		</article>

		<article>
			<h3>Article 9 : Modification des CGU</h3>
			<p>
				Fyn se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront
				informés de toute modification substantielle par email et/ou via une notification sur la
				plateforme. La poursuite de l'utilisation de la plateforme après notification vaut
				acceptation des nouvelles conditions.
			</p>
		</article>

		<article>
			<h3>Article 10 : Droit applicable et juridiction</h3>
			<p>
				Les présentes CGU sont soumises au droit français. En cas de litige relatif à
				l'interprétation ou à l'exécution des présentes CGU, les parties s'efforceront de trouver
				une solution amiable. À défaut, les tribunaux compétents du ressort du siège social de Fyn
				SAS seront seuls compétents.
			</p>
		</article>

		<footer class="contact-box">
			<p>
				Contact pour toute question relative aux CGU : <a href="mailto:legal@fyn.fr">legal@fyn.fr</a
				>
			</p>
			<p>Fyn SAS – {FYN_INFO.adresse} – SIRET : {FYN_INFO.siret}</p>
		</footer>
	</section>

	<hr class="section-divider" />

	<section id="cgv">
		<h2>Conditions Générales de Vente (CGV)</h2>

		<header class="version-info">
			<p><strong>Offres payantes Étudiants &amp; Entreprises</strong> : Plateforme Fyn</p>
			<p>Version 1.0 : En vigueur à compter du 15/06/2026 | fyn.fr</p>
		</header>

		<blockquote class="intro-box">
			<p>
				Les présentes Conditions Générales de Vente (CGV) s'appliquent à l'ensemble des offres
				payantes proposées sur la plateforme Fyn, qu'il s'agisse des packs de coaching destinés aux
				étudiants ou des abonnements recruteurs destinés aux entreprises. Elles complètent les CGU
				et prévalent sur elles en cas de contradiction sur les aspects commerciaux.
			</p>
		</blockquote>

		<article>
			<h3>Article 1 : Objet</h3>
			<p>
				Les présentes CGV définissent les conditions dans lesquelles Fyn SAS (ci-après « Fyn »),
				dont le siège social est situé à {FYN_INFO.adresse}, immatriculée au RCS de {FYN_INFO.villeRcs}
				sous le numéro {FYN_INFO.siret}, propose et commercialise :
			</p>
			<ul>
				<li>
					Des packs de coaching personnalisé à destination des étudiants en recherche d'alternance
					ou de stage ;
				</li>
				<li>
					Des abonnements mensuels à destination des entreprises recrutant des alternants ou des
					stagiaires.
				</li>
			</ul>
		</article>

		<article>
			<h3>Article 2 : Offres et tarifs Étudiants</h3>

			<h4>2.1 Nature des offres étudiants</h4>
			<p>
				Fyn propose aux étudiants des séances de coaching individuel animées par des coachs humains
				qualifiés. Ces séances sont distinctes de l'accès gratuit à la plateforme et constituent un
				service complémentaire à valeur ajoutée.
			</p>

			<h4>2.2 Tableau des offres étudiants</h4>
			<div class="table-responsive">
				<table>
					<thead>
						<tr>
							<th>Fonctionnalité incluse</th>
							<th>Coaching 1:1<br /><span class="price">29 € TTC</span></th>
							<th>Pack Booster<br /><span class="price">69 € TTC*</span></th>
							<th>Pack Intensif<br /><span class="price">109 € TTC*</span></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Nombre de séances (45 min)</td>
							<td>1 séance</td>
							<td>3 séances</td>
							<td>5 séances + bilan</td>
						</tr>
						<tr>
							<td>Relecture CV / lettre de motivation</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Simulation entretien + debriefing</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Compte-rendu écrit post-séance</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Suivi entre séances via messagerie</td>
							<td class="icon-cross">✗</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Accès prioritaire aux créneaux</td>
							<td class="icon-cross">✗</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Suivi continu jusqu'à la signature</td>
							<td class="icon-cross">✗</td>
							<td class="icon-cross">✗</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Templates CV + scripts de relance</td>
							<td class="icon-cross">✗</td>
							<td class="icon-cross">✗</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Réduction vs séances à l'unité</td>
							<td>N/A</td>
							<td>-21 % (au lieu de 87 €)</td>
							<td>-24 % (au lieu de 145 €)</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="table-legend">
				* Tarifs TTC. Les packs Booster et Intensif sont proposés à tarif réduit par rapport aux
				séances achetées individuellement.
			</p>

			<h4>2.3 Détail des offres</h4>
			<ul>
				<li>
					<strong>Coaching 1:1 (29 € TTC) :</strong> une séance unique de 45 minutes avec un coach humain
					sur le thème choisi par l'étudiant (relecture CV, lettre de motivation, simulation d'entretien,
					conseils personnalisés). Un compte-rendu écrit avec les points d'action est remis à l'issue
					de la séance.
				</li>
				<li>
					<strong>Pack Booster (69 € TTC) :</strong> trois séances à thèmes libres incluant tous les avantages
					du Coaching 1:1, un suivi entre les séances via messagerie et un accès prioritaire aux créneaux
					disponibles. Réduction de 21 % par rapport à l'unité.
				</li>
				<li>
					<strong>Pack Intensif (109 € TTC) :</strong> cinq séances avec un bilan de mi-parcours, un suivi
					continu jusqu'à la signature du contrat et un accès à des ressources exclusives (templates CV,
					scripts de relance). Réduction de 24 % par rapport à l'unité.
				</li>
			</ul>
		</article>

		<article>
			<h3>Article 3 : Offres et tarifs Entreprises</h3>

			<h4>3.1 Nature des abonnements entreprises</h4>
			<p>
				Fyn propose aux recruteurs trois niveaux d'abonnement permettant d'accéder aux
				fonctionnalités de publication et de gestion d'offres d'alternance et de stages. L'offre
				Starter Pack est gratuite et sans engagement. Les offres Professionnel et Enterprise sont
				des abonnements mensuels payants.
			</p>

			<h4>3.2 Tableau des offres entreprises</h4>
			<div class="table-responsive">
				<table>
					<thead>
						<tr>
							<th>Fonctionnalité incluse</th>
							<th>Starter Pack<br /><span class="price">Gratuit</span></th>
							<th>Professionnel<br /><span class="price">89 €/mois HT</span></th>
							<th>Enterprise<br /><span class="price">490 €/mois HT</span></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Offres actives simultanées</td>
							<td>1 offre</td>
							<td>Jusqu'à 3 offres</td>
							<td>Illimitées</td>
						</tr>
						<tr>
							<td>Dashboard recruteur</td>
							<td>Basique</td>
							<td>Avancé + stats</td>
							<td>Avancé + stats</td>
						</tr>
						<tr>
							<td>Matching automatique profils étudiants</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Notifications nouvelles candidatures</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Mise en avant d'offres (sponsorisation)</td>
							<td class="icon-cross">✗</td>
							<td>2 offres/mois</td>
							<td>Illimitées</td>
						</tr>
						<tr>
							<td>Accès CVthèque filtrée (niveau, formation, dispo)</td>
							<td class="icon-cross">✗</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Statistiques avancées (vues, candidatures…)</td>
							<td class="icon-cross">✗</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Support prioritaire par email</td>
							<td class="icon-cross">✗</td>
							<td class="icon-check">✓</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Account manager dédié + chasse de profils</td>
							<td class="icon-cross">✗</td>
							<td class="icon-cross">✗</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Accès API + intégration ATS</td>
							<td class="icon-cross">✗</td>
							<td class="icon-cross">✗</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Reporting personnalisé</td>
							<td class="icon-cross">✗</td>
							<td class="icon-cross">✗</td>
							<td class="icon-check">✓</td>
						</tr>
						<tr>
							<td>Réduction parrainage</td>
							<td class="icon-cross">✗</td>
							<td>Disponible (non auto)</td>
							<td>Automatique</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="table-legend">
				Tous les tarifs sont indiqués en euros hors taxes (HT). La TVA applicable au taux en vigueur
				est ajoutée à la facturation.
			</p>

			<h4>3.3 Détail des offres</h4>
			<ul>
				<li>
					<strong>Starter Pack Gratuit :</strong> permet la publication d'une (1) offre active simultanément,
					avec accès au tableau de bord basique, au matching automatique avec les profils étudiants et
					aux notifications de nouvelles candidatures. Ne nécessite aucun moyen de paiement.
				</li>
				<li>
					<strong>Professionnel (89 € HT/mois) :</strong> jusqu'à 3 offres actives simultanées, mise en
					avant de 2 offres par mois, accès complet à la CVthèque filtrée (niveau d'études, formation,
					disponibilité), tableau de bord avancé avec statistiques et support prioritaire par email. L'account
					manager dédié et le sourcing actif de profils rares ne sont pas inclus. La réduction parrainage
					est disponible mais non automatique.
				</li>
				<li>
					<strong>Enterprise (490 € HT/mois) :</strong> offres illimitées, account manager dédié avec
					chasse de profils et approche directe, mises en avant illimitées, accès API et intégration ATS,
					reporting personnalisé et réduction parrainage automatique. Aucun frais de placement additionnel.
				</li>
			</ul>
		</article>

		<article>
			<h3>Article 4 : Souscription et activation</h3>

			<h4>4.1 Packs coaching étudiants</h4>
			<p>
				La souscription à un pack coaching s'effectue depuis l'espace étudiant, rubrique « Coaching
				». Elle implique le choix du pack, la saisie d'un moyen de paiement valide et l'acceptation
				des présentes CGV. Le pack est activé immédiatement après validation du paiement. Une
				confirmation et un lien de prise de rendez-vous sont envoyés par email.
			</p>

			<h4>4.2 Abonnements entreprises</h4>
			<p>
				La souscription à un abonnement payant s'effectue depuis le dashboard recruteur, rubrique «
				Mon abonnement ». Elle implique la saisie d'un moyen de paiement valide et l'acceptation des
				présentes CGV. L'abonnement prend effet immédiatement à la validation du paiement. Une
				confirmation est adressée par email.
			</p>
		</article>

		<article>
			<h3>Article 5 : Facturation et paiement</h3>

			<h4>5.1 Packs coaching étudiants</h4>
			<p>
				Les packs coaching font l'objet d'un paiement unique au moment de la souscription. Une
				facture au format PDF est transmise par email à la date d'achat.
			</p>

			<h4>5.2 Abonnements entreprises</h4>
			<p>
				La facturation des abonnements entreprises est mensuelle, à la date anniversaire de la
				souscription. Une facture PDF est automatiquement transmise par email à chaque
				renouvellement.
			</p>

			<h4>5.3 Modes de paiement acceptés</h4>
			<ul>
				<li>
					<strong>Carte bancaire (Visa, Mastercard, American Express) :</strong> débit immédiat pour les
					packs étudiants, débit automatique mensuel pour les abonnements Entreprises ;
				</li>
				<li>
					<strong>Prélèvement SEPA :</strong> sur accord préalable pour l'offre Enterprise ;
				</li>
				<li>
					<strong>Virement bancaire :</strong> uniquement pour les partenariats institutionnels sur devis.
				</li>
			</ul>

			<h4>5.4 Défaut de paiement</h4>
			<p>
				En cas d'échec de paiement sur un abonnement entreprise, Fyn procède à deux nouvelles
				tentatives à 3 jours d'intervalle. Après le deuxième échec, l'abonnement est rétrogradé vers
				le Starter Pack gratuit et les fonctionnalités payantes sont désactivées. Les données sont
				conservées 30 jours pour permettre la régularisation de la situation.
			</p>
		</article>

		<article>
			<h3>Article 6 : Durée, renouvellement et résiliation</h3>

			<h4>6.1 Packs coaching étudiants</h4>
			<p>
				Les packs coaching sont valables 6 mois à compter de la date d'achat. Les séances non
				utilisées dans ce délai sont perdues, sans remboursement possible. La prise de rendez-vous
				s'effectue via le calendrier en ligne accessible depuis l'espace coaching.
			</p>

			<h4>6.2 Abonnements entreprises</h4>
			<p>
				Les abonnements Professionnel et Enterprise sont souscrits sans engagement de durée
				minimale. Ils sont renouvelés automatiquement chaque mois à la date anniversaire, sauf
				résiliation préalable effectuée depuis le dashboard recruteur, rubrique « Mon abonnement »
				&gt; « Résilier mon abonnement ». La résiliation prend effet à la fin de la période
				mensuelle en cours. Aucun remboursement au prorata n'est accordé pour la période entamée.
			</p>

			<h4>6.3 Résiliation par Fyn</h4>
			<p>
				Fyn se réserve le droit de résilier un abonnement payant sans remboursement en cas de
				violation grave des CGU, notamment en cas de publication de fausses offres, comportement
				frauduleux ou non-respect de la réglementation applicable.
			</p>
		</article>

		<article>
			<h3>Article 7 : Droit de rétractation</h3>

			<h4>7.1 Packs coaching étudiants</h4>
			<p>
				L'étudiant bénéficie d'un droit de rétractation de 14 jours calendaires à compter de
				l'achat, à condition qu'aucune séance n'ait été réalisée. Si une séance a été réalisée ou
				planifiée mais non annulée par l’étudiant dans ce délai, le droit de rétractation est perdu
				pour cette séance.
			</p>

			<h4>7.2 Abonnements entreprises</h4>
			<p>
				Conformément à l'article L. 221-18 du Code de la consommation, le recruteur bénéficie d'un
				droit de rétractation de 14 jours calendaires à compter de la souscription, à condition
				qu'il n'ait pas commencé à utiliser les fonctionnalités payantes de son abonnement.
			</p>

			<h4>7.3 Exercice du droit de rétractation</h4>
			<p>
				Pour exercer ce droit, il convient d'adresser une notification claire par email à <a
					href="mailto:billing@fyn.fr">billing@fyn.fr</a
				>, en précisant le nom, le numéro de compte et la date de souscription. Le remboursement est
				effectué dans les 14 jours suivant la réception de la demande, par le même moyen de paiement
				qu'à la souscription.
			</p>
		</article>

		<article>
			<h3>Article 8 : Modifications tarifaires</h3>
			<p>
				Fyn se réserve le droit de modifier ses tarifs à tout moment. Toute modification sera
				communiquée aux abonnés actifs par email avec un préavis minimum de 30 jours calendaires. En
				cas de refus du nouveau tarif, l'utilisateur peut résilier son abonnement ou annuler son
				prochain renouvellement sans frais avant la date d'entrée en vigueur. La poursuite de
				l'utilisation après la date d'effet vaut acceptation du nouveau tarif.
			</p>
		</article>

		<article>
			<h3>Article 9 : Parrainage et réductions</h3>
			<p>
				Un programme de parrainage est disponible pour les abonnements entreprises. Les conditions
				et avantages de ce programme sont détaillés dans la rubrique « Parrainage » du dashboard
				recruteur. La réduction parrainage est automatique pour l'offre Enterprise et disponible sur
				demande pour l'offre Professionnel.
			</p>
			<p>
				Des offres promotionnelles ponctuelles peuvent être proposées aux étudiants et aux
				entreprises, notamment lors du lancement de la plateforme ou de périodes de forte demande
				(rentrée de septembre, janvier). Ces promotions ne sont pas cumulables entre elles, sauf
				mention contraire explicite.
			</p>
		</article>

		<article>
			<h3>Article 10 : Garantie de service</h3>
			<p>
				Fyn s'engage à maintenir une disponibilité de la plateforme de 99,9 % (SLA) sur une base
				mensuelle, hors maintenances planifiées notifiées 48h à l'avance. Pour les abonnements
				Enterprise, tout incident majeur fait l'objet d'un rapport d'incident transmis dans les 24
				heures.
			</p>
			<p>
				En cas de défaillance prolongée imputable à Fyn au-delà du seuil de disponibilité, un avoir
				proportionnel à la durée d'indisponibilité pourra être accordé sur demande auprès de <a
					href="mailto:support@fyn.fr">support@fyn.fr</a
				>.
			</p>
		</article>

		<article>
			<h3>Article 11 : Données, confidentialité et propriété</h3>
			<p>
				Les données collectées dans le cadre des abonnements (facturation, usage de la plateforme)
				sont conservées pendant la durée légale applicable (5 ans pour les données comptables). Fyn
				s'engage à ne jamais revendre les données personnelles des candidats ou des recruteurs à des
				tiers à des fins commerciales.
			</p>
			<p>
				Les CVs, lettres de motivation et profils étudiants collectés via la plateforme restent la
				propriété exclusive des étudiants concernés. Ils ne peuvent être utilisés par les recruteurs
				qu'à des fins de recrutement directement liées aux offres publiées sur Fyn.
			</p>
		</article>

		<article>
			<h3>Article 12 : Droit applicable, médiation et juridiction</h3>
			<p>
				Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'engagent
				à rechercher une solution amiable dans un délai de 30 jours. À défaut d'accord, pour les
				consommateurs (étudiants), le litige pourra être soumis au médiateur de la consommation
				compétent. Pour les professionnels (entreprises), les tribunaux compétents du ressort du
				siège social de Fyn SAS seront seuls compétents.
			</p>
		</article>

		<footer class="contact-box B2B">
			<h4>Contacts utiles :</h4>
			<ul>
				<li>
					<strong>Facturation &amp; abonnements :</strong>
					<a href="mailto:billing@fyn.fr">billing@fyn.fr</a>
				</li>
				<li>
					<strong>Coaching étudiants :</strong>
					<a href="mailto:coaching@fyn.fr">coaching@fyn.fr</a>
				</li>
				<li>
					<strong>Partenariats entreprises :</strong>
					<a href="mailto:partenariats@fyn.fr">partenariats@fyn.fr</a>
				</li>
			</ul>
			<p class="company-footer">Fyn SAS - {FYN_INFO.adresse} – SIRET : {FYN_INFO.siret}</p>
		</footer>
	</section>
</article>
