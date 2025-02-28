import { displayLightbox } from "../utils/lightbox.js";
import { updateTotalLikes } from "../utils/totalLikes.js";

export function mediaTemplate(data, photographerMedias) {
    const { image, video, title, likes, photographerName, isLiked, id } = data;

    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.className = 'thumb-imgfull';

        const mediaElement = document.createElement(video ? 'video' : 'img');
        mediaElement.className = 'thumb-img';
        const mediaPath = `assets/images/${photographerName}/${video ? video : image}`;
        mediaElement.src = mediaPath;
        mediaElement.alt = title;
        mediaElement.ariaLabel = title;
        mediaElement.tabIndex = "0";
        mediaElement.id = `media-${id}`;

        mediaElement.addEventListener('click', () => {
            displayLightbox(mediaPath, title, data.index, mediaElement.id);
        })

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
        heartButton.ariaLabel = isLiked ? "Remove a like" : "Add a like";

        const heartIcon = document.createElement('i');
        heartIcon.className = 'fa-heart redColor';

        if (isLiked) {
            heartIcon.classList.add("fa-solid");
        } else {
            heartIcon.classList.add("fa-regular");
        }

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
