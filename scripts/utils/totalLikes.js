function calculateTotalLikes(medias) {
    return medias.reduce((total, media) => total + media.likes, 0);
}

export function updateTotalLikes(medias) {
    const totalLikesElement = document.getElementById('totalLikes');
    const totalLikes = calculateTotalLikes(medias);
    totalLikesElement.textContent = totalLikes;
}