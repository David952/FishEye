import { getPhotographerMedias, photographerMediasDisplay, lightboxMedias } from "../pages/photographer.js";

// Élément <select> du dropdown de tri
const sortDropdown = document.querySelector('select');

// Variable pour stocker les médias du photographe
let photographerMedias;

/**
 * Initialise les médias du photographe en appelant la fonction getPhotographerMedias.
 * Cette fonction doit être appelée au chargement de la page pour récupérer les médias.
 */
export function initializePhotographerMedias() {
    photographerMedias = getPhotographerMedias();
}

// Ajoute un écouteur d'événement pour détecter les changements dans le dropdown de tri
sortDropdown.addEventListener('change', (event) => {
    const sortBy = event.target.value;
    sortMedias(sortBy);
});

/**
 * Trie les médias du photographe en fonction du critère de tri sélectionné.
 * @param {string} sortBy - Le critère de tri ('popularity', 'date', ou 'title').
 */
export function sortMedias(sortBy) {
    let sortedMedias = [...photographerMedias];

    switch (sortBy) {
        case 'popularity':
            sortedMedias.sort((a, b) => b.likes - a.likes);
            break;
        case 'date':
            sortedMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            console.log("Date :");
            sortedMedias.forEach(media => {
                console.log(media.date);
            });
            break;
        case 'title':
            sortedMedias.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            break;
    }

    photographerMediasDisplay(sortedMedias);
    lightboxMedias();
}