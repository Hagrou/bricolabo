# Goutte à goutte

*Comprendre le cycle de l'eau en aménageant un territoire*

Un jeu de simulation vu de dessus pour comprendre le cycle de l'eau et ses enjeux. Le joueur aménage un bassin versant (forêts, prairies, cultures, ville, barrages, haies, pompes) et observe ce que chaque choix change pour les crues, la rivière en été, la nappe, la qualité de l'eau et la pluie elle-même.

Public visé : tout public. Aucune connaissance préalable n'est nécessaire.

> **Un outil pédagogique, pas un outil scientifique.** Goutte à goutte sert à comprendre comment l'eau circule dans un territoire et à discuter des choix d'aménagement. Ses chiffres sont des ordres de grandeur sur une vallée inventée, sans données mesurées ni calage : ils ne prédisent rien sur un bassin réel et ne doivent pas servir d'argument chiffré pour ou contre un projet. La page « Jeu ou réalité ? » du jeu, et la section [Limites à connaître](#limites-à-connaître) ci-dessous, détaillent les différences avec une vraie simulation hydrologique.

## Lancer le jeu

Ouvrez [goutte-a-goutte.html](https://hagrou.github.io/bricolabo/goutte-a-goutte/goutte-a-goutte.html) dans un navigateur récent (Chrome, Firefox, Safari, Edge). Il n'y a rien à installer.

- Le fichier est autonome : tout le jeu tient dedans.
- Il fonctionne hors connexion. Seules les polices d'écriture sont chargées depuis Internet ; sans connexion, le navigateur utilise ses polices par défaut.
- Les missions réussies sont mémorisées dans le navigateur de l'appareil, pas ailleurs.
- Il s'adapte au téléphone, mais une souris et un grand écran sont plus confortables pour peindre la carte.

## Comment on joue

Le bouton **☰**, en haut à gauche, ouvre le menu : la liste des missions avec la progression, le bac à sable, la légende des terrains, « Ce que montrent les vues », le tutoriel et la page « Jeu ou réalité ? ». La page **« Jeu ou réalité ? »** explique que l'objectif est pédagogique, ce qui est solide dans le modèle, et les différences notables avec une simulation réelle : données, calage, temps, espace, nappe, sols et plantes, qualité de l'eau, ouvrages, pluie recyclée, société et économie, incertitude. Quand toutes les missions sont réussies, une fenêtre de félicitations récapitule ce que le joueur a vu, une seule fois.

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
| Légende des terrains | Fenêtre ouverte par le bouton « Légende des terrains » à côté de la carte, ou depuis le menu :
| Carte « Terrain et eau » | Occupation du sol, relief, eau en surface, ville inondée, cultures en manque d'eau |
| Carte « Place pour la pluie » | Ce que chaque case peut encore absorber pendant un orage de 2 heures : place libre dans le sol et vitesse d'infiltration. Rouge, la pluie ruissellera ; bleu, elle entre dans le sol |
| Carte « Nappe » | Profondeur de la nappe sous la surface |
| Carte « Vitesse » | Vitesse de l'eau case par case, avec des traceurs emportés par le courant |
| Carte « Qualité » | Charge polluante de l'eau, et position du captage d'eau potable |
| Hydrogramme | Pluie et débit de la rivière à son arrivée en mer, avec la référence |
| Courbe de la nappe | Sous l'hydrogramme : remplissage moyen de la nappe, avec la référence en pointillé |
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
| Sol vivant | Sur une culture : couverts, matière organique ; le sol infiltre mieux (+8 mm/h) et garde 20 mm d'eau de plus | Effet modeste en été très sec ; 1 crédit par case |
| Réserve | Bassin bâché de 5 m : une case vaut 6,25 ha et environ 310 000 m³, la taille d'une « méga-bassine » moyenne (Sainte-Soline en vaut deux). Elle se remplit en pompant la nappe pendant la saison de remplissage, tant qu'elle dépasse un seuil, puis irrigue les cultures à 6 cases à la ronde | Isolée du sol, elle ne recharge pas la nappe ; elle s'évapore, son eau se concentre et stagne au chaud ; 20 crédits par case |
| Pompe | Irrigue les cultures à 3 cases à la ronde | Prend à la rivière ou à la nappe |

## Les onze missions

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
| 9 | La grande réserve | Retenues de substitution | 70 jours : hiver (remplissage), printemps, été sec | Manque d'eau −50 %, 90 % du débit d'été et 80 % du débit d'hiver gardés, nappe pas plus de 1 m plus basse près des forages en fin d'hiver, 90 % des cultures gardées ; encart « Volumes engagés » et encart « Dans la réalité : le débat » |
| 10 | Les années sèches | Bon cycle de l'eau ou réserves ? | 3 ans d'hivers de moins en moins pluvieux et d'étés très secs | Manque d'eau −25 %, chaque été au moins 90 % du débit de référence, nappe finale au moins au niveau de référence, 90 % des cultures gardées |
| 11 | Un territoire, quatre saisons | Tout concilier | 34 jours avec orage puis été sec | Ville au sec, pic −15 %, manque d'eau −40 %, 50 % du débit d'été, 80 % des cultures |

Ce que chaque mission cherche à faire comprendre :

1. Une même pluie ne fait pas la même crue : le sol décide du partage entre infiltration et ruissellement, et l'endroit où l'on replante compte.
2. À volume égal, plus l'eau va vite, plus elle arrive groupée. La freiner l'étale, mais une rivière ralentie monte plus haut, et chaque haie prend un peu de surface au champ.
3. Bâtir déplace l'eau vers l'aval. On peut compenser, mais pas construire n'importe où.
4. L'infiltration a une limite. Sur sol saturé il faut du volume pour retenir la crue, au bon endroit.
5. L'eau garde la trace de ce qu'elle a traversé. Une bande de végétation entre le champ et la rivière protège beaucoup pour peu de surface.
6. La rivière d'été est faite de la pluie d'hiver infiltrée.
7. Rivière et nappe sont le même réservoir : pomper dans l'une fait baisser l'autre.
8. L'eau ne se perd pas, elle tourne. Une région végétalisée renvoie vers le ciel une partie de sa pluie.
9. Stocker l'eau d'hiver déplace le prélèvement dans le temps et protège la rivière d'été, mais prend à la rivière d'hiver, perd de l'eau par évaporation, et laisse une eau stagnante qui se concentre et se réchauffe.
10. Sur plusieurs années sèches, ni les réserves seules (elles se remplissent mal après des hivers secs et prélèvent dans la rivière) ni les seules solutions « bon cycle de l'eau » (elles préservent rivière et nappe mais soulagent peu les cultures dans des étés extrêmes) ne tiennent tous les objectifs ; un mélange sobre y parvient.
11. Il n'y a pas d'aménagement miracle : tout se joue sur le même stock, d'une saison à l'autre et de l'amont à l'aval.

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
10. **Sol vivant et haies.** Une culture en sol vivant infiltre 8 mm/h de plus et garde 20 mm d'eau de plus ; un champ voisin d'une haie évapore 10 % de moins (effet brise-vent). Ce sont des hypothèses prudentes.
11. **Réserve**, s'il y en a une : un stock commun à toutes les cases de réserve, qui reçoit la pluie directe, s'évapore à 1,1 fois l'évaporation potentielle, se remplit en pompant la nappe autour d'elle pendant la saison de remplissage tant que la nappe moyenne du bassin (un piézomètre de référence) dépasse 50 % de sa capacité, puis irrigue les cultures proches. L'eau pompée part avec une charge de 20 mg/L (indice), qui se concentre quand l'eau s'évapore ; on compte aussi les jours où l'eau, stockée depuis plus de 20 jours, reste au chaud.
12. **Atmosphère**, en cycle fermé : elle reçoit l'évaporation de la mer et la moitié de celle des terres ; il pleut quand elle atteint 30 mm.

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
11. **Barrage écrêteur et solutions.** Ajout d'un barrage écrêteur, dont le pertuis laisse passer le débit normal : en mission 10, il évapore une quinzaine de fois moins d'eau qu'un barrage plein et garde un meilleur débit d'été, mais il doit être plus haut pour arrêter la même crue. Chaque mission a désormais un bouton « Solution » avec une stratégie expliquée, applicable d'un clic. Les neuf solutions ont été vérifiées par calcul puis jouées dans un navigateur de test : toutes réussissent leur mission dans le budget.
12. **La grande réserve.** Nouvelle mission sur les retenues de substitution : pomper la nappe en hiver pour remplir une grande réserve bâchée, puis irriguer en été. Les objectifs reprennent les buts affichés de ces projets (cultures irriguées, débit d'été préservé) ; le bilan de fin de mission chiffre ce qu'ils coûtent (eau pompée, évaporation, qualité, débit d'hiver). À cette occasion, l'irrigation par pompes et réserves a été plafonnée à la capacité du sol : arroser au-delà rechargeait artificiellement la nappe et faussait la comparaison.
13. **Rendre la nappe visible, et plusieurs années sèches.** Le déficit de la nappe était invisible : une courbe de la nappe, comparée à la référence, s'affiche sous l'hydrogramme, et le bilan indique d'où vient l'eau pompée (environ 85 % de la rivière d'hiver et 15 % de la nappe en hiver normal). Le remplissage dépend désormais d'un seuil sur la nappe moyenne du bassin, et la mission 9 propose un hiver sec : la réserve ne s'y remplit qu'à un tiers. Nouvelle mission « Les années sèches » sur trois ans, avec une nappe plus lente qui garde la mémoire d'une année sur l'autre, pour comparer réserves et « bon cycle de l'eau » ; deux effets agronomiques ont été ajoutés pour une comparaison équitable (sol vivant, effet brise-vent des haies).
14. **Jeu ou réalité, et fin de partie.** Ajout d'une page qui affirme l'objectif pédagogique du jeu et liste ses différences avec une simulation scientifique, signalée dès la première page du tutoriel. Le bilan de masse du modèle a été vérifié à cette occasion : l'eau est conservée à 0,1 % près. Ajout d'une fenêtre de félicitations quand toutes les missions sont réussies.
15. **Menu latéral.** Les onze missions ne tenaient plus dans la barre du haut. Elles passent dans un menu ☰ qui regroupe aussi la progression, le bac à sable, l'aide et les informations sur le terrain ; la légende des terrains et l'explication des vues deviennent des fenêtres, ce qui libère l'espace sous la carte.
16. **Volumes engagés et débat sur les méga-bassines.** Une case de réserve est calée sur une bassine réelle de taille moyenne (environ 310 000 m³). La mission « La grande réserve » affiche en direct la capacité posée et le volume pompé dans la nappe, en millimètres sur la carte et en part de la recharge d'hiver. Deux objectifs font compter ce pompage : garder 80 % du débit d'hiver, et ne pas faire baisser la nappe de plus de 1 m près des forages à la fin de l'hiver. Le bon volume devient un arbitrage : loin de la rivière, le cône se creuse dans la nappe ; près d'elle, c'est la rivière d'hiver qui paie. Un encart « Dans la réalité : le débat » résume, sources à l'appui, les points d'accord et de divergence : volumes du programme des Deux-Sèvres, étude du BRGM et contre-expertise, évaporation, qualité, adaptation ou mal-adaptation, décisions de justice, été 2026. Il rappelle aussi ce que le jeu simplifie, à commencer par l'échelle : 77 km² seulement.
17. **Fiche de mission, solution et sonde.** Sur grand écran, la fiche de mission a son propre ascenseur, pour rester lisible à côté de la carte. La solution s'ouvre dans une fenêtre qui défile, avec le bouton pour l'appliquer. Avec l'outil « Sonder », un clic sur une case ouvre sa fiche, collée sur le côté droit pour laisser voir le terrain : le type de terrain et ses caractéristiques, comparées comme dans la légende, puis l'état de la case, mis à jour pendant la simulation. La case sondée est entourée en jaune ; sur téléphone, la fiche s'affiche en bas de l'écran.
18. **Place pour la pluie.** La vue « Humidité du sol » colorait chaque case selon le remplissage de son propre sol : une forêt et une ville à 50 % avaient la même couleur, et la carte restait presque uniforme. Elle est remplacée par « Place pour la pluie », qui montre en millimètres ce que chaque case peut encore absorber en 2 heures d'orage. Les cases deviennent comparables, et la vue répond directement à la question des premières missions : où la prochaine pluie va-t-elle ruisseler ? La fiche de la sonde donne la même valeur, et le cadre « Sonde » du panneau de droite a été retiré, remplacé par cette fiche.
19. **Commandes sous la carte.** Les commandes qui changent l'affichage de la carte sont regroupées sous elle : choix de la vue (terrain, place pour la pluie, nappe, vitesse, qualité), légende des terrains, 3D ou plan, rotation, zoom et recentrage. Au-dessus restent les outils d'aménagement, le pinceau et la vitesse de simulation. Sur grand écran, la hauteur de la carte s'ajuste pour que ces commandes restent visibles sans faire défiler la page.
20. **Retours de test.** Le tutoriel s'ouvre à chaque démarrage, avec une case « Ne plus afficher au démarrage ». Choisir un aménagement après une simulation semblait sans effet : le message qui demandait d'arrêter la simulation s'affichait sous la carte, hors de vue. Désormais, choisir un aménagement arrête la simulation et revient à la préparation, avec un message juste sous les outils. La fiche de la sonde reste ouverte quand on passe à un aménagement, et suit la dernière case peinte. Sur grand écran, « État du territoire » et « Bilan depuis le début » forment une troisième colonne, à côté de la fiche de mission.

### Comment les missions ont été vérifiées

- **Par calcul, hors écran.** Pour chaque mission, le moteur a été lancé sur la référence et sur plusieurs stratégies (une soixantaine au total). Les seuils ont été réglés pour que ne rien faire échoue, qu'au moins une stratégie raisonnable réussisse, et que des stratégies naïves échouent.
- **Dans un navigateur de test.** Les solutions des onze missions ont été appliquées puis jouées jusqu'au verdict : toutes réussissent. Plusieurs stratégies qui doivent échouer ont aussi été jouées à la souris (trop peu de forêt en mission 1, une seule pompe en mission 7).
- **Non fait.** Aucun joueur réel n'a encore testé le jeu : la difficulté et la clarté des consignes restent à éprouver.

Exemples de résultats obtenus par calcul :

| Mission | Stratégie | Résultat |
|---|---|---|
| 1 | Forêt sur 230 cases en bas de versant | Pic de 126 à 49 m³/s : réussi |
| 1 | Forêt sur 230 cases en haut de versant | Pic de 126 à 110 m³/s : échec |
| 2 | Haies sur deux cases de chaque côté de la rivière | Pic de 121 à 71 m³/s, crue retardée de plus de 2 h : réussi |
| 2 | Méandres dans la rivière devant la ville seulement | Ville inondée sur 6 cases au lieu de 3 : échec |
| 4 | Barrage de 4 m juste en amont de la ville (65 crédits) | Pic de 136 à 104 m³/s, ville au sec : réussi |
| 9 | 8 pompes d'été dans la nappe | Manque d'eau −51 %, mais débit d'été −40 % : échec |
| 9 | Dix bassines d'une case à 7 cases de la rivière (3,1 millions de m³) | Manque d'eau −58 %, débit d'hiver −16 %, nappe jusqu'à 0,65 m plus basse près des forages, 4 % évaporés : réussi. Seize bassines (5 millions de m³) : manque d'eau −77 % mais débit d'hiver −24 % et nappe −1,07 m : échoue |
| 9 | Une seule réserve de 100 ha | N'arrose qu'à 6 cases autour : les deux tiers de l'eau restent inutilisés |
| 9 | Même solution, hiver sec | Remplissage autorisé 20 % du temps, réserve remplie à un tiers, manque d'eau −28 % : échec |
| 10 | Quatre réserves | Manque d'eau −47 %, mais premier été à 80 % du débit de référence : échec |
| 10 | Sols vivants, haies, prairies, zones humides | Rivière et nappe préservées, manque d'eau −7 à −16 % : échec |
| 10 | 45 parcelles rendues à la prairie, 1 réserve, 300 sols vivants, 30 haies | Manque d'eau −31 %, chaque été ≥ 95 %, nappe au niveau de référence : réussi |
| 4 | Remblai le long de la ville | Pic à 125 m³/s, ville encore inondée : échec |
| 5 | Zone humide sur une case de chaque côté de la rivière | Pollution en mer de 99 à 35 tonnes : réussi |
| 5 | 85 cases de prairie au milieu de la plaine | Pollution en mer de 99 à 89 tonnes : échec |
| 7 | 8 pompes en nappe à 8 cases de la rivière | Manque d'eau −53 %, 65 % du débit d'été gardé : réussi |
| 7 | 8 pompes dans la rivière | 41 % du débit d'été gardé : échec |

## Limites à connaître

Le jeu est une maquette. Par rapport à une étude hydrologique réelle, il n'a ni données mesurées ni calage sur des débits et niveaux de nappe observés ; il raccourcit les saisons à quelques jours ; ses cases de 250 m ne représentent pas le lit réel de la rivière ; sa nappe est une couche uniforme et réactive ; ses sols, cultures, ouvrages et sa qualité de l'eau sont très simplifiés ; il ne donne qu'une réponse, sans marge d'erreur. Les outils réels vont des modèles globaux à quelques réservoirs ([GR4J](https://webgr.inrae.fr/outils/modeles-hydrologiques/modele-hydrologique-journalier-gr4j), d'INRAE) aux modèles de bassin agricole ([SWAT](https://swat.tamu.edu/)) et aux modèles physiques couplés à des modèles de nappe ([MIKE SHE](https://www.dhigroup.com/technologies/mikepoweredbydhi/mike-she), [ParFlow](https://parflow.org/), [MODFLOW](https://www.usgs.gov/software/modflow-6-usgs-modular-hydrologic-model) de l'USGS, [MARTHE](https://www.brgm.fr/fr/logiciel/marthe-logiciel-modelisation-ecoulements-souterrains) du BRGM), toujours calés sur des mesures. Sur un bassin réel, les chiffres du jeu pourraient s'écarter d'un facteur 2 ou plus.

En détail :


Ce que le jeu simplifie au point de pouvoir induire en erreur :

- **Les barrages** sont de deux sortes seulement : plein (il retient tout jusqu'à déborder) ou écrêteur (pertuis fixe de 30 m³/s). Il n'y a pas de vanne manœuvrable.
- **La nappe** réagit en quelques semaines. Une vraie nappe est souvent bien plus lente.
- **Forêt contre prairie.** Dans les missions 6 et 8, la prairie fait mieux que la forêt à budget égal, parce qu'elle coûte trois fois moins cher. C'est un effet des réglages, pas une règle générale.
- **La pollution** est un indice sans unité réelle : les « mg/L » et les tonnes sont des valeurs de jeu. Les nitrates qui descendent vers la nappe ne sont pas simulés.
- **Le recyclage de la pluie** est grossi. La moitié de l'évaporation des terres retombe sur place, ce qui est plausible pour une grande région, pas pour un bassin de 11 km.
- **La pluie** tombe partout pareil.
- **La mission 10** compare des voies dont les effets réels dépendent fortement des sols, des nappes et des cultures. Le gain du sol vivant (+20 mm) et de l'effet brise-vent (−10 %) sont des hypothèses ; la sobriété n'est représentée que par des parcelles rendues à la prairie ; il n'y a pas de changement de cultures ni d'économies d'eau à la parcelle. La nappe y est plus lente que dans les autres missions.
- **La réserve** est simplifiée. Les saisons sont raccourcies : en réalité l'eau attend plusieurs mois entre remplissage et usage, et l'évaporation cumulée peut être plus forte que les 5 à 6 % du jeu. La charge de la nappe est fixée à 20 (indice) ; les algues ne sont pas simulées, seulement signalées par le nombre de jours d'eau stagnante au chaud ; les effets d'un débit d'hiver réduit sur les milieux (zones humides, poissons) ne sont pas calculés. Le jeu donne des ordres de grandeur sur un cas fictif, pas un avis sur des projets réels, dont l'évaluation fait l'objet de débats.

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
| `sources/restest.js` | Compare pompes d'été et réserves de différentes tailles dans la mission 9 |
| `sources/mbdry.js` | Mission 9 en hiver normal et en hiver sec |
| `sources/mdtest.js` | Compare réserves, bon cycle de l'eau et mélanges sur trois ans (mission 10) |
| `sources/nappe.js` | Suit la nappe et l'eau partie en mer, avec et sans réserves |
| `sources/bilan.js` | Vérifie que l'eau est conservée (bilan de masse) sur plusieurs missions |

Pour modifier le jeu : éditer `sim.js` (modèle, missions, seuils) ou `template.html` (interface), lancer `node test.js` pour vérifier que les missions restent gagnables (`node test.js m1` pour une seule), puis `python3 build.py` pour régénérer le fichier du jeu. Il faut Node.js et Python 3 ; aucune autre dépendance.
