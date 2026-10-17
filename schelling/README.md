# Le jeu de Schelling

Un petit jeu sur le modèle de ségrégation de Thomas Schelling (1971). Des pièces de cuivre et d'argent occupent un damier. Chaque pièce accepte d'être en minorité, à condition qu'une part minimale de ses voisines lui ressemble. Votre objectif : **loger tout le monde en gardant la ville plus mixte que le hasard.**

Le jeu ext ici : [jeu-schelling.html](https://hagrou.github.io/bricolabo/schelling/jeu-schelling.html): le jeu complet, avec ce README affiché dans la colonne de gauche. Il suffit de l'ouvrir dans un navigateur.

## Le modèle

- Le damier contient deux groupes de taille égale (cuivre et argent) et des cases vides.
- Les voisines d'une pièce sont les 8 cases qui l'entourent (moins sur les bords).
- Une pièce est **satisfaite** si la part de voisines semblables parmi ses voisines occupées atteint le seuil choisi. Une pièce sans aucune voisine est satisfaite.
- Une pièce insatisfaite veut déménager vers une case vide.

## Comment jouer

1. Touchez une pièce pour la sélectionner. Les pièces insatisfaites sont **trouées**.
2. Les cases vides affichent alors un point. Un **gros point** marque une case où la pièce serait satisfaite.
3. Touchez une case vide pour y déménager la pièce. Vous pouvez aussi déplacer une pièce déjà satisfaite.
4. La partie est gagnée quand toutes les pièces sont satisfaites **et** que la moyenne de voisins semblables est inférieure au repère du hasard.

## Les commandes

| Bouton | Effet |
| --- | --- |
| Laisser faire | La simulation tourne seule jusqu'à ce que tout le monde soit satisfait. |
| Un pas au hasard | Une pièce insatisfaite, tirée au hasard, déménage. |
| Rejouer cette ville | Repart de la même disposition de départ. |
| Nouvelle ville | Tire une nouvelle disposition au hasard. |

Les réglages :

- **Voisins semblables exigés** : de 10 % à 75 % (34 % par défaut, soit environ un tiers).
- **Cases vides** : de 5 % à 40 % du damier (15 % par défaut).
- **Taille du damier** : 8 × 8, 12 × 12 ou 18 × 18.

## Le repère du hasard

À chaque nouvelle ville, le jeu simule en arrière-plan la dynamique « au hasard » : à chaque pas, une pièce insatisfaite tirée au sort déménage vers une case vide où elle serait satisfaite (ou vers n'importe quelle case vide s'il n'y en a aucune). La moyenne de voisins semblables obtenue à la fin sert de repère, affiché par le trait vert sur la jauge.

## Ce que montre le jeu

Des préférences modérées suffisent à produire une forte ségrégation. Avec un seuil d'un tiers, la ville laissée à elle-même finit généralement avec une large majorité de voisins semblables, bien au-delà de ce que chacun demandait.

- **On ne peut pas déduire les intentions du résultat.** Une ville très ségréguée ne prouve pas que ses habitants sont très intolérants.
- **L'équilibre mixte est fragile.** Chaque départ rend l'ancien quartier moins mixte et le nouveau plus homogène, ce qui peut déclencher d'autres départs en chaîne.
- **La coordination change l'issue.** En choisissant vous-même les déménagements, vous pouvez satisfaire tout le monde avec une ville plus mixte.

Le modèle montre que des préférences modérées *suffisent* à produire la ségrégation, pas qu'elles en sont la cause réelle. Dans les villes réelles, les revenus, les prix du logement, les politiques publiques et les discriminations jouent aussi un rôle important.

## Référence

Thomas C. Schelling, « Dynamic Models of Segregation », *Journal of Mathematical Sociology*, vol. 1, n° 2, 1971, p. 143-186.
