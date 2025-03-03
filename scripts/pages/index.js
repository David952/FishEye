import { getPhotographers } from "../utils/getPhotographersMedias.js";
import { photographerTemplate } from "../templates/photographer.js";

/**
 * Affiche les données des photographes sur la page.
 * 
 * Cette fonction prend une liste de photographes, crée une carte pour chaque photographe
 * en utilisant le template `photographerTemplate`, et ajoute ces cartes à la section
 * des photographes dans le DOM.
 * 
 * @param {Array} photographers - Liste des photographes à afficher.
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const { article } = photographerModel.getUserCardDOM();
        photographersSection.appendChild(article);
    });
}

/**
 * Initialise l'application en récupérant les données des photographes et en les affichant sur la page.
 * 
 * Cette fonction appelle `getPhotographers` pour récupérer les données des photographes,
 * puis appelle `displayData` pour afficher ces données dans la section appropriée du DOM.
 */
async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

// Démarre l'initialisation de l'application
init();