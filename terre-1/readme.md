# Jardin d'Elysium — Mars, son vent, son eau, son relief

Ce document rassemble les recherches faites autour du projet **Jardin d'Elysium** : une scène 3D où des plantes rouges fractales ondulent au rythme du vent enregistré sur Mars, puis s'effacent au passage du rover Perseverance.

Recherches faites entre le 26 septembre et le 3 octobre 2026.

## Sommaire

1. [Le son du vent sur Mars](#1-le-son-du-vent-sur-mars)
2. [La scène 3D](#2-la-scène-3d)
3. [L'histoire de Mars](#3-lhistoire-de-mars)
4. [Les cartes topographiques](#4-les-cartes-topographiques)
5. [La zone choisie : le delta de Jezero](#5-la-zone-choisie--le-delta-de-jezero)
6. [Prochaines étapes](#6-prochaines-étapes)
7. [Sources](#7-sources)

---

## 1. Le son du vent sur Mars

### D'où vient l'enregistrement

- **Sonde :** InSight (NASA), posée le 26 novembre 2018 dans la plaine d'Elysium Planitia (4,50° N, 135,62° E).
- **Date de l'enregistrement :** 1er décembre 2018.
- **Vent mesuré :** 16 à 24 km/h, soufflant du nord-ouest vers le sud-est.
- **Instruments :** deux capteurs ont « entendu » le vent, de deux façons différentes.
  - Le **sismomètre** (SEIS) a capté les vibrations de l'atterrisseur, causées par le vent qui passait sur les panneaux solaires.
  - Le **capteur de pression** (APSS) a capté directement les variations de pression de l'air.

InSight n'avait pas de microphone. Cet enregistrement n'était pas prévu : c'est une surprise des premiers jours de la mission.

### Où le trouver

| Page | Ce qu'on y trouve |
|---|---|
| [NASA Science — Sounds of Mars: InSight Senses Martian Wind](https://science.nasa.gov/resource/sounds-of-mars-nasas-insight-senses-martian-wind/) | L'audio original et une version montée de deux octaves |
| [NASA — Sounds from Beyond](https://www.nasa.gov/sounds-from-beyond/) | Tous les sons martiens, dont un extrait brut du sismomètre et le vent capté par Perseverance |
| [JPL — Sounds of Mars](https://www.jpl.nasa.gov/videos/sounds-of-mars-nasas-insight-senses-martian-wind/) | La vidéo de présentation |

### Conseils d'écoute

- L'enregistrement du sismomètre est presque entièrement dans les **graves**. Il faut un casque ou un caisson de basses.
- Sur téléphone ou ordinateur portable, prendre la **version montée de deux octaves**.
- L'enregistrement du capteur de pression a été accéléré 100 fois pour devenir audible.
- Perseverance, lui, a un **vrai microphone** (instrument SuperCam). Ses enregistrements de vent sont sur la page « Sounds from Beyond ».

---

## 2. La scène 3D

**Jardin d'Elysium** est une page web interactive : https://claude.ai/artifact/GXAAYpf4K3wM6o7ztJweNA
(page privée, à partager depuis son menu « Partager »).

### Ce qu'elle montre

- **Un paysage martien** au coucher du soleil, avec le halo bleu typique des crépuscules martiens, des rides de sable et des roches.
- **Des plantes rouges fractales.** Chaque branche se divise en 2 ou 3 rameaux plus courts, orientés selon l'angle d'or (137,5°), jusqu'à des frondes écarlates au bout.
- **Une végétation imaginée pour le Mars d'autrefois** (version locale). Gravité faible : les plantes sont hautes et grêles, leurs rameaux montent, leur balancement est lent. Lumière diffuse d'une atmosphère épaisse : les frondes sont larges et étalées, les ombres douces.
- **Un lichen** rouge sombre et orangé qui tapisse tout le relief, plus rare sur les pentes raides. Il se dissout avec l'eau au passage du rover.
- **Un mouvement de laminaires.** Des ondes lentes remontent chaque tige de la base vers les pointes. Le pied reste presque immobile, les extrémités sont très souples.
- **Le vent piloté par le son.** L'intensité de l'enregistrement chargé devient la force du vent.
- **Perseverance qui passe.** Le rover traverse le jardin en laissant des traces de roues. Autour de lui, les plantes deviennent translucides puis se défont en grains, comme un mirage. Elles repoussent ensuite, et le rover repasse.

### Comment l'utiliser

1. Télécharger l'audio sur la page NASA « Sounds of Mars ».
2. Le charger dans la page (bouton « Charger un son ») ou le glisser sur la scène.
3. Tourner autour de la scène à la souris ou au doigt.

En attendant le fichier, un vent simulé anime la scène.

| Commande | Effet |
|---|---|
| Sensibilité au son | Compense un enregistrement faible |
| Nombre de plantes | De 20 à 180 |
| Faire passer Perseverance | Lance un passage immédiatement |
| Suivre le rover | La caméra accompagne le rover |
| Faire repousser | Ramène les plantes tout de suite |
| Nouvelle graine | Fait pousser un autre jardin |

### Limites connues

- La page ne peut pas télécharger elle-même le son sur le site de la NASA : il faut le charger à la main.
- La version locale (`Jardin d'Elysium.html`) lit le vrai relief et la vraie image de Jezero dans le dossier `map/`. Un navigateur refuse de lire ce dossier quand la page est ouverte par double-clic : lancer `python3 -m http.server` dans le dossier du projet puis ouvrir http://localhost:8000, ou glisser les deux fichiers `.tif` sur la scène. Sans les cartes, le terrain reste **inventé**.
- **L'eau est une reconstitution, pas une donnée.** Le cours de la rivière a été calculé sur le relief en suivant la pente (9 km, de −2208 m à l'entrée de la gorge jusqu'au lac). Le niveau du lac (−2430 m, `MAP.lake`) est choisi pour affleurer le sommet du delta ; ce n'est pas une valeur tirée d'une publication. La rivière est une nappe de 240 m de large posée 2,5 m au-dessus du fond de la vallée : c'est le relief qui dessine ses berges.
- Avec les cartes, le sol suit exactement le relief mesuré (une altitude tous les 40 m) : aucune ride de sable ni bosse inventée n'est ajoutée.
- La page publiée sur claude.ai n'a pas les cartes : son terrain est toujours inventé.
- Le lecteur de `.tif` de la page ne comprend que les fichiers non compressés à un seul canal (le format exporté ici).
- Le passage du rover n'a pas pu être vérifié visuellement avant publication. Si le rover roule de travers ou penche dans le mauvais sens, c'est à corriger.

---

## 3. L'histoire de Mars

En résumé : Mars a été une planète humide et peut-être habitable pendant sa jeunesse, puis elle est devenue un désert froid. Les travaux de 2024 à 2026 changent surtout un point : ce passage n'a pas été brutal. L'eau a disparu par étapes et a survécu longtemps sous la surface.

### La naissance — il y a environ 4,5 milliards d'années

Mars se forme en quelques millions d'années. Elle est deux fois plus petite que la Terre, donc elle refroidit plus vite. Le sismomètre d'InSight a permis de mesurer son intérieur : un noyau liquide assez gros, une croûte épaisse. Au début, Mars a un champ magnétique qui protège son atmosphère.

### L'époque humide — il y a environ 4,1 à 3,5 milliards d'années

Mars a alors une atmosphère plus épaisse, des rivières, des deltas et des lacs.

- **Le cratère Jezero était un lac.** En 2026, l'équipe de Perseverance a décrit d'anciennes plages sur son bord : des grès aux grains arrondis par les vagues, vieux d'environ 3,5 milliards d'années.
- **Un océan dans l'hémisphère nord ?** La question reste débattue. Le radar du rover chinois Zhurong a détecté sous la surface des couches qui ressemblent à d'anciennes plages.

### La perte de l'atmosphère

Le champ magnétique s'éteint assez tôt. Sans ce bouclier, le vent solaire arrache peu à peu l'atmosphère.

- En 2025, la sonde MAVEN a observé directement ce processus, appelé « pulvérisation ».
- Une partie du CO₂ a été piégée dans les roches. Curiosity a trouvé en 2025 du carbonate de fer (sidérite) dans le cratère Gale.

*Ces deux points viennent de mes connaissances, pas d'une source vérifiée pendant cette recherche.*

### Un assèchement par étapes

- **Mars 2026 :** une étude sur les dunes fossiles du cratère Gale montre que de l'eau s'infiltrait encore dans le sous-sol après la disparition des lacs et des rivières.
- **Septembre 2026 :** une étude identifie au moins trois épisodes d'eau distincts dans les roches anciennes. *L'article n'a pas pu être lu en détail ; seul son titre est connu.*

Des niches souterraines humides ont donc pu durer longtemps.

### La question de la vie

En septembre 2025, la NASA a annoncé que la roche **Cheyava Falls** (échantillon « Sapphire Canyon »), prélevée par Perseverance, contient la « biosignature potentielle » la plus solide trouvée à ce jour : de petites taches minérales (vivianite et greigite) associées à de la matière organique. Sur Terre, cette association est souvent produite par des microbes. Mais des réactions chimiques sans vie peuvent aussi l'expliquer.

Pour trancher, il faudrait analyser l'échantillon dans un laboratoire sur Terre. L'avenir de la mission de retour d'échantillons est incertain.

### Aujourd'hui

Mars est un désert froid, avec une atmosphère très fine (moins de 1 % de la pression terrestre). L'eau restante est surtout de la glace, aux pôles et sous la surface.

**Débat en cours :** en 2024, une analyse des données d'InSight a suggéré un vaste réservoir d'eau liquide à 10–20 km de profondeur. En 2025, d'autres chercheurs ont montré que les mesures peuvent s'expliquer sans eau.

---

## 4. Les cartes topographiques

Les données de relief de Mars sont publiques et gratuites, au format **GeoTIFF** (extension `.tif`). Elles s'ouvrent dans QGIS, dans Blender avec un add-on, ou dans un moteur 3D après conversion en carte de hauteur.

| Jeu de données | Couverture | Résolution | Usage |
|---|---|---|---|
| **MOLA** (Mars Global Surveyor) | Toute la planète | 463 m/pixel | Globe, vue d'ensemble. Mesuré au laser, très fiable en altitude |
| **MOLA + HRSC** (fusion USGS) | Toute la planète | 200 m/pixel | Meilleur compromis global. Fichier de plusieurs gigaoctets |
| **CTX** | De nombreuses zones | environ 20 m/pixel | Cratères, deltas, dunes |
| **HiRISE** | Petites zones de quelques km | environ 1 m/pixel | Sites d'atterrissage. On y distingue les rochers |

### Découper une zone : NASA Mars Trek

[Mars Trek](https://trek.nasa.gov/mars/) est un globe interactif dans le navigateur. On y dessine un rectangle et on exporte le relief de ce rectangle, sans manipuler des fichiers géants.

### Relief ou photo ?

Mars Trek exporte les deux au même format `.tif`. Pour les distinguer :

- **Relief :** le calque s'appelle « DEM », « DTM » ou « Elevation ». Dans une visionneuse d'images, le fichier s'affiche souvent tout noir, tout blanc ou en gris plat. C'est normal : il contient des altitudes en mètres, pas des couleurs.
- **Photo :** le calque s'appelle « Mosaic », « Ortho », « Hillshade » ou « Shaded relief ». Le fichier s'affiche comme une image. On ne peut pas en tirer les vraies altitudes.

### Envoyer un `.tif` dans la conversation

L'envoi de fichiers refuse l'extension `.tif`. Il faut **compresser le fichier en `.zip`** avant de l'envoyer.

---

## 5. La zone choisie : le delta de Jezero

Pour une zone où il y a eu de l'eau, le delta du cratère Jezero est le meilleur choix.

- **L'eau se voit dans le relief.** Il y a 3,5 milliards d'années, Jezero était un lac d'environ 45 km de large. Une rivière y entrait par l'ouest et a déposé un delta en éventail, encore visible. On distingue aussi la vallée qui l'alimentait et la brèche par où le lac débordait à l'est.
- **C'est le terrain de Perseverance.** Le rover y a trouvé la roche Cheyava Falls et les anciennes plages.
- **C'est la zone la mieux cartographiée de Mars**, jusqu'à 1 m par pixel.

### Coordonnées

| Repère | Position |
|---|---|
| Centre du cratère | environ 18,4° N, 77,5° E |
| Rectangle à exporter (delta et bord ouest) | de 18,2° à 18,7° N, de 77,2° à 77,7° E |
| Taille du rectangle | environ 30 × 30 km |

### Export depuis Mars Trek

1. Ouvrir Mars Trek et chercher « Jezero ».
2. Choisir un calque d'**altitude** qui couvre Jezero, de préférence un CTX à environ 20 m/pixel.
3. Dessiner le rectangle ci-dessus avec l'outil de téléchargement.
4. Exporter en GeoTIFF, puis compresser en `.zip`.

### Autres zones d'eau possibles

- **Cratère Gale :** ancien lac, mont Sharp, terrain du rover Curiosity.
- **Delta d'Eberswalde :** le plus beau delta fossile de Mars. Aucun rover n'y est allé.

---

## 6. Prochaines étapes

- [x] Exporter le relief de Jezero (CTX, 20 m/pixel) : `map/JEZ_ctx_B_soc_008_DTM_…_20m_….tif`.
- [x] Exporter une image de la même zone (mosaïque CTX, 6 m/pixel) : `map/JEZ_ctx_B_soc_008_orthoMosaic_6m_….tif`. Elle est en niveaux de gris ; la page la teinte en ocre.
- [x] Remplacer le terrain inventé de la scène par le vrai relief de Jezero.
- [x] Placer le jardin rouge : sur une terrasse de la gorge de Neretva Vallis (18,5123° N, 77,2587° E, altitude −2241 m), là où la rivière traversait le rempart du cratère avant d'atteindre le delta. Le jardin est à 120 m de la rivière et 6 m au-dessus. Réglable dans la page (`MAP.site`).
- [x] Faire apparaître l'eau : une rivière dans la gorge et le lac dans le cratère. Elle se dissout en grains au passage du rover puis revient, comme les plantes.
- [ ] Vérifier à l'œil le passage du rover dans la scène.

---

## 7. Sources

### Son du vent

- [Sounds of Mars: NASA's InSight Senses Martian Wind — NASA Science](https://science.nasa.gov/resource/sounds-of-mars-nasas-insight-senses-martian-wind/)
- [Sounds from Beyond — NASA](https://www.nasa.gov/sounds-from-beyond/)
- [Sounds of Mars — JPL](https://www.jpl.nasa.gov/videos/sounds-of-mars-nasas-insight-senses-martian-wind/)
- [NASA InSight Lander 'Hears' Martian Winds — NASA](https://www.nasa.gov/news-release/nasa-insight-lander-hears-martian-winds/?site=insight)

### Histoire de Mars

- [New clues to Mars's habitability in discovery of ancient beach — Imperial College London (2026)](https://www.imperial.ac.uk/news/articles/engineering/earth-science/2026/new-clues-to-marss-habitability-in-discovery-of-ancient-beach/)
- [Scientists discover hidden water beneath Mars that could have supported life — ScienceDaily (mars 2026)](https://www.sciencedaily.com/releases/2026/03/260315004340.htm)
- [Early Mars rocks reveal at least three separate water episodes — Phys.org (septembre 2026)](https://phys.org/news/2026-09-early-mars-reveal-episodes.html)
- [Was the Red Planet once blue? New evidence points to an ancient ocean on Mars — Space.com](https://www.space.com/astronomy/mars/was-the-red-planet-once-blue-new-evidence-points-to-an-ancient-ocean-on-mars)
- [NASA Says Mars Rover Discovered Potential Biosignature Last Year — JPL (2025)](https://www.jpl.nasa.gov/news/nasa-says-mars-rover-discovered-potential-biosignature-last-year/)
- [A biosignature on Mars? Unpacking Perseverance's Cheyava Falls find — The Planetary Society](https://www.planetary.org/articles/a-biosignature-on-mars-unpacking-perseverances-cheyava-falls-find)
- [Liquid water in the Martian mid-crust — PNAS (2024)](https://www.pnas.org/doi/10.1073/pnas.2409983121)
- [Results from the InSight Mars mission do not require a water-saturated mid crust — PNAS (2025)](https://www.pnas.org/doi/10.1073/pnas.2418978122)

### Topographie

- [Mars MGS MOLA DEM 463m — USGS Astrogeology](https://astrogeology.usgs.gov/search/map/Mars/GlobalSurveyor/MOLA/Mars_MGS_MOLA_DEM_mosaic_global_463m)
- [Mars MGS MOLA – MEX HRSC Blended DEM Global 200m v2 — USGS Astrogeology](https://astrogeology.usgs.gov/search/map/Mars/Topography/HRSC_MOLA_Blend/Mars_HRSC_MOLA_BlendDEM_Global_200mp)
- [Mars 2020 Terrain Relative Navigation HiRISE DTM Mosaic (Jezero, 1 m) — USGS Astrogeology](https://astrogeology.usgs.gov/search/map/Mars/Mars2020/JEZ_hirise_soc_006_DTM_MOLAtopography_DeltaGeoid_1m_Eqc_latTs0_lon0_blend40)
- [A High-Resolution DTM Mosaic of the Perseverance Landing Site at Jezero Crater — Earth and Space Science (2023)](https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2023EA003045)
- [HiRISE DTMs and Orthoimages — USGS Analysis Ready Data](https://stac.astrogeology.usgs.gov/docs/data/mars/hirise_dtms/)
- [NASA Mars Trek](https://trek.nasa.gov/mars/)
