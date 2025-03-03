/**
 * Récupère la liste des photographes depuis un fichier JSON.
 * @returns {Promise<Object>} Une promesse contenant les données des photographes.
 */
export async function getPhotographers() {
    const response = await fetch('data/photographers.json');
    const photographers = await response.json();
    return photographers;
}

/**
 * Récupère la liste des médias depuis un fichier JSON.
 * @returns {Promise<Object>} Une promesse contenant les données des médias.
 */
export async function getMedias() {
    const response = await fetch('data/photographers.json');
    const media = await response.json();
    return media;
}
