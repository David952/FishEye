const lightboxSection = document.querySelector('.lightbox_section');
const lightboxImage = document.querySelector('.lightboxImage');
const lightboxClose = document.querySelector('.close');
const lightboxText = document.querySelector('.lightboxText');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const imgSection = document.querySelectorAll('.medias_section');
console.log(imgSection);

let currentIndex = 0;
console.log('Début currentIndex : ', currentIndex);
let mediaItems = [];
console.log('Début mediaItems : ', mediaItems);

export function displayLightbox(src, alt, index) {
    console.log("Appel à displayLightbox avec index :", index);
    console.log("Liste actuelle des médias (displayLightbox) :", mediaItems);

    lightboxSection.style.display = "block";
    lightboxSection.ariaHidden = "false";
    document.body.style.overflow = "hidden";
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxText.textContent = alt;
    currentIndex = index;

    console.log('currentIndex après update (displayLightbox) : ', currentIndex);
}

function closeLightbox() {
    lightboxSection.style.display = "none";
    lightboxSection.ariaHidden = "true";
    document.body.style.overflow = "auto";
}

function showPrevImage() {
    console.log("currentIndex avant changement :", currentIndex);
    currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    console.log("currentIndex après changement :", currentIndex);

    const { src, alt } = mediaItems[currentIndex];
    displayLightbox(src, alt, currentIndex);
}

function showNextImage() {
    console.log("currentIndex avant changement :", currentIndex);
    currentIndex = (currentIndex + 1) % mediaItems.length;
    console.log("currentIndex après changement :", currentIndex);

    const { src, alt } = mediaItems[currentIndex];
    displayLightbox(src, alt, currentIndex);
}

export function setMediaItems(items) {
    mediaItems = items;
    console.log('mediaItems (setMediaItems) : ', mediaItems);
}


imgSection.forEach((thumbImg, index) => {
    thumbImg.addEventListener("click", (event) => {
        console.log("Click détecté sur miniature :", event.target);
        console.log("Index envoyé :", index);
        displayLightbox(thumbImg.src, thumbImg.alt, index);
    });
});

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
