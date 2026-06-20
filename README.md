# bank-wave

bank-wave est une application bancaire locale pour suivre manuellement ses opérations, budgets mensuels et suggestions de gestion. Elle fonctionne dans le navigateur, sans compte, sans serveur distant et sans base de données : les données restent dans le `localStorage` du navigateur.

## Fonctionnalités

- Tableau de bord avec solde, dépenses du mois et revenus du mois.
- Ajout et suppression d'opérations de dépense ou de revenu.
- Budgets mensuels par catégorie, avec restant calculé automatiquement.
- Suggestions locales : budget dépassé, comparaison avec le mois précédent, catégorie la plus dépensière, épargne possible.
- Thème clair et thème synthwave.
- Interface français/anglais.
- Export CSV des opérations.
- Graphique local en HTML/CSS, sans dépendance distante.

## Utilisation rapide

Clone le dépôt puis ouvre `index.html` dans ton navigateur :

```bash
git clone https://github.com/SynthSpecter/bank-wave.git
cd bank-wave
```

Tu peux aussi lancer le serveur local intégré :

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:4173`.

## Vérification du code

Le projet n'a pas besoin de dépendances Node ni de CDN pour fonctionner. Le script suivant vérifie au minimum la syntaxe des fichiers JavaScript :

```bash
npm run check
```

## Structure

```text
bank-wave/
├── index.html
├── package.json
├── styles/
│   └── main.css
└── scripts/
    ├── app.js
    ├── budget.js
    ├── operations.js
    ├── suggestions.js
    ├── translations.js
    └── server.js
```

## Personnalisation

Les catégories par défaut sont définies dans `scripts/app.js`. Les libellés, icônes et messages traduits sont dans `scripts/translations.js`.

Pour ajouter une catégorie intégrée :

1. Ajoute la catégorie dans `DEFAULT_CATEGORIES`.
2. Ajoute ses libellés dans `translations.fr.categories` et `translations.en.categories`.
3. Ajoute une icône dans `categoryIcons`.

Les catégories ajoutées depuis l'interface sont conservées automatiquement en local.

## Confidentialité

bank-wave ne synchronise aucune donnée. Les opérations, budgets, préférences de langue, catégories et thème sont stockés uniquement dans le navigateur utilisé.

## Pistes d'amélioration

- Import JSON/CSV pour restaurer une sauvegarde.
- Tags sur les opérations.
- Statistiques annuelles.
- Tests automatisés des calculs de solde, budget et suggestions.
- Mode épargne avec objectifs mensuels.

## Licence

MIT
