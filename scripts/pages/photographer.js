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

function displayMedias(medias) {

    setPhotographerMedias(medias);

    initializePhotographerMedias();
    
    sortMedias('popularity');

    updateTotalLikes(photographerMedias);
}

displayMedias(media);