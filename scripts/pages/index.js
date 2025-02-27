import { getPhotographers } from "../utils/getPhotographersMedias.js";
import { photographerTemplate } from "../templates/photographer.js";

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const { article } = photographerModel.getUserCardDOM();
        photographersSection.appendChild(article);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();