import { initializeFocusableElements, trapFocus } from "./trapFocus.js";

const lightboxSection = document.querySelector('.lightbox_section');
const lightboxContent = document.querySelector('.lightboxImageText');
const lightboxClose = document.querySelector('.close');
const lightboxText = document.querySelector('.lightboxText');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let lightboxMedias = [];
let currentIndex = 0;
let mediaId

let firstFocusableElement;
let lastFocusableElement;

/**
 * Affiche la lightbox avec le média spécifié.
 * @param {string} src - Chemin du média (image ou vidéo).
 * @param {string} alt - Texte alternatif du média.
 * @param {number} index - Index du média dans la liste `lightboxMedias`.
 * @param {string} id - ID du média actuellement affiché.
 */
export function displayLightbox(src, alt, index, id) {
    lightboxSection.style.display = "block";
    lightboxSection.ariaHidden = "false";
    lightboxSection.ariaModal = "true";
    document.body.style.overflow = "hidden";
    
    currentIndex = index;
    mediaId = id;
    lightboxText.textContent = alt;

    // Initialiser les éléments focusables
    const { firstFocusableElement: first, lastFocusableElement: last } = initializeFocusableElements(lightboxSection);
    firstFocusableElement = first;
    lastFocusableElement = last;

    prevButton.focus();

    // Suppression du média existant dans la lightbox
    const existingMediaElement = lightboxContent.querySelector('.lightboxImage, .lightboxVideo');
    if (existingMediaElement) {
        existingMediaElement.classList.remove('active');
        setTimeout(() => {
            existingMediaElement.remove();
        }, 1);
    }

    // Création du nouvel élément média (image ou vidéo)
    let mediaElement;

    if (src.endsWith('.mp4')) {
        mediaElement = document.createElement('video');
        mediaElement.className = 'lightboxVideo';
        mediaElement.ariaLive = 'polite';
        mediaElement.src = src;
        mediaElement.controls = true;
    } else {
        mediaElement = document.createElement('img');
        mediaElement.className = 'lightboxImage';
        mediaElement.ariaLive = 'polite';
        mediaElement.src = src;
        mediaElement.alt = alt;
    }

    lightboxContent.insertBefore(mediaElement, lightboxText);

    setTimeout(() => {
        mediaElement.classList.add('active');
    }, 10);
}

/**
 * Affiche le média précédent dans la lightbox.
 * Si le média actuel est le premier, revient au dernier média de la liste.
 */
function closeLightbox() {
    lightboxSection.style.display = "none";
    lightboxSection.ariaHidden = "true";
    lightboxSection.ariaModal = "false";
    document.body.style.overflow = "auto";
    if (mediaId) {
        document.querySelector(`#${mediaId}`).focus();
    }
}

/**
 * Affiche le média précédent dans la lightbox.
 * Si le média actuel est le premier, revient au dernier média de la liste.
 */
function showPrevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = lightboxMedias.length - 1;
    }

    const mediaContent = lightboxMedias[currentIndex];
    displayLightbox(mediaContent.src, mediaContent.alt, currentIndex);
}

/**
 * Affiche le média suivant dans la lightbox.
 * Si le média actuel est le dernier, revient au premier média de la liste.
 */
function showNextImage() {
    currentIndex++;
    if (currentIndex >= lightboxMedias.length) {
        currentIndex = 0;
    }

    const mediaContent = lightboxMedias[currentIndex];
    displayLightbox(mediaContent.src, mediaContent.alt, currentIndex);
}

/**
 * Définit la liste des médias disponibles dans la lightbox.
 * @param {Array} items - Liste des médias à afficher dans la lightbox.
 */
export function setLightboxMedias(items) {
    lightboxMedias = items;
}

// Gestion des événements
lightboxClose.addEventListener("click", closeLightbox);
prevButton.addEventListener("click", showPrevImage);
nextButton.addEventListener("click", showNextImage);

// Écouteur d'événement pour le piège du focus
document.addEventListener('keydown', (event) => {
    trapFocus(event, firstFocusableElement, lastFocusableElement);
});

// Gestion de la navigation à la pression de la touche "Entrée/Espace" sur les boutons précédent et suivant
prevButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showPrevImage();
    }
});

nextButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        showNextImage();
    }
});

// Gestion de la navigation au clavier (flèches gauche/droite et touche "Escape")
document.addEventListener("keydown", (event) => {
    if (lightboxSection.ariaHidden === "false") {
        if (event.key === "Escape") {
            closeLightbox();
        } else if (event.key === "ArrowLeft") {
            showPrevImage();
        } else if (event.key === "ArrowRight") {
            showNextImage();
        }
    }
});