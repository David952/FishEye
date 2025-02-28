const lightboxSection = document.querySelector('.lightbox_section');
const lightboxContent = document.querySelector('.lightboxImageText');
const lightboxClose = document.querySelector('.close');
const lightboxText = document.querySelector('.lightboxText');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let mediaId
let currentIndex = 0;
let lightboxMedias = [];

const focusableElements = 'button, [tabindex="0"]';
let focusableContent;
let firstFocusableElement;
let lastFocusableElement;

export function displayLightbox(src, alt, index, id) {
    lightboxSection.style.display = "block";
    lightboxSection.ariaHidden = "false";
    lightboxSection.ariaModal = "true";
    document.body.style.overflow = "hidden";
    
    currentIndex = index;
    mediaId = id;
    lightboxText.textContent = alt;

    focusableContent = lightboxSection.querySelectorAll(focusableElements);
    firstFocusableElement = focusableContent[0];
    lastFocusableElement = focusableContent[focusableContent.length - 1];
    lightboxClose.focus();

    const existingMediaElement = lightboxContent.querySelector('.lightboxImage, .lightboxVideo');
    if (existingMediaElement) {
        existingMediaElement.classList.remove('active');
        setTimeout(() => {
            existingMediaElement.remove();
        }, 1);
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

    setTimeout(() => {
        mediaElement.classList.add('active');
    }, 10);
}

document.addEventListener('keydown', trapFocus);

function trapFocus(event) {
    if (lightboxSection.ariaHidden === "false") {
        if (event.key === "Tab") {
            if (event.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    }
}

function closeLightbox() {
    lightboxSection.style.display = "none";
    lightboxSection.ariaHidden = "true";
    lightboxSection.ariaModal = "false";
    document.body.style.overflow = "auto";
    if (mediaId) {
        document.querySelector(`#${mediaId}`).focus();
    }
}

function showPrevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = lightboxMedias.length - 1;
    }

    const mediaContent = lightboxMedias[currentIndex];
    displayLightbox(mediaContent.src, mediaContent.alt, currentIndex);
}

function showNextImage() {
    currentIndex++;
    if (currentIndex >= lightboxMedias.length) {
        currentIndex = 0;
    }

    const mediaContent = lightboxMedias[currentIndex];
    displayLightbox(mediaContent.src, mediaContent.alt, currentIndex);
}

export function setLightboxMedias(items) {
    lightboxMedias = items;
}


lightboxClose.addEventListener("click", closeLightbox);
prevButton.addEventListener("click", showPrevImage);
nextButton.addEventListener("click", showNextImage);

prevButton.addEventListener("keypress", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        showPrevImage();
    }
});

nextButton.addEventListener("keypress", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        showNextImage();
    }
});


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