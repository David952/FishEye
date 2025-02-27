import { getPhotographerMedias, mediaSection, photographerName } from "../pages/photographer.js";
import { mediaTemplate } from "../templates/media.js";
import { setLightboxMedias } from "./lightbox.js";
import { updateTotalLikes } from "./totalLikes.js";

const sortDropdown = document.querySelector('select');
let photographerMedias;

export function initializePhotographerMedias() {
    photographerMedias = getPhotographerMedias();
}

sortDropdown.addEventListener('change', (event) => {
    const sortBy = event.target.value;
    console.log(sortBy);
    sortMedias(sortBy);
})

export function sortMedias(sortBy) {
    let sortedMedias = [...photographerMedias];
    console.log(sortedMedias);

    switch(sortBy) {
        case 'popularity':
            sortedMedias.sort((a, b) => b.likes - a.likes);
            break;
        case 'date':
            sortedMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'title':
            sortedMedias.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default :
            break;
    }
    
    updateMediaDisplay(sortedMedias);
    updateLightbox(sortedMedias);
}

function updateMediaDisplay(medias) {
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

function updateLightbox(medias) {
    const lightboxMedias = medias.map((mediaData, index) => ({
        src: `assets/images/${photographerName}/${mediaData.video || mediaData.image}`,
        alt: mediaData.title,
        index
    }));

    setLightboxMedias(lightboxMedias);
}