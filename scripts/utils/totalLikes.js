/**
 * Calcule le total des likes pour un tableau de médias donné.
 * Parcourt chaque média dans le tableau et additionne les likes pour obtenir un total.
 * 
 * @param {Array<Object>} medias - Un tableau d'objets représentant les médias, où chaque objet contient une propriété `likes`.
 * @returns {number} - Le total des likes pour tous les médias.
 */
function calculateTotalLikes(medias) {
    let total = 0;

    for (let i = 0; i < medias.length; i++) {
        total += medias[i].likes;
    }

    return total;
}

/**
 * Met à jour l'affichage du total des likes dans le DOM.
 * 
 * @param {Array<Object>} medias - Un tableau d'objets représentant les médias, où chaque objet contient une propriété `likes`.
 */
export function updateTotalLikes(medias) {
    const totalLikesElement = document.getElementById('totalLikes');
    totalLikesElement.ariaLabel = `Total likes : ${calculateTotalLikes(medias)}`;

    const totalLikes = calculateTotalLikes(medias);
    totalLikesElement.textContent = totalLikes;
}