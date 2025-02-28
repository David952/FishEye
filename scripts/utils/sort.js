import { getPhotographerMedias, photographerMediasDisplay, lightboxMedias} from "../pages/photographer.js";

const sortDropdown = document.querySelector('select');
let photographerMedias;

export function initializePhotographerMedias() {
    photographerMedias = getPhotographerMedias();
}

sortDropdown.addEventListener('click', () => {
    sortDropdown.ariaExpanded = "true";
})

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
    
    photographerMediasDisplay(sortedMedias);
    lightboxMedias();
}