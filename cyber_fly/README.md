# Arène de la drosophile

Une mouche drosophile virtuelle en 3D. Ses décisions viennent d'une simulation en temps réel de **4 027 vrais neurones** issus du connectome FlyWire. Ses pas et sa toilette rejouent des **mouvements enregistrés sur de vraies mouches**.

Tout tient dans un seul fichier : `arene-drosophile-local.html` (3,9 Mo). Il fonctionne sans internet et sans rien installer.

---

## 1. Utilisation

1. Double-cliquez sur `arene-drosophile-local.html`. Il s'ouvre dans Chrome, Edge ou Firefox (versions récentes).
2. Choisissez un objet sous la vue 3D, puis cliquez dans l'arène (dans la vue 3D ou sur le plan rond) pour le placer :
   - **Goutte sucrée** : si la mouche y pose la tête, elle s'arrête et tend la trompe.
   - **Goutte amère** : ne déclenche pas le repas.
   - **Sucre + amer** : l'amertume empêche le repas.
   - **Ombre menaçante** : une sphère sombre descend et grossit. La mouche décolle et s'éloigne du côté opposé.
3. **Souffler sur les antennes** : stimule les antennes pendant 1,5 s, ce qui déclenche la toilette.
4. **Caméra** : faites glisser pour tourner autour de la mouche, utilisez la molette pour zoomer. Les boutons « Suivre » et « Vue d'ensemble » changent de point de vue.

Le panneau de droite montre en direct :
- le cerveau vu de face, où chaque point est un neurone et s'allume quand il émet une impulsion ;
- les entrées sensorielles, en Hz par neurone ;
- les neurones de sortie qui pilotent le comportement ;
- un journal qui explique chaque décision, par exemple « MN9 à 39 Hz : la trompe s'étend ».

En haut, « vitesse » indique si la simulation suit le temps réel (×1,00). Sur une machine lente, elle ralentit, mais le comportement reste le même.

### La nouvelle *Réinitialiser*

L'onglet **Nouvelle** du panneau de droite contient une courte nouvelle, racontée par la mouche simulée elle-même. Ses cinq chapitres s'ouvrent au fil de vos interactions avec la mouche. Un indice dit comment obtenir le chapitre suivant :

| Chapitre | S'ouvre quand… |
|---|---|
| I · 0,0 s | dès l'ouverture de la page |
| II · Coupure | vous appuyez sur « Réinitialiser » |
| III · Des gestes empruntés | la mouche fait sa toilette (bouton « Souffler sur les antennes ») |
| IV · Les traces | la mouche écrit quelque chose sur le plan rond (il faut être patient) |
| V · Sortie | vous répondez à ce qu'elle a écrit |

Le bouton « Tout lire sans jouer » ouvre tous les chapitres d'un coup. Les chapitres ouverts et la trace laissée par la mouche sont gardés dans votre navigateur (`localStorage`) : ils survivent à « Réinitialiser » et à un rechargement de la page, comme dans la nouvelle.

---

## 2. Ce qui est réel et ce qui est programmé

| Élément | Origine | Statut |
|---|---|---|
| Câblage du cerveau (neurones, synapses, signe excitateur ou inhibiteur) | FlyWire, version 783 | **réel** |
| Dynamique des neurones (intégrateur à fuite, constantes) | Shiu et al., *Nature* 2024 | **modèle publié**, reproduit à l'identique |
| Corps 3D (69 segments, 126 articulations) | NeuroMechFly v2 (EPFL, flygym) | **réel** (reconstruction anatomique) |
| Cycle de pas de chaque patte | Enregistrement d'une vraie mouche, tables de NeuroMechFly | **enregistré** |
| Coordination des pattes (tripode) | Oscillateurs couplés, paramètres de NeuroMechFly | **modèle publié** |
| Toilette des antennes | 1,8 s filmée en 3D (DeepFly3D) chez une mouche dont on activait les neurones aDN | **enregistré**, recalé par cinématique inverse |
| Extension de la trompe, décollage | – | **programmé** (animation) |
| Marche au hasard, évitement des parois, déplacement du corps | – | **programmé** |

**Le principe.** Le cerveau décide *quoi* faire et le corps montre *comment* le faire. La carte FlyWire s'arrête au cou : les circuits de la moelle thoracique, qui coordonnent les pattes, ne sont pas inclus. Il n'y a pas non plus de moteur physique. La vitesse de la mouche est calculée à partir de la longueur réelle de son pas.

---

## 3. Comment le cerveau a été construit

### 3.1 Le modèle d'origine
Chaque neurone suit l'équation d'un intégrateur à fuite (*leaky integrate-and-fire*). Les constantes sont celles de Shiu et al. (2024) :

- potentiel de repos −52 mV, seuil −45 mV, constante de membrane 20 ms ;
- courant synaptique décroissant en 5 ms, délai synaptique 1,8 ms, période réfractaire 2,2 ms ;
- poids = nombre de synapses × 0,275 mV, avec un signe selon le neurotransmetteur prédit ;
- stimulation sensorielle : entrées aléatoires de Poisson, à une fréquence donnée en Hz ;
- pas de temps de 0,1 ms, avec intégration exacte des équations.

### 3.2 Validation
- J'ai réimplémenté le modèle en C, puis vérifié le résultat avec le code Brian2 original des auteurs. Stimuler les neurones du goût sucré fait monter le neurone de la trompe (MN9) à **93,5 Hz**, contre **93,3 Hz** publiés. La corrélation sur l'ensemble des neurones actifs est de **0,9997**.
- Un détail de Brian2 compte : une entrée synaptique qui arrive pendant la période réfractaire est perdue. Sans cette règle, les fréquences sont surestimées de 30 à 50 %.

### 3.3 Le sous-cerveau : un élagage, pas une simplification

Le cerveau complet (138 639 neurones, 15 millions de connexions) est trop lourd pour un navigateur. Je ne l'ai pas simplifié, je l'ai **élagué**. La partie du cerveau qui sert dans l'arène est gardée à l'identique, et seul ce qui ne s'active jamais est retiré. Aucune connexion n'est modifiée, fusionnée ou approximée.

**Le principe : un neurone silencieux n'a aucune influence.** Dans ce modèle, un neurone au repos n'a pas d'activité spontanée. Il n'agit sur ses voisins que lorsqu'il émet une impulsion. Un neurone qui ne s'active jamais dans une situation donnée n'a donc aucun effet sur le reste, quel que soit son nombre de connexions : on peut le retirer sans changer le résultat.

**La méthode**

1. **Simuler le cerveau complet** dans 36 situations, avec 4 essais chacune, grâce au simulateur en C validé contre le code des auteurs :
   - chaque stimulation seule (sucre, amer, antennes, ombre à gauche, ombre à droite), à 5 intensités (40 à 200 Hz) ;
   - toutes les paires de stimulations, à 150 Hz ;
   - les cinq stimulations à la fois.
2. **Garder tout neurone qui émet au moins une impulsion** dans au moins une situation. L'union grossit vite, puis se stabilise : les dernières combinaisons n'ajoutaient plus que 1 à 57 neurones. On obtient 4 023 neurones, plus les neurones de sortie surveillés, soit **4 027 neurones**.
3. **Garder uniquement les connexions entre ces neurones**, avec leur nombre exact de synapses et leur signe : **292 833 connexions**, soit environ 2 % du total. Les données du cerveau tiennent ainsi dans 1,2 Mo.

**La vérification.** J'ai comparé le sous-cerveau et le cerveau complet sur 7 situations nouvelles, avec des intensités et des combinaisons non utilisées pour la sélection. Avec le même tirage aléatoire, les résultats sont identiques : corrélation de 1,000, et MN9 à 50,8 Hz dans les deux cas pour le sucre à 100 Hz. Sur l'ensemble de ces tests, la seule différence est **une impulsion isolée** émise par le cerveau complet hors du sous-réseau.

Une image : c'est comme un GPS qui ne garde que les rues de vos trajets habituels. Il est exact tant que vous faites ces trajets, mais il lui manque des rues pour aller ailleurs.

**Limites de l'élagage**
- Le sous-cerveau n'est exact que pour les stimulations prévues. Ajouter l'odorat ou la vision complète demanderait de refaire la sélection. Une odeur active à elle seule environ 8 900 neurones, ce qui explique en partie qu'elle n'ait pas été intégrée.
- Une combinaison très inhabituelle pourrait activer quelques neurones proches de leur seuil qui ne sont pas dans la sélection. D'après les tests, cet effet est négligeable.
- La méthode fonctionne parce que le modèle n'a ni activité spontanée ni plasticité. Dans un modèle où chaque neurone émet en permanence un faible bruit de fond, on ne pourrait pas retirer aussi simplement les neurones silencieux.

### 3.4 Entrées et sorties

| Entrée (capteur) | Neurones | Déclencheur dans l'arène |
|---|---|---|
| Goût sucré | 29 récepteurs du labelle | tête sur une goutte sucrée |
| Goût amer | 41 récepteurs | tête sur une goutte amère |
| Organe de Johnston (antennes) | 659 | bouton « Souffler » |
| Détecteurs de looming LPLC2/LC4, gauche et droite | 162 / 152 | ombre, selon le côté |

| Sortie (neurone) | Type FlyWire | Comportement |
|---|---|---|
| MN9 | CB0701 | extension de la trompe |
| aBN1, aDN1 | SAD093, DNg62 | toilette des antennes |
| Fibre géante | DNp01 | décollage |
| DNa01, DNa02 gauche et droite | – | virages |
| MDN | – | marche arrière |
| DNp09 | – | marche avant |

### 3.5 Résultats qui viennent du câblage seul
- L'amertume **annule** la réponse de la trompe au sucre.
- Une ombre qui approche **coupe l'envie de manger** : MN9 passe d'environ 50 Hz à moins de 5 Hz.
- Une ombre à gauche active surtout les neurones de virage **droits** : la mouche fuit du côté opposé.
- La toilette est déclenchée surtout par l'antenne **gauche**. C'est une asymétrie présente dans les données, qui n'a pas été corrigée.

---

## 4. Comment le corps a été construit

- **Géométrie.** Les 39 maillages STL simplifiés de NeuroMechFly décrivent le côté gauche et le centre. Le côté droit est obtenu par symétrie. Chaque segment a une position, une orientation et des articulations lues dans le modèle MuJoCo de flygym. La cinématique est calculée par la page elle-même, sans moteur physique.
- **Marche.** Chaque patte a une table de 360 positions × 7 angles, tirée d'un pas enregistré. Six oscillateurs couplés (12 Hz, couplage en tripode) donnent la phase de chaque patte. Pour tourner, les pas du côté intérieur sont plus courts. Pour reculer, la table est jouée à l'envers.
- **Toilette.** Les angles fournis avec l'enregistrement DeepFly3D suivaient d'autres conventions que ce corps. J'ai donc aligné les points 3D filmés sur le corps (grâce aux six bases de pattes), puis calculé par cinématique inverse les 7 angles de chaque patte, image par image. L'erreur moyenne est d'environ 0,04 mm, pour des pattes d'environ 2 mm.

---

## 5. Structure du fichier HTML

Le fichier est autonome : code, données et bibliothèque 3D y sont tous intégrés. Il se découpe en blocs, dans cet ordre :

| # | Bloc | Taille approx. | Rôle |
|---|---|---|---|
| 1 | `<head>` + `<style>` | 5 Ko | Métadonnées, couleurs (variables CSS `--sugar`, `--loom`…), mise en page en grille, adaptation aux petits écrans |
| 2 | `<script type="text/plain" id="three-src">` | 1,3 Mo | Code source de **Three.js 0.169** (moteur 3D), stocké comme texte |
| 3 | `<div class="wrap">` | 5 Ko | Le HTML visible : en-tête, vue 3D, boutons, panneaux, section d'explications |
| 4 | `<script>` `BRAIN_META` / `BRAIN_B64` | 1,6 Mo | **Données du cerveau** |
| 5 | `<script>` classe `Brain` | 2,5 Ko | **Simulateur de neurones** |
| 6 | `<script>` `FLY_META` / `FLY_B64` | 0,9 Mo | **Données du corps** |
| 7 | `<script>` classe `FlyModel` | 3,5 Ko | **Corps 3D** |
| 7 bis | `<script>` `STORY` | 9 Ko | **Texte de la nouvelle** : les 5 chapitres (titre, indice, texte) |
| 8 | `<script type="module">` | 25 Ko | **Application** : relie cerveau, corps, arène et interface |

### 5.1 Données du cerveau (bloc 4)
- `BRAIN_META` (JSON) : nombre de neurones `N`, nombre de connexions `M`, groupes d'entrées (`groups.sugar`, `groups.jo`, `groups.loom_L`…), neurones de sortie (`outs.CB0701_L`, `outs.DNp01_R`…) et proportions de la vue du cerveau.
- `BRAIN_B64` : un bloc binaire encodé en base64, qui contient à la suite :
  - `indptr` (Int32, N+1) : pour chaque neurone, où commencent ses connexions sortantes (format CSR) ;
  - `tgt` (Uint16, M) : neurone cible de chaque connexion ;
  - `w` (Int16, M) : nombre de synapses signé (positif = excitateur) ;
  - `px`, `py` (Uint8, N) : position du neurone dans le cerveau (coordonnées FlyWire réduites à 0–255) ;
  - `cls` (Uint8, N) : classe du neurone (sensoriel, central, descendant, moteur…), utilisée pour les couleurs.

### 5.2 Simulateur `Brain` (bloc 5)
- `setRate(ids, hz)` fixe la fréquence de stimulation d'un groupe de capteurs.
- `step(n)` avance de `n` pas de 0,1 ms. À chaque pas : mise à jour des potentiels, détection des impulsions, livraison des entrées synaptiques retardées (tampon circulaire de 19 pas pour le délai de 1,8 ms), tirage des entrées de Poisson, puis remise à zéro des neurones qui ont émis une impulsion.
- `spikeCount[i]` compte les impulsions depuis la dernière lecture. L'application s'en sert pour les fréquences et pour faire clignoter le cerveau.

### 5.3 Données du corps (bloc 6)
- `FLY_META` (JSON) :
  - `bodies` : les 69 segments (nom, parent, position, orientation, articulations, maillage, symétrie éventuelle, matière) ;
  - `joints` : les 126 axes de rotation ;
  - `q0` : la posture neutre ;
  - `walk` : pour chaque patte, les indices des articulations, la posture neutre et la phase d'envol ;
  - `groom` : indices et fréquence d'images de l'extrait de toilette ;
  - `files` : où trouver chaque maillage dans le binaire ;
  - `mats` : couleurs ;
  - `ground` : hauteur du sol, 0,84 mm sous le thorax.
- `FLY_B64` (binaire base64) : les maillages (positions quantifiées en Uint16 et index des triangles), les tables de pas (Float32, 360×7 par patte) et l'extrait de toilette (Float32, 180 images × 42 angles).

### 5.4 Corps 3D `FlyModel` (bloc 7)
- À la construction : décode les maillages, crée un objet Three.js par segment et les emboîte selon l'arbre du corps.
- `q` : tableau des 126 angles. `apply()` recalcule l'orientation de chaque segment : orientation fixe × rotations de ses articulations.
- `legStep(patte, phase, amplitude, q)` : lit la table de pas enregistrée (avec interpolation).
- `groomFrame(t, q)` : lit l'extrait de toilette à l'instant `t` (en boucle).

### 5.5 Application (bloc 8)
Le module charge Three.js depuis le bloc 2 (texte → `Blob` → `import()`), puis enchaîne à chaque image affichée (`requestAnimationFrame`) :

1. **`sense()`** : traduit la situation dans l'arène en fréquences sur les capteurs (tête sur une goutte → goût ; taille et côté de l'ombre → looming gauche ou droit ; souffle → antennes).
2. **`brain.step()`** : simule le cerveau jusqu'à rattraper le temps réel, avec un budget d'environ 9 ms par image.
3. **`readout()`** : lisse les fréquences des neurones de sortie (constante de 150 ms).
4. **`behave()`** : choisit le comportement à partir des neurones, par ordre de priorité. Fibre géante > 50 Hz → décollage ; aBN1 ou aDN1 > 8 Hz → toilette ; MN9 > 12 Hz → repas ; MDN > 1 Hz → recul ; sinon, marche. Les virages suivent la différence DNa droite − DNa gauche. Cette fonction fait aussi avancer les oscillateurs des pattes et le déplacement du corps.
5. **`poseFly()`** : compose la posture (pas enregistrés, fondu vers la toilette, trompe, ailes), puis place la mouche dans l'arène.
6. **Affichage** : rendu 3D, plan rond, cerveau, jauges et journal.

Le même bloc gère aussi la nouvelle : `unlock(i)` ouvre un chapitre, dans l'ordre, et l'enregistre ; `renderStory()` affiche les chapitres ouverts et l'indice du suivant. Un petit programme de marche, déclenché de temps en temps, fait décrire à la mouche la trace du chapitre IV. C'est le seul mouvement de ce type, et il s'interrompt dès que le cerveau décide autre chose (manger, fuir, faire sa toilette).

Les constantes utiles à modifier se trouvent au début de ce bloc et dans `behave()` :
- `R` : rayon de l'arène, 30 mm ;
- `DROP_R` : rayon des gouttes ;
- fréquences de stimulation : 110 Hz pour le goût, 150 Hz pour le souffle, jusqu'à 170 Hz pour l'ombre ;
- seuils de décision ;
- `f = 12` : fréquence des pas en Hz.

---

## 6. Limites

- Il n'y a ni apprentissage, ni neuromodulation (dopamine, faim…), ni état interne : le modèle ne connaît que le câblage.
- Les poids synaptiques sont proportionnels au nombre de synapses. C'est une approximation.
- L'odorat n'est pas inclus : dans ce modèle, une odeur à gauche ou à droite fait tourner la mouche du même côté.
- Il n'y a pas de moteur physique. Les pieds peuvent légèrement glisser et le décollage est une trajectoire dessinée.
- Sur un ordinateur ou un téléphone lent, la simulation peut tourner moins vite que le temps réel.

---

## 7. Considérations éthiques

Pour cette page, les enjeux sont modestes. Ils deviennent sérieux quand on imagine où mène cette démarche : des cerveaux simulés complets, puis des cerveaux de mammifères.

### 7.1 La simulation peut-elle ressentir quelque chose ?

C'est la question la plus profonde. On discute aujourd'hui sérieusement de la sensibilité des insectes : la *Déclaration de New York sur la conscience animale* (2024) juge « réaliste » la possibilité d'une expérience consciente chez les insectes. Les drosophiles montrent des états proches de la douleur chronique, de l'anxiété, de la motivation ou du sommeil.

Pour cette simulation, la réponse est très probablement non. Elle ne contient :
- que 4 027 neurones sur environ 140 000 ;
- ni neuromodulation (dopamine, sérotonine, octopamine), qui porte les états internes comme la faim, la peur ou l'éveil ;
- ni mémoire, ni apprentissage, ni activité spontanée : sans stimulation, le réseau est silencieux ;
- que des réflexes, du capteur vers la sortie motrice.

C'est un circuit réflexe fidèle, pas un « esprit ». La question se posera plus sérieusement avec un cerveau complet, doté de neuromodulation, capable d'apprendre et placé dans un corps qui agit sur son monde.

Personne ne sait aujourd'hui dire à partir de quand un système simulé mérite une considération morale. Quelques précautions raisonnables :
- ne pas multiplier sans raison des simulations d'états aversifs (douleur, peur prolongée), en particulier à grande échelle ou sur de longues durées ;
- réfléchir à ce seuil *avant* de l'atteindre, et non après ;
- ne pas écarter la question au motif que « ce n'est qu'un programme », ni l'exagérer au motif que « c'est un vrai cerveau ».

### 7.2 Le rapport aux animaux réels

C'est plutôt l'aspect positif. Ces modèles s'inscrivent dans le principe des « 3R », qui encadre l'expérimentation animale en Europe (directive 2010/63/UE) :
- **Remplacer** : certaines hypothèses peuvent être testées d'abord sur ordinateur ;
- **Réduire** : le modèle aide à cibler les expériences les plus utiles. Le modèle de Shiu et al. a ainsi prédit des neurones impliqués dans l'alimentation et la toilette, confirmés ensuite sur de vraies mouches ;
- **Raffiner** : on comprend mieux les circuits avant de les manipuler.

Il faut rester lucide : **tout ce que montre cette page vient de vraies mouches.**
- Le connectome provient d'un cerveau fixé, découpé en milliers de tranches et imagé au microscope électronique.
- La toilette enregistrée provient d'une mouche génétiquement modifiée, dont on activait les neurones par la lumière (optogénétique).
- Les pas proviennent de mouches filmées sur une boule qui roule sous elles.

La simulation ne remplace pas la recherche animale : elle en dépend et peut la rendre plus économe. Les insectes ne sont d'ailleurs pas couverts par la réglementation européenne sur l'expérimentation animale, ce qui rend la responsabilité des chercheurs d'autant plus importante.

### 7.3 L'honnêteté de la présentation

C'est l'enjeu le plus concret aujourd'hui, et il concerne quiconque partage cette page. Des titres comme « une mouche téléchargée dans un ordinateur » ou « un robot doté d'un vrai cerveau de mouche » sont trompeurs, car :
- ils laissent croire qu'on sait reproduire un animal entier, alors qu'on reproduit un câblage partiel et simplifié ;
- ils nourrissent des idées fausses sur le « téléchargement de l'esprit » (*mind uploading*) ;
- ils peuvent entamer la confiance du public envers la recherche quand la réalité se révèle plus modeste.

Cette page distingue donc ce qui vient du connectome, ce qui a été enregistré et ce qui a été programmé (section 2, et l'étiquette affichée en haut de la vue 3D). En la partageant, gardez ces nuances, citez les limites (section 6) et ne présentez pas la page comme « la mouche entière dans l'ordinateur ».

### 7.4 Les usages détournés

Les circuits d'insectes inspirent la robotique et les drones : fuite devant une menace, évitement d'obstacles, navigation économe en énergie. Ces usages sont surtout bénéfiques (robots de recherche et de sauvetage, systèmes à faible consommation), mais les mêmes idées peuvent servir à des drones militaires ou de surveillance. Pour ce projet, le risque est faible et diffus : les principes sont publiés depuis longtemps, et la page n'apporte aucune capacité nouvelle. Il reste utile d'en avoir conscience quand on fait évoluer ces outils.

### 7.5 Vers les mammifères et l'être humain

La même démarche progresse vite. Des connectomes de souris sont en cours, et des fragments de cortex humain ont déjà été cartographiés, par exemple un millimètre cube publié par Harvard et Google en 2024. Plusieurs questions restent ouvertes :
- **Consentement** : le tissu humain provient de patients opérés ou de donneurs. Ont-ils consenti à ce que leur cerveau soit numérisé, publié, simulé ?
- **Vie privée** : un connectome humain est-il une donnée personnelle ? Il pourrait un jour contenir des traces de souvenirs, de compétences ou de traits de personnalité. Le règlement européen sur la protection des données (RGPD) ne prévoit pas spécifiquement ce cas.
- **Identité** : une simulation fidèle d'un cerveau humain serait-elle une personne ? Aurait-elle des droits ? Qui en serait responsable ?
- **Statut moral** : la question de la section 7.1 devient alors beaucoup plus aiguë.

Ni le droit ni l'éthique n'ont encore tranché ces questions. Elles méritent d'être débattues publiquement avant que la technique ne les impose.

### 7.6 Science ouverte, crédit et usage responsable

- Ce travail n'existe que grâce aux données et au code publiés en accès libre par FlyWire, l'EPFL et les auteurs de l'article de *Nature*. Les citer (section 8) et respecter leurs licences fait partie d'un usage responsable.
- Le code de cette page a été généré avec l'aide d'une IA (Claude). Il a été vérifié à chaque étape (comparaison au modèle original, contrôle des mouvements), mais il peut contenir des erreurs. Il ne doit pas être présenté comme une publication scientifique validée par des pairs.
- La simulation est peu coûteuse en énergie : elle tourne en temps réel dans un navigateur. Préparer le sous-cerveau a en revanche demandé des centaines de simulations du cerveau complet.

### 7.7 En résumé

| Enjeu | Pour cette page | Pour la suite du domaine |
|---|---|---|
| Ressenti de la simulation | très improbable | question sérieuse et ouverte |
| Animaux réels | peut réduire les expériences, mais en dépend | même logique, à plus grande échelle |
| Honnêteté de la présentation | **enjeu principal** | enjeu majeur face à l'engouement médiatique |
| Usages détournés | risque faible | à surveiller |
| Données humaines | sans objet | consentement, vie privée, identité |

---

## 8. Sources et licences

- **Modèle de cerveau.** Shiu P.K. et al., « A Drosophila computational brain model reveals sensorimotor processing », *Nature* 634, 210–219 (2024). Code : <https://github.com/philshiu/Drosophila_brain_model> (MIT).
- **Connectome.** FlyWire Consortium, Dorkenwald et al., *Nature* 2024. Annotations : Schlegel et al., *Nature* 2024. Données : <https://github.com/flyconnectome/flywire_annotations>.
- **Corps 3D et pas enregistrés.** NeuroMechFly v2 / flygym, Neuroengineering Laboratory, EPFL : <https://github.com/NeLy-EPFL/flygym>.
- **Toilette enregistrée.** NeuroMechFly v1 (Lobato-Rios et al., *Nature Methods* 2022), données DeepFly3D : <https://github.com/NeLy-EPFL/NeuroMechFly>.
- **Moteur 3D.** Three.js 0.169 (MIT) : <https://threejs.org>.

Ces données et logiciels restent la propriété de leurs auteurs. Citez-les si vous réutilisez ce travail.

---

Merci à Claude pour la génération de ce code.
