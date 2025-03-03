import { displayLightbox } from "../utils/lightbox.js";
import { updateTotalLikes } from "../utils/totalLikes.js";

/**
 * Modèle pour créer un élément média (image ou vidéo).
 * @param {Object} data - Informations sur le média.
 * @param {Array} photographerMedias - Liste des médias du photographe.
 * @returns {Object} Objet contenant la méthode `getMediaCardDOM` pour générer la carte média.
 */
export function mediaTemplate(data, photographerMedias) {
    const { image, video, title, likes, photographerName, isLiked, id } = data;

    /**
     * Génère la carte DOM pour un média.
     * Crée un élément `<article>` contenant un média (image ou vidéo), un titre, un compteur de likes et un bouton de like.
     * Gère également les événements pour la lightbox et les likes.
     * 
     * @returns {HTMLElement} Élément `<article>` représentant un média.
     */
    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.className = 'thumb-imgfull';

        const mediaElement = document.createElement(video ? 'video' : 'img');
        mediaElement.className = 'thumb-img';
        const mediaPath = `assets/images/${photographerName}/${video ? video : image}`;
        mediaElement.src = mediaPath;
        mediaElement.alt = `Photo : ${title}`;
        mediaElement.ariaLabel = title;
        mediaElement.tabIndex = "0";
        mediaElement.id = `media-${id}`;

        // Gestion de l'ouverture de la lightbox au clic ou à la pression de la touche "Entrée/Espace"
        mediaElement.addEventListener('click', () => {
            displayLightbox(mediaPath, title, data.index, mediaElement.id);
        });

        mediaElement.addEventListener("keypress", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                displayLightbox(mediaPath, title, data.index, mediaElement.id);
            }
        });

        const textLikesDiv = document.createElement('div');
        textLikesDiv.className = 'thumb-textLikes redColor';

        const titleText = document.createElement('p');
        titleText.className = 'thumb-text';
        titleText.textContent = title;

        const likesSpan = document.createElement('span');
        likesSpan.className = 'thumb-likes';
        likesSpan.textContent = `${likes}`;
        likesSpan.ariaLive = "polite";

        const heartButton = document.createElement('button');
        heartButton.type = 'button';
        heartButton.className = 'heart-button';
        heartButton.tabIndex = "0";

        const heartIcon = document.createElement('span');
        heartIcon.className = 'fa-heart redColor';

        if (isLiked) {
            heartIcon.classList.add("fa-solid");
        } else {
            heartIcon.classList.add("fa-regular");
        }

        /**
         * Met à jour l'icône de cœur et gère l'ajout/retrait de likes.
         * Ajoute un écouteur d'événement sur le bouton de like pour basculer entre les états "liké" et "non liké".
         */
        const updateHeartIcon = () => {
            heartButton.addEventListener('click', () => {
                const mediaItem = photographerMedias.find((item) => item.id === id);

                if (mediaItem) {
                    if (heartIcon.classList.contains('fa-solid')) {
                        mediaItem.likes -= 1;
                        heartIcon.classList.remove("fa-solid");
                        heartIcon.classList.add("fa-regular");
                        mediaItem.isLiked = false;
                        heartButton.ariaLabel = 'Add a like';
                    } else {
                        mediaItem.likes += 1;
                        heartIcon.classList.remove("fa-regular");
                        heartIcon.classList.add("fa-solid");
                        mediaItem.isLiked = true;
                        heartButton.ariaLabel = 'Remove a like';
                    }

                    likesSpan.textContent = mediaItem.likes;
                    likesSpan.appendChild(heartButton);
                    updateTotalLikes(photographerMedias);
                }
            });

            heartIcon.addEventListener("keypress", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    heartIcon.click();
                }
            });
        };

        updateHeartIcon();

        textLikesDiv.appendChild(titleText);
        textLikesDiv.appendChild(likesSpan);
        likesSpan.appendChild(heartButton);
        heartButton.appendChild(heartIcon);
        article.appendChild(mediaElement);
        article.appendChild(textLikesDiv);

        return article;
    }

    return { getMediaCardDOM };
}
