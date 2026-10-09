# Daisyworld

Une planète imaginaire où des pâquerettes noires et blanches maintiennent la température stable alors que leur soleil chauffe de plus en plus, sans intention ni plan d'ensemble.

Ce dossier contient [daisyworld.html](https://hagrou.github.io/bricolabo/cyber_fly/daisyworld.html), une simulation interactive du modèle. Ouvrez le fichier dans un navigateur : il fonctionne sans connexion internet.

## D'où vient ce modèle

Dans les années 1970, James Lovelock propose l'hypothèse Gaïa : la vie sur Terre participerait à la régulation des conditions qui la rendent possible (température, composition de l'atmosphère). La critique principale, portée notamment par Richard Dawkins et Ford Doolittle, est la suivante : comment des organismes pourraient-ils réguler une planète entière sans se concerter et sans but commun ? La sélection naturelle agit sur des individus, pas sur des planètes.

Daisyworld est la réponse de Lovelock, mise en équations avec Andrew Watson et publiée en 1983 dans la revue *Tellus* sous le titre « Biological homeostasis of the global environment: the parable of Daisyworld ». Lovelock la reprend ensuite dans *Les Âges de Gaïa* (1988). C'est une parabole mathématique : un monde volontairement simplifié à l'extrême pour montrer qu'une régulation peut émerger toute seule.

## Le principe

La planète n'abrite que deux espèces, qui ne diffèrent que par leur couleur :

| | Albédo | Effet local |
|---|---|---|
| Pâquerettes noires | 0,25 | absorbent la lumière, donc sont plus chaudes que la moyenne |
| Sol nu | 0,50 | neutre |
| Pâquerettes blanches | 0,75 | réfléchissent la lumière, donc sont plus fraîches que la moyenne |

L'albédo est la fraction de lumière renvoyée vers l'espace. Les deux espèces ont exactement la même physiologie : elles poussent le mieux à 22,5 °C et ne poussent plus du tout en dessous de 5 °C ni au-dessus de 40 °C.

Tout repose sur une boucle de rétroaction :

1. La couleur d'une pâquerette modifie sa température locale.
2. Sa température locale détermine sa vitesse de croissance.
3. La surface couverte par chaque couleur modifie l'albédo de la planète.
4. L'albédo de la planète modifie la température globale, ce qui ramène à l'étape 1.

**Quand le soleil est faible**, la planète est froide. Les noires, plus chaudes que leur environnement, sont les seules à atteindre une température viable : elles s'étendent, assombrissent la planète et la réchauffent.

**Quand le soleil devient fort**, les noires surchauffent et reculent. Les blanches, plus fraîches que leur environnement, prennent l'avantage : elles s'étendent, éclaircissent la planète et la refroidissent.

Aucune fleur ne « cherche » à réguler quoi que ce soit. Chacune pousse simplement là où les conditions lui conviennent, et la régulation est un effet de bord de cette compétition.

## Ce que l'on observe

En faisant croître lentement la luminosité du soleil, la simulation passe par quatre phases :

| Luminosité | État de la planète | Température |
|---|---|---|
| En dessous d'environ 72 % | Trop froide, aucune fleur | Identique à une planète morte |
| D'environ 72 % à 100 % | Les noires dominent | Environ 22 à 25 °C, bien plus chaude que sans vie |
| D'environ 100 % à 155 % | Les blanches remplacent les noires | Environ 20 à 26 °C, bien plus fraîche que sans vie |
| Au-delà d'environ 155 % | Effondrement brutal, plus aucune fleur | Rejoint d'un coup la planète morte, vers 60 °C |

Sur toute la plage habitée, la luminosité double pratiquement, et la température ne bouge que de quelques degrés. Une planète sans vie gagnerait dans le même temps une soixantaine de degrés.

Trois détails méritent l'attention :

- **La température baisse légèrement quand le soleil chauffe plus**, sur l'essentiel du plateau. La régulation fait plus que compenser.
- **L'effondrement est soudain.** Juste avant, la planète semble en parfaite santé. Un système régulé peut masquer une contrainte croissante jusqu'au point de rupture.
- **Il y a de l'hystérésis.** Si l'on fait redescendre la luminosité après l'effondrement, la vie ne repart pas au seuil où elle a disparu : il faut revenir nettement plus bas. De même, une fois installées, les fleurs survivent à des luminosités où elles n'auraient pas pu démarrer.

## Les équations

**Albédo de la planète**, moyenne pondérée des surfaces (`a_n` et `a_b` sont les fractions couvertes par les noires et les blanches, `x` la fraction de sol nu) :

```
A = a_n × 0,25 + a_b × 0,75 + x × 0,50        avec x = 1 − a_n − a_b
```

**Température d'équilibre de la planète** (loi de Stefan-Boltzmann, avec `S` = 917 W/m², `L` la luminosité relative et `σ` = 5,67 × 10⁻⁸) :

```
T = ( S × L × (1 − A) / σ )^(1/4)
```

**Température locale** de chaque espèce, d'autant plus éloignée de la moyenne que sa couleur diffère de celle de la planète (`q` = 20) :

```
T_locale = T + q × (A − albédo_de_l'espèce)
```

**Taux de croissance**, une parabole centrée sur 22,5 °C :

```
β = max( 0 ; 1 − 0,003265 × (22,5 − T_locale)² )
```

**Évolution des populations**, avec un taux de mortalité `γ` = 0,3 :

```
da/dt = a × ( x × β − γ )
```

Le terme `x × β` exprime la compétition pour l'espace : une espèce ne peut s'étendre que s'il reste du sol nu.

## Avec plus de deux espèces

La simulation permet de passer de 2 à 4, 10 ou 20 espèces. Leurs albédos sont répartis régulièrement entre 0,25 et 0,75 : ce sont des nuances de gris entre le noir et le blanc. Tout le reste est identique.

Mesuré sur cette simulation, en laissant le système se stabiliser à chaque luminosité :

| Espèces | Plage habitée | Écart de température entre 85 % et 145 % |
|---|---|---|
| 2 | environ 72 % à 154 % | 4,6 °C (de 19,2 à 23,8 °C) |
| 4 | environ 72 % à 154 % | 3,4 °C (de 21,6 à 25,0 °C) |
| 10 | environ 72 % à 154 % | 3,3 °C (de 22,6 à 25,9 °C) |
| 20 | environ 72 % à 154 % | 2,3 °C (de 22,6 à 24,9 °C) |

Trois enseignements :

- **La régulation est plus fine**, et la température reste plus proche de l'optimum de 22,5 °C. Les nuances se relaient progressivement au lieu d'un simple duel noir contre blanc.
- **La plage habitable ne s'élargit pas.** Les seuils d'apparition et d'effondrement sont fixés par les deux espèces extrêmes, la plus sombre et la plus claire. Ajouter des intermédiaires n'y change rien, et l'effondrement reste aussi brutal.
- **Peu d'espèces dominent à la fois.** Toutes poussent au départ, puis la compétition pour l'espace élimine lentement celles dont la température locale est la plus éloignée de l'optimum. À luminosité fixe, il ne reste à terme que quelques nuances voisines.

Dans ce modèle, la diversité améliore donc la précision de la régulation, mais pas sa portée.

## Ce que le modèle montre, et ses limites

Daisyworld démontre une chose précise : une régulation à l'échelle planétaire peut émerger d'interactions purement locales, sans finalité ni coordination. C'est une preuve de possibilité, pas une preuve que la Terre fonctionne ainsi.

Les objections les plus courantes :

- **Le modèle est construit pour réguler.** La couleur qui avantage une fleur localement est aussi celle qui arrange la planète. Rien ne garantit ce heureux alignement dans la nature.
- **Des tricheurs pourraient apparaître**, par exemple une fleur qui profiterait du climat sans payer le coût de la pigmentation. Des variantes du modèle avec mutations, fleurs grises, herbivores ou prédateurs ont été étudiées, et la régulation s'y maintient le plus souvent, parfois affaiblie.
- **La Terre réelle est autrement plus complexe** : océans, nuages, cycle du carbone, tectonique. Daisyworld en est une caricature assumée.

Le modèle reste une référence en sciences du système Terre et en théorie des systèmes complexes, parce qu'il illustre très simplement les notions de rétroaction, d'homéostasie, de seuil de basculement et d'hystérésis.

## Utiliser la simulation

- **Curseur « Soleil »** : règle la luminosité de 50 % à 180 %.
- **« Faire vieillir le soleil »** : fait croître la luminosité automatiquement, pour suivre toute l'histoire de la planète.
- **Boutons « Espèces »** : choisissent le nombre de nuances de pâquerettes. Au-delà de 2, le graphique garde en pointillés la courbe à 2 espèces pour comparer.
- **Curseur de zoom** (ou molette de la souris) : passe de la vue d'ensemble du système au gros plan sur les pâquerettes.
- **Graphique** : la courbe verte montre la température avec les pâquerettes, la courbe orange en pointillés celle d'une planète morte, et le point jaune l'état actuel.
- **Couleur du sol** : bleutée quand il fait froid, verte quand le climat est tempéré, ocre puis brûlée quand il fait chaud.

## Écarts par rapport au modèle d'origine

- Les deux planètes voisines sont un ajout décoratif, absent de l'article de 1983. Elles sont sans vie et servent de témoins : leur couleur suit leur température d'équilibre.
- La température locale utilise la forme linéarisée ci-dessus, une simplification courante de la formule en puissance quatre de l'article. Les seuils indiqués plus haut sont ceux de cette simulation et diffèrent légèrement de ceux de la publication.
- Un minimum de 1 % de chaque espèce est conservé en permanence, comme réserve de graines, pour que la vie puisse repartir.
- La répartition des fleurs en continents est purement esthétique : le modèle ne calcule que des fractions de surface. Tailles et distances ne sont pas à l'échelle.

## Références

- A. J. Watson et J. E. Lovelock, « Biological homeostasis of the global environment: the parable of Daisyworld », *Tellus B*, vol. 35, 1983.
- J. E. Lovelock, *Les Âges de Gaïa*, 1988 (traduction française, Robert Laffont, 1990).
- J. E. Lovelock, *La Terre est un être vivant : l'hypothèse Gaïa*, 1979.
