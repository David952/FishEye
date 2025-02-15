function calculateTotalLikes(medias) {
    return medias.reduce((total, media) => total + media.likes, 0);
}

export function updateTotalLikes(medias) {
    const totalLikesElement = document.getElementById('totalLikes');
    const totalLikes = calculateTotalLikes(medias);
    totalLikesElement.textContent = totalLikes;
}

window.addEventListener("scroll", () => {
    const banner = document.querySelector(".banner");
    const scrollY = window.scrollY;

    banner.style.transition = "transform 0.3s ease-out";
    banner.style.transform = `translateY(${scrollY}px)`;
});