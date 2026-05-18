# JobSeka — plateforme d'emploi fullstack

JobSeka est une job board développée en React et ASP.NET Core. Les utilisateurs peuvent s'inscrire en tant que **candidat** (recherche d'offres, candidatures) ou **recruteur** (publication d'offres, gestion des candidatures).

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React 19, Vite 6, React Router 7, Tailwind CSS 4 |
| Backend | ASP.NET Core 10, C# |
| Base de données | SQL Server (Entity Framework Core 10) |
| Auth | JWT (Bearer) |
| API | REST |

## Structure du dépôt

```
JobSeka/
├── frontend/          # Application React (Vite)
├── backend/           # API ASP.NET Core (JobSeka.Server)
└── JobSeka.sln        # Solution .NET
```

## Fonctionnalités existantes

- **Authentification** : inscription, connexion, rôles candidat / recruteur / admin
- **Offres d'emploi** : liste, détail, création (recruteur)
- **Candidatures** : dépôt, consultation, message de motivation
- **Entreprises** : liste des sociétés, fiche détail avec offres associées
- **Compte utilisateur** : candidatures envoyées (candidat), offres publiées (recruteur)
- **Administration** : liste des utilisateurs, suppression d'utilisateur

## Pistes d'amélioration

- Panneau admin : CRUD complet des entreprises
- Offres sauvegardées (« favoris »)
- Page « Mes candidatures » dédiée pour les candidats
- Profil enrichi (compétences, CV, préférences)
- Centraliser l'URL de l'API côté frontend (variable d'environnement)
- Tests automatisés (API + composants)
- Déploiement documenté (CI/CD, variables d'environnement production)

## Prérequis

- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (LTS recommandé)
- SQL Server (local ou instance distante)

## Installation et lancement

### Backend

```bash
cd backend
cp appsettings.Development.example.json appsettings.Development.json
# Éditer appsettings.Development.json avec votre chaîne SQL et clé JWT
dotnet restore
dotnet ef database update   # si la base n'existe pas encore
dotnet run
```

API par défaut : `https://localhost:7103`

**Secrets locaux (recommandé)** — alternative au fichier `appsettings.Development.json` :

```bash
cd backend
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=...;Database=jobseeker;..."
dotnet user-secrets set "Jwt:Key" "votre-cle-secrete-d-au-moins-32-caracteres"
```

Les user secrets ne sont jamais versionnés. Le fichier `appsettings.Development.json` est ignoré par Git.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Interface : `http://localhost:5173`

## Configuration sensible

Ne commitez **jamais** :

- `backend/appsettings.Development.json` (chaîne SQL, clé JWT)
- Dossiers `bin/`, `obj/`, `publish/`

Utilisez `backend/appsettings.Development.example.json` comme modèle. Si une clé JWT a déjà été poussée sur le dépôt distant, **générez-en une nouvelle** avant la mise en production.
