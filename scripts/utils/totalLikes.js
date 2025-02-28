function calculateTotalLikes(medias) {
    return medias.reduce((total, media) => total + media.likes, 0);
}

export function updateTotalLikes(medias) {
    const totalLikesElement = document.getElementById('totalLikes');
    totalLikesElement.ariaLabel = `Total des likes : ${calculateTotalLikes(medias)}`;
    
    const totalLikes = calculateTotalLikes(medias);
    totalLikesElement.textContent = totalLikes;
}