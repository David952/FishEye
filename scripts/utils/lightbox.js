const lightboxSection = document.querySelector('.lightbox_section');
const lightboxContent = document.querySelector('.lightboxImageText');
const lightboxClose = document.querySelector('.close');
const lightboxText = document.querySelector('.lightboxText');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;
let lightboxMedias = [];

export function displayLightbox(src, alt, index) {
    lightboxSection.style.display = "block";
    lightboxSection.ariaHidden = "false";
    document.body.style.overflow = "hidden";
    currentIndex = index;
    lightboxText.textContent = alt;

    const existingMediaElement = lightboxContent.querySelector('.lightboxImage, .lightboxVideo');
    if (existingMediaElement) {
        existingMediaElement.remove();
    }

    let mediaElement;

    if (src.endsWith('.mp4')) {
        mediaElement = document.createElement('video');
        mediaElement.className = 'lightboxVideo';
        mediaElement.src = src;
        mediaElement.controls = true;
    } else {
        mediaElement = document.createElement('img');
        mediaElement.className = 'lightboxImage';
        mediaElement.src = src;
        mediaElement.alt = alt;
    }

    lightboxContent.insertBefore(mediaElement, lightboxText);
}

function closeLightbox() {
    lightboxSection.style.display = "none";
    lightboxSection.ariaHidden = "true";
    document.body.style.overflow = "auto";
}

function showPrevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = lightboxMedias.length - 1;
    }

    const media = lightboxMedias[currentIndex];
    displayLightbox(media.src, media.alt, currentIndex);
}

function showNextImage() {
    currentIndex++;
    if (currentIndex >= lightboxMedias.length) {
        currentIndex = 0;
    }

    const media = lightboxMedias[currentIndex];
    displayLightbox(media.src, media.alt, currentIndex);
}

export function setLightboxMedias(items) {
    lightboxMedias = items;
}


lightboxClose.addEventListener("click", closeLightbox);
prevButton.addEventListener("click", showPrevImage);
nextButton.addEventListener("click", showNextImage);

document.addEventListener("keydown", e => {
    if (lightboxSection.ariaHidden === "false") {
        if (e.key === "Escape") {
            closeLightbox();
        } else if (e.key === "ArrowLeft") {
            showPrevImage();
        } else if (e.key === "ArrowRight") {
            showNextImage();
        }
    }
});