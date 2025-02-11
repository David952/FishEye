const lightboxSection = document.querySelector('.lightbox_section');
const lightboxImage = document.querySelector('.lightboxImage');
const lightboxClose = document.querySelector('.close');
const lightboxText = document.querySelector('.lightboxText');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;
let mediaItems = [];

export function displayLightbox(src, alt, index) {
    lightboxSection.style.display = "block";
    lightboxSection.ariaHidden = "false";
    document.body.style.overflow = "hidden";
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxText.textContent = alt;
    currentIndex = index;
}

function closeLightbox() {
    lightboxSection.style.display = "none";
    lightboxSection.ariaHidden = "true";
    document.body.style.overflow = "auto";
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    const { src, alt } = mediaItems[currentIndex];
    displayLightbox(src, alt, currentIndex);
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % mediaItems.length;
    const { src, alt } = mediaItems[currentIndex];
    displayLightbox(src, alt, currentIndex);
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

export function setMediaItems(items) {
    mediaItems = items;
}