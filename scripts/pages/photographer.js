import { getPhotographers, getMedias } from "../utils/getPhotographersMedias.js";
import { photographerTemplate } from "../templates/photographer.js";
import { mediaTemplate } from "../templates/media.js";
import { setMediaItems } from "../utils/lightbox.js";

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

const photographerName = photographer.name;

const formTitle = document.querySelector("h2");
formTitle.ariaLabel = `Contact me ${photographerName}`;
formTitle.textContent = `Contactez-moi ${photographerName}`;

function displayMedias(medias) {
    const mediaSection = document.querySelector('.medias_section');

    const photographerMedias = medias.filter(m => m.photographerId === parseInt(photographerId));

    const mediaItems = photographerMedias.map((mediaData, index) => ({
        src: `assets/images/${photographerName}/${mediaData.video || mediaData.image}`,
        alt: mediaData.title,
        index
    }));
    console.log(mediaItems);
    setMediaItems(mediaItems);

    photographerMedias.forEach(mediaData => {
        const mediaModel = mediaTemplate({
            ...mediaData,
            photographerName
        });
        const mediaCard = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCard);
    });
}

displayMedias(media);