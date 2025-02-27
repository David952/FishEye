import { getPhotographers, getMedias } from "../utils/getPhotographersMedias.js";
import { photographerTemplate } from "../templates/photographer.js";
import { mediaTemplate } from "../templates/media.js";
import { setLightboxMedias } from "../utils/lightbox.js";
import { updateTotalLikes } from "../utils/totalLikes.js";
import { initializePhotographerMedias, sortMedias } from "../utils/sort.js";

const params = new URLSearchParams(window.location.search);
const photographerId = params.get("id");
const { photographers } = await getPhotographers();

const { media } = await getMedias();

const validIds = photographers.map(p => p.id.toString());

if (!photographerId || !validIds.includes(photographerId)) {
    window.location.href = "index.html";
} 

const photographer = photographers.find(p => p.id.toString() === photographerId);

const photographerModel = photographerTemplate(photographer);

const { article, img } = photographerModel.getUserCardDOM({ isHomePage: false });

const photographerHeader = document.querySelector(".photograph-header");

photographerHeader.appendChild(article);
photographerHeader.appendChild(img);

export const photographerName = photographer.name;

const formTitle = document.querySelector("h2");
formTitle.ariaLabel = `Contact me ${photographerName}`;
formTitle.textContent = `Contactez-moi ${photographerName}`;

export const mediaSection = document.querySelector('.medias_section');

let photographerMedias;

export function setPhotographerMedias(medias) {
    photographerMedias = medias.filter(m => m.photographerId === parseInt(photographerId)).map(media => ({
        ...media,
        isLiked: false,
        }));
}

export function getPhotographerMedias() {
    return photographerMedias;
}

function photographerMediasDisplay() {
    photographerMedias.forEach((mediaData, index) => {
        const mediaModel = mediaTemplate({
            ...mediaData,
            photographerName,
            index,
            isLiked: mediaData.isLiked,
        }, photographerMedias);
        const mediaCard = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCard);
    });
}

function lightboxMedias() {
    const lightboxMedias = photographerMedias.map((lightboxData, index) => ({
        src: `assets/images/${photographerName}/${lightboxData.video || lightboxData.image}`,
        alt: lightboxData.title,
        index
    }));
    
    setLightboxMedias(lightboxMedias);
}

function displayMedias(medias) {

    setPhotographerMedias(medias);

    initializePhotographerMedias();
    
    sortMedias('popularity');
    
    photographerMediasDisplay();

    lightboxMedias();

    updateTotalLikes(photographerMedias);

}

displayMedias(media);