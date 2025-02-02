# FishEye

## Présentation

FishEye est une plateforme permettant aux photographes indépendants de présenter leurs travaux et d'être contactés pour des événements ou des tirages. Ce projet vise à moderniser leur site web, actuellement statique, en un site dynamique et accessible.

## Objectifs

-   **Refonte du site** : Transformer un site statique en un site dynamique.
-   **Développement des pages principales** :
    -   **Page d’accueil** : Liste des photographes avec leurs informations et photo miniature.
    -   **Page photographe** : Galerie dynamique affichant photos et vidéos, avec système de likes et tri des médias.
-   **Accessibilité optimisée** : Navigation clavier, compatibilité avec les lecteurs d'écran, descriptions textuelles des médias.
-   **Lightbox interactive** : Affichage en plein écran des médias avec navigation clavier et boutons.
-   **Formulaire de contact** : Modale permettant d’envoyer un message aux photographes (affichage des données dans la console pour cette version).

## Contraintes techniques

-   **Respect des standards d’accessibilité (WCAG)** : HTML sémantique, attributs ARIA, images avec descriptions.
-   **Code organisé et maintenable** : Séparation des fichiers (HTML, CSS, JavaScript), respect des bonnes pratiques (ESLint, ES6+).
-   **Interactions dynamiques** : Gestion des événements clavier et souris, tri des médias par popularité ou titre.
-   **Utilisation du pattern Factory Method** : Distinction entre photos et vidéos dans la gestion des médias.

## Exigences spécifiques

-   Le site doit **fonctionner sans erreur en console**.
-   **Navigation et accessibilité testées** avec un lecteur d’écran.
-   **Pas besoin de responsive** pour cette version.