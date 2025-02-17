import { getPhotographerMedias, mediaSection, photographerName } from "../pages/photographer.js";
import { mediaTemplate } from "../templates/media.js";
import { setLightboxMedias } from "./lightbox.js";

const sortDropdown = document.querySelector('select');
const photographerMedias = getPhotographerMedias();

sortDropdown.addEventListener('change', (event) => {
    const sortBy = event.target.value;
    console.log(sortBy);

    sortMedias(sortBy, photographerMedias);
})

function sortMedias(sortBy, photographerMedias) {
    let sortedMedias = [...photographerMedias];
    console.log(sortedMedias);

    switch(sortBy) {
        case 'popularity' :
            photographerMedias.sort((a, b) => b.likes - a.likes);
            break;
        case 'date' :
            photographerMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'title' :
            photographerMedias.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default :
            break;
    }

    updateMediaDisplay(photographerMedias);

    updateLightbox(photographerMedias);
}

function updateMediaDisplay(medias) {
    mediaSection.innerHTML = '';

    medias.forEach((mediaData, index) => {
        const mediaModel = mediaTemplate({
            ...mediaData,
            photographerName,
            index
        });
        const mediaCard = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCard);
    });
}

function updateLightbox(medias) {

    const lightboxMedias = medias.map((mediaData, index) => ({
        src: `assets/images/${photographerName}/${mediaData.video || mediaData.image}`,
        alt: mediaData.title,
        index
    }));
    
    setLightboxMedias(lightboxMedias);
}