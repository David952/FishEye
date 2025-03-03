import { getPhotographers, getMedias } from "../utils/getPhotographersMedias.js";
import { photographerTemplate } from "../templates/photographer.js";
import { mediaTemplate } from "../templates/media.js";
import { setLightboxMedias } from "../utils/lightbox.js";
import { updateTotalLikes } from "../utils/totalLikes.js";
import { initializePhotographerMedias, sortMedias } from "../utils/sort.js";

// Récupération des paramètres de l'URL pour obtenir l'ID du photographe
const params = new URLSearchParams(window.location.search);
const photographerId = params.get("id");

// Récupération des données des photographes et des médias
const { photographers } = await getPhotographers();
const { media } = await getMedias();

// Vérification de la validité de l'ID du photographe
const validIds = photographers.map(p => p.id.toString());
if (!photographerId || !validIds.includes(photographerId)) {
    window.location.href = "index.html";
} 

// Recherche du photographe correspondant à l'ID
const photographer = photographers.find(p => p.id.toString() === photographerId);
const photographerModel = photographerTemplate(photographer);
const { article, img } = photographerModel.getUserCardDOM({ isHomePage: false });

// Ajout des informations du photographe à l'en-tête de la page
const photographerHeader = document.querySelector(".photograph-header");
photographerHeader.appendChild(article);
photographerHeader.appendChild(img);

// Nom du photographe, utilisé pour générer les chemins des médias et l'affichage
export const photographerName = photographer.name;

// Section contenant les médias du photographe
export const mediaSection = document.querySelector('.medias_section');

let photographerMedias = [];

/**
 * Définit les médias du photographe en filtrant les médias par ID et en ajoutant un état "isLiked".
 * @param {Array} medias - Liste complète des médias à filtrer et à associer au photographe.
 */
export function setPhotographerMedias(medias) {
    photographerMedias = medias.filter(m => m.photographerId === parseInt(photographerId)).map(media => ({
        ...media,
        isLiked: false,
    }));
}

/**
 * Récupère les médias du photographe.
 * @returns {Array} Liste des médias du photographe.
 */
export function getPhotographerMedias() {
    return photographerMedias;
}

/**
 * Affiche les médias du photographe dans la section dédiée.
 * 
 * Réinitialise d'abord le contenu de la section, puis crée et ajoute chaque média à partir du template.
 * Met également à jour le total des likes.
 * 
 * @param {Array} medias - Liste des médias à afficher.
 */
export function photographerMediasDisplay(medias) {
    mediaSection.innerHTML = '';
    
    medias.forEach((mediaData, index) => {
        const originalMediaData = photographerMedias.find(m => m.id === mediaData.id);
        
        const mediaModel = mediaTemplate({
            ...mediaData,
            photographerName,
            index,
            isLiked: originalMediaData ? originalMediaData.isLiked : false
        }, photographerMedias);
        
        const mediaCard = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCard);
    });
    
    updateTotalLikes(photographerMedias);
}

/**
 * Initialise les médias pour la lightbox en récupérant les éléments du DOM.
 */
export function lightboxMedias() {
    const mediaElements = document.querySelectorAll('.thumb-imgfull');
    
    const lightboxMedias = Array.from(mediaElements).map((element, index) => {
        const mediaElement = element.querySelector('.thumb-img');
        const titleElement = element.querySelector('.thumb-text');
        return {
            src: mediaElement.src,
            alt: titleElement.textContent,
            index
        };
    });
    
    setLightboxMedias(lightboxMedias);
}

/**
 * Gère l'affichage des médias du photographe.
 * @param {Array} medias - Liste des médias du photographe.
 */
function displayMedias(medias) {
    setPhotographerMedias(medias);
    initializePhotographerMedias();
    sortMedias('popularity');
    updateTotalLikes(photographerMedias);
}

// Affichage des médias du photographe
displayMedias(media);