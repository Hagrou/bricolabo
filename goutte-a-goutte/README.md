# Goutte à goutte

*Comprendre le cycle de l'eau en aménageant un territoire*

Un jeu de simulation vu de dessus pour comprendre le cycle de l'eau et ses enjeux. Le joueur aménage un bassin versant (forêts, prairies, cultures, ville, barrages, haies, pompes) et observe ce que chaque choix change pour les crues, la rivière en été, la nappe, la qualité de l'eau et la pluie elle-même.

Public visé : tout public. Aucune connaissance préalable n'est nécessaire.

## Lancer le jeu

Ouvrez `goutte-a-goutte.html` dans un navigateur récent (Chrome, Firefox, Safari, Edge). Il n'y a rien à installer.

- Le fichier est autonome : tout le jeu tient dedans.
- Il fonctionne hors connexion. Seules les polices d'écriture sont chargées depuis Internet ; sans connexion, le navigateur utilise ses polices par défaut.
- Les missions réussies sont mémorisées dans le navigateur de l'appareil, pas ailleurs.
- Il s'adapte au téléphone, mais une souris et un grand écran sont plus confortables pour peindre la carte.

## Comment on joue

Au premier lancement, un **tutoriel** de 13 pages s'ouvre. Les six premières présentent les notions de base avec un schéma chacune : le cycle de l'eau, infiltrer ou ruisseler, le bassin versant, la nappe qui fait couler la rivière en été, la lecture de l'hydrogramme. Les suivantes font la visite de l'écran en surlignant chaque zone : la fiche de mission, les outils, la carte 3D, la légende, le lancement, les vues. On le retrouve à tout moment avec le bouton « Tutoriel ».


L'écran montre une vallée de 11 km sur 7, découpée en cases de 250 m, qui descend vers la mer.

La carte s'affiche par défaut en **3D isométrique** : chaque terrain y est dessiné par ce qu'on y voit (arbres, prairie fleurie, sillons, sol caillouteux, maisons, roseaux et mares). Avec l'outil « Sonder », on fait glisser pour tourner autour du terrain et changer l'inclinaison ; la molette ou le pincement zooment, le clic droit ou Maj + glisser déplacent la vue. Les boutons ⟲ ⟳ tournent d'un huitième de tour. Le relief est exagéré pour rester lisible. La vue « Plan », vue de dessus, reste disponible pour peindre case par case.

Une mission se déroule toujours de la même façon :

1. **Lire l'enjeu** et les objectifs dans la fiche de mission.
2. **Aménager** la carte, dans la limite du budget. Tous les aménagements sont disponibles dans toutes les missions ; c'est le budget et les objectifs qui obligent à choisir.
3. **Lancer la simulation.** La météo imposée se déroule ; on ne peut plus modifier la carte.
4. **Lire le verdict.** Chaque objectif est comparé à une « référence » : la même météo sur le même terrain, sans aucun aménagement. En cas de réussite, un court texte résume ce qu'il faut retenir.
5. **Réessayer** autant de fois qu'on veut. La courbe de l'essai précédent reste affichée pour comparer.

Si l'on bloque, le bouton **Solution** de la fiche de mission donne une stratégie qui réussit, avec l'explication de pourquoi elle marche et de ce qui marcherait moins bien. Le bouton « Appliquer cette solution sur la carte » la pose directement ; il ne reste qu'à lancer la simulation pour la voir à l'œuvre.

Le **bac à sable** donne tous les outils sans budget ni objectif, avec une météo au choix (manuelle, tempérée, sèche, orageuse, ou cycle fermé).

### Les instruments

| Instrument | Ce qu'il montre |
|---|---|
| Légende des terrains | Sous la carte : une fiche par terrain avec son dessin, son rôle en une phrase et cinq barres comparatives (absorbe la pluie, garde l'eau dans le sol, freine l'écoulement, rend l'eau au ciel, salit l'eau). Un clic sur une fiche prend ce terrain comme outil. Suivent les aménagements et repères (rivière, mer, haies, fossés, barrage, remblai, creux, pompe, captage, ville inondée, culture assoiffée) |
| Carte « Terrain et eau » | Occupation du sol, relief, eau en surface, ville inondée, cultures en manque d'eau |
| Carte « Humidité du sol » | Remplissage de la réserve du sol, du sec au saturé |
| Carte « Nappe » | Profondeur de la nappe sous la surface |
| Carte « Vitesse » | Vitesse de l'eau case par case, avec des traceurs emportés par le courant |
| Carte « Qualité » | Charge polluante de l'eau, et position du captage d'eau potable |
| Hydrogramme | Pluie et débit de la rivière à son arrivée en mer, avec la référence |
| Bilan | Part de la pluie évaporée, partie en mer ou stockée ; répartition entre surface, sol et nappe |
| Sonde | État détaillé de la case survolée |
| Schéma du cycle | En cycle fermé : jauge de l'atmosphère et flux entre mer, ciel et terres |

### Les aménagements

| Outil | Effet principal | Contrepartie |
|---|---|---|
| Forêt | Infiltre vite, freine le ruissellement | Transpire beaucoup, coûte cher |
| Prairie | Bonne infiltration, peu coûteuse | Moins efficace que la forêt par case |
| Cultures | Ce qu'il faut protéger de la sécheresse | Sol tassé, source de pollution |
| Sol nu | Aucun | Ruissellement rapide, érosion |
| Ville | Ce qu'il faut protéger des crues | Imperméable, renvoie tout vers l'aval |
| Zone humide | Retient et épure l'eau | Forte évaporation |
| Barrage plein | Posé d'un clic dans une vallée, il s'oriente tout seul en travers de l'écoulement, d'un versant à l'autre, avec une crête de niveau (2, 4 ou 6 m) ; l'aperçu montre son tracé, le sens de l'eau et la zone noyée. Il retient tout jusqu'à déborder | Noie les terres derrière lui, coupe la rivière pendant qu'il se remplit, s'évapore ; refusé s'il ne s'appuie pas sur deux versants |
| Barrage écrêteur | Même pose, avec un pertuis à sa base qui laisse passer jusqu'à 30 m³/s : la retenue ne se remplit qu'en crue, puis se vide | Doit être plus haut qu'un barrage plein pour la même crue ; 10 crédits de plus |
| Remblai (+2 m) | Rehausse les cases peintes, pour une levée le long d'une rive | Renvoie l'eau ailleurs |
| Creuser (−2 m) | Recueille le ruissellement, peut atteindre la nappe | S'évapore |
| Haies et méandres | Freine l'eau sans changer le sol | Une rivière plus lente monte plus haut |
| Fossés et lit rectifié | Accélère l'eau (bac à sable) | Concentre la crue à l'aval |
| Pompe | Irrigue les cultures à 3 cases à la ronde | Prend à la rivière ou à la nappe |

## Les neuf missions

Elles sont ordonnées pour introduire une idée à la fois.

| # | Mission | Notion | Météo imposée | Objectifs |
|---|---|---|---|---|
| 1 | Premier orage | Ruissellement et infiltration | 3 jours, orage de 80 mm | Pic de crue −30 %, 40 % de pluie infiltrée en plus |
| 2 | La course de l'eau | Vitesse d'écoulement | 3 jours, orage de 100 mm | Pic −20 %, crue retardée d'1 h, ville au sec, 95 % de la récolte gardée |
| 3 | La ville s'étend | Imperméabilisation | 3 jours, orage de 100 mm | 60 cases de ville en plus, ville au sec, pic +5 % au plus |
| 4 | Quand le sol est plein | Crue sur sol saturé | 4 jours, 150 mm puis orage de 110 mm | Ville au sec, pic −15 % |
| 5 | L'eau qui emporte | Qualité de l'eau | 5 jours, trois pluies | Pollution en mer −50 %, pointe au captage −45 %, 85 % des cultures gardées |
| 6 | La rivière en été | Nappe et étiage | 34 jours : hiver pluvieux puis été sec | Débit d'été +15 % |
| 7 | Partager l'eau | Irrigation et débit réservé | Idem | Manque d'eau des cultures −45 %, 60 % du débit d'été gardé, 90 % des cultures gardées |
| 8 | D'où vient la pluie | Boucle complète du cycle | 45 jours, pluie produite par l'évaporation | Évaporation des terres +12 %, manque d'eau −40 %, 90 % des cultures gardées, aucune pompe |
| 9 | Un territoire, quatre saisons | Tout concilier | 34 jours avec orage puis été sec | Ville au sec, pic −15 %, manque d'eau −40 %, 50 % du débit d'été, 80 % des cultures |

Ce que chaque mission cherche à faire comprendre :

1. Une même pluie ne fait pas la même crue : le sol décide du partage entre infiltration et ruissellement, et l'endroit où l'on replante compte.
2. À volume égal, plus l'eau va vite, plus elle arrive groupée. La freiner l'étale, mais une rivière ralentie monte plus haut, et chaque haie prend un peu de surface au champ.
3. Bâtir déplace l'eau vers l'aval. On peut compenser, mais pas construire n'importe où.
4. L'infiltration a une limite. Sur sol saturé il faut du volume pour retenir la crue, au bon endroit.
5. L'eau garde la trace de ce qu'elle a traversé. Une bande de végétation entre le champ et la rivière protège beaucoup pour peu de surface.
6. La rivière d'été est faite de la pluie d'hiver infiltrée.
7. Rivière et nappe sont le même réservoir : pomper dans l'une fait baisser l'autre.
8. L'eau ne se perd pas, elle tourne. Une région végétalisée renvoie vers le ciel une partie de sa pluie.
9. Il n'y a pas d'aménagement miracle : tout se joue sur le même stock, d'une saison à l'autre et de l'amont à l'aval.

## Le modèle

La simulation avance par pas de 10 minutes sur une grille de 44 × 28 cases de terre. Chaque case porte trois stocks d'eau, en millimètres : la lame d'eau en surface, la réserve du sol et la nappe.

À chaque pas, dans l'ordre :

1. **Pluie.** Uniforme sur le bassin.
2. **Infiltration.** L'eau de surface entre dans le sol à une vitesse qui dépend de l'occupation et diminue quand le sol se remplit. Ce qui dépasse reste en surface.
3. **Drainage du sol vers la nappe**, dès que le sol est rempli à plus de la moitié.
4. **Évaporation et transpiration.** L'eau de surface s'évapore ; les plantes puisent dans le sol selon leur coefficient et l'humidité disponible.
5. **Pompage**, s'il y a des pompes : eau de surface d'abord, nappe ensuite.
6. **Nappe.** Elle s'écoule lentement vers les points bas. Le lit de la rivière la draine : c'est ce qui fait couler la rivière sans pluie.
7. **Écoulement de surface.** L'eau descend vers les cases voisines plus basses, à une vitesse donnée par la formule de Manning (rugosité, pente, épaisseur de la lame d'eau). Quatre sous-pas par pas de temps.
8. **Qualité.** Le ruissellement produit sur une case se charge selon l'occupation, voyage avec l'eau, et se décharge en s'infiltrant ou en traversant de la végétation.
9. **Récolte.** Chaque case cultivée rapporte une part. Une haie dans le champ en retire un dixième, mais chaque champ voisin d'une haie gagne 5 % (8 % s'il touche deux haies ou plus) : abri du vent, sol protégé, insectes utiles ; un champ resté sous l'eau perd jusqu'à 60 % (au bout d'un jour), un champ assoiffé jusqu'à 70 % (au bout de dix jours).
10. **Atmosphère**, en cycle fermé : elle reçoit l'évaporation de la mer et la moitié de celle des terres ; il pleut quand elle atteint 30 mm.

### Paramètres par occupation du sol

| Occupation | Infiltration max (mm/h) | Réserve du sol (mm) | Rugosité n | Transpiration | Charge du ruissellement | Rétention par pas |
|---|---|---|---|---|---|---|
| Forêt | 40 | 200 | 0,40 | × 1,0 | 2 | 3 % |
| Prairie | 25 | 150 | 0,15 | × 0,8 | 5 | 3 % |
| Cultures | 12 | 130 | 0,08 | × 0,9 | 100 | 0 |
| Sol nu | 4 | 100 | 0,04 | × 0,3 | 60 | 0 |
| Ville | 1 | 30 | 0,015 | × 0,1 | 40 | 0 |
| Zone humide | 15 | 250 | 0,50 | × 1,1 | 0 | 8 % |

Autres réglages : lit de la rivière n = 0,04 (0,12 avec méandres, 0,02 rectifié) ; haie n ≥ 0,35 et 4 % de rétention de pollution ; nappe de 600 mm au plus, à 15 m de profondeur quand elle est vide ; ville inondée au-delà de 150 mm d'eau ; culture en manque d'eau sous 25 % de réserve.

Ces valeurs sont des ordres de grandeur choisis pour que les mécanismes se voient à l'écran. Elles ne sont calées sur aucun terrain réel.

## La démarche

Le jeu a été construit par étapes, à partir de demandes successives.

1. **Prototype.** Demande de départ : un jeu fin sur le cycle de l'eau (réserves, ruissellement, absorption, vitesse d'écoulement, évaporation), pédagogique, vu de dessus comme *Civilization*, avec un terrain aménageable. Premier jet : carte en cases, simulation des trois stocks, outils d'aménagement, hydrogramme, bilan et sonde.
2. **Missions.** Pour un public large et l'objectif de faire comprendre les enjeux, ajout de missions à difficulté croissante. Choix structurant : chaque objectif est relatif à une situation de référence calculée automatiquement, ce qui rend la mission compréhensible (« 30 % de mieux que sans rien faire ») et robuste aux réglages du modèle.
3. **Refonte du moteur.** Les premiers tests ont montré que le modèle initial ne permettait pas des missions jouables. Corrections successives :
   - cases de 250 m au lieu de 100 m, pour que la rivière ait une profondeur crédible ;
   - un lit de rivière continu au creux d'un fond de vallée en V, pour que l'eau se concentre au lieu de s'étaler ;
   - un lit plus rapide que les versants, pour que l'eau de l'amont arrive pendant le pic et qu'une digue ait un effet ;
   - une nappe plus profonde et plus réactive, drainée par le lit, pour que la rivière coule en été et réponde à la recharge et aux pompages ;
   - un drainage du sol plus lent, pour que de longues pluies saturent réellement les sols.
4. **Vitesse d'écoulement.** Ajout d'une vue Vitesse avec traceurs, de deux aménagements qui freinent ou accélèrent sans toucher au sol, et d'une mission dédiée. Le retard de la crue est mesuré par le moment où la moitié de son volume est passée, car l'heure du pic bouge peu dans ce modèle.
5. **Inventaire des manques.** Revue de ce que le jeu ne montrait pas. Deux manques retenus comme prioritaires : la qualité de l'eau et la fermeture de la boucle.
6. **Qualité et boucle fermée.** Ajout d'une charge polluante transportée par l'eau, d'un captage d'eau potable, d'une atmosphère qui produit la pluie, et de deux missions.
7. **Vue 3D et légende.** Les types de terrain étaient difficiles à distinguer sur la carte à plat. Ajout d'une vue 3D isométrique orientable, dessinée sans bibliothèque extérieure pour que le fichier reste autonome, où chaque terrain est représenté par des objets reconnaissables, et d'une légende illustrée qui compare les caractéristiques des terrains.
8. **Tous les outils partout, et la récolte.** Chaque mission donne accès à tous les aménagements. Pour garder le sens de chaque mission, deux objectifs ont été ajoutés là où un raccourci devenait possible : la mission 1 demande aussi de faire entrer plus de pluie dans le sol (sinon une simple digue suffisait), la mission 8 interdit les pompes (elle porte sur la pluie, pas sur l'irrigation). Une récolte calculée rend visible l'effet des haies et des inondations sur l'agriculture : une haie prend un peu de surface au champ mais abrite ses voisins, si bien que quelques haies bien réparties augmentent la récolte et qu'une plaine couverte de haies la réduit. La mission 2 demande d'en garder 95 %.
9. **Tutoriel.** Un tutoriel intégré présente les notions de base avec des schémas, puis fait la visite guidée de l'écran.
10. **Barrages orientés.** La première « digue » rehaussait les cases une à une : on ne voyait pas dans quel sens l'eau arrivait et la crête n'était pas de niveau. Elle est remplacée par un outil Barrage posé d'un clic, qui calcule lui-même la direction de la pente, barre la vallée d'un versant à l'autre et affiche avant la pose la zone qui sera noyée. Le rehaussement case par case reste disponible sous le nom de Remblai, pour les levées le long d'une rive.
11. **Barrage écrêteur et solutions.** Ajout d'un barrage écrêteur, dont le pertuis laisse passer le débit normal : en mission 9, il évapore une quinzaine de fois moins d'eau qu'un barrage plein et garde un meilleur débit d'été, mais il doit être plus haut pour arrêter la même crue. Chaque mission a désormais un bouton « Solution » avec une stratégie expliquée, applicable d'un clic. Les neuf solutions ont été vérifiées par calcul puis jouées dans un navigateur de test : toutes réussissent leur mission dans le budget.

### Comment les missions ont été vérifiées

- **Par calcul, hors écran.** Pour chaque mission, le moteur a été lancé sur la référence et sur plusieurs stratégies (une soixantaine au total). Les seuils ont été réglés pour que ne rien faire échoue, qu'au moins une stratégie raisonnable réussisse, et que des stratégies naïves échouent.
- **À la souris, dans un navigateur de test.** Missions 1, 2, 4, 5, 7 et 8 jouées du début au verdict. Réussite obtenue sur les missions 2, 4 et 5 ; échecs attendus sur les missions 1 et 7 (aménagement volontairement insuffisant) ; échec sur la mission 8 parce que l'essai automatisé recouvrait des cultures.
- **Non fait.** Les missions 3, 6 et 9 n'ont pas été jouées à la souris. Aucun joueur réel n'a encore testé le jeu : la difficulté et la clarté des consignes restent à éprouver.

Exemples de résultats obtenus par calcul :

| Mission | Stratégie | Résultat |
|---|---|---|
| 1 | Forêt sur 230 cases en bas de versant | Pic de 126 à 49 m³/s : réussi |
| 1 | Forêt sur 230 cases en haut de versant | Pic de 126 à 110 m³/s : échec |
| 2 | Haies sur deux cases de chaque côté de la rivière | Pic de 121 à 71 m³/s, crue retardée de plus de 2 h : réussi |
| 2 | Méandres dans la rivière devant la ville seulement | Ville inondée sur 6 cases au lieu de 3 : échec |
| 4 | Barrage de 4 m juste en amont de la ville (65 crédits) | Pic de 136 à 104 m³/s, ville au sec : réussi |
| 4 | Remblai le long de la ville | Pic à 125 m³/s, ville encore inondée : échec |
| 5 | Zone humide sur une case de chaque côté de la rivière | Pollution en mer de 99 à 35 tonnes : réussi |
| 5 | 85 cases de prairie au milieu de la plaine | Pollution en mer de 99 à 89 tonnes : échec |
| 7 | 8 pompes en nappe à 8 cases de la rivière | Manque d'eau −53 %, 65 % du débit d'été gardé : réussi |
| 7 | 8 pompes dans la rivière | 41 % du débit d'été gardé : échec |

## Limites à connaître

Ce que le jeu simplifie au point de pouvoir induire en erreur :

- **Les barrages** sont de deux sortes seulement : plein (il retient tout jusqu'à déborder) ou écrêteur (pertuis fixe de 30 m³/s). Il n'y a pas de vanne manœuvrable.
- **La nappe** réagit en quelques semaines. Une vraie nappe est souvent bien plus lente.
- **Forêt contre prairie.** Dans les missions 6 et 8, la prairie fait mieux que la forêt à budget égal, parce qu'elle coûte trois fois moins cher. C'est un effet des réglages, pas une règle générale.
- **La pollution** est un indice sans unité réelle : les « mg/L » et les tonnes sont des valeurs de jeu. Les nitrates qui descendent vers la nappe ne sont pas simulés.
- **Le recyclage de la pluie** est grossi. La moitié de l'évaporation des terres retombe sur place, ce qui est plausible pour une grande région, pas pour un bassin de 11 km.
- **La pluie** tombe partout pareil.

Ce que le jeu ne montre pas du tout : l'eau potable et les rejets de la ville, l'érosion et l'envasement, l'interception de la pluie par le feuillage, la neige, les milieux vivants que protège le débit minimal, les sécheresses sur plusieurs années et le changement climatique.

## Pistes pour la suite

- Faire jouer de vrais joueurs et ajuster la difficulté et les consignes.
- Rééquilibrer le coût de la forêt et de la prairie.
- Donner aux barrages une vanne qu'on peut ouvrir ou fermer pendant la simulation.
- Ajouter la ville comme usager : eau potable, rejets, station d'épuration.
- Ajouter une mission sur plusieurs années avec un climat qui change.

## Fichiers

| Fichier | Rôle |
|---|---|
| `goutte-a-goutte.html` | Le jeu, autonome, à ouvrir dans un navigateur |
| `README.md` | Ce document |
| `sources/sim.js` | Moteur de simulation et définition des missions |
| `sources/template.html` | Interface : mise en page, carte 2D et 3D, légende, panneaux, outils |
| `sources/build.py` | Assemble `sim.js` et `template.html` en un seul fichier |
| `sources/test.js` | Banc de test hors écran : référence et stratégies par mission |
| `sources/soltest.js` | Vérifie que la solution de chaque mission réussit dans le budget |

Pour modifier le jeu : éditer `sim.js` (modèle, missions, seuils) ou `template.html` (interface), lancer `node test.js` pour vérifier que les missions restent gagnables (`node test.js m1` pour une seule), puis `python3 build.py` pour régénérer le fichier du jeu. Il faut Node.js et Python 3 ; aucune autre dépendance.
