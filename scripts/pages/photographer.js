import { getPhotographers } from "../utils/getPhotographers.js";
import { photographerTemplate } from "../templates/photographer.js";

const params = new URLSearchParams(window.location.search);
const photographerId = params.get("id");

const { photographers } = await getPhotographers();

const validIds = photographers.map(p => p.id.toString());

if (!photographerId || !validIds.includes(photographerId)) {
    window.location.href = "index.html";
} 

const photographer = photographers.find(p => p.id.toString() === photographerId);
console.log('Filtre ID:', photographer);

const photographerModel = photographerTemplate(photographer);
console.log('Photographe model: ', photographerModel);
const { article, img } = photographerModel.getUserCardDOM({ isHomePage: false });
console.log('userCardDOM: ', article);

const photographerHeader = document.querySelector(".photograph-header");
console.log('class :', photographerHeader);

photographerHeader.appendChild(article);
photographerHeader.appendChild(img);
