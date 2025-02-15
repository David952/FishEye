import { displayLightbox } from "../utils/lightbox.js";
import { updateTotalLikes } from "../utils/totalLikes.js";

export function mediaTemplate(data, photographerMedias) {
    const { image, video, title, likes, photographerName } = data;

    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.className = 'thumb-imgfull';

        const mediaElement = document.createElement(video ? 'video' : 'img');
        mediaElement.className = 'thumb-img';
        const mediaPath = `assets/images/${photographerName}/${video ? video : image}`;
        mediaElement.src = mediaPath;
        mediaElement.alt = title;

        if (video) {
            mediaElement.controls = true;
        }

        mediaElement.addEventListener('click', () => {
            displayLightbox(mediaPath, title, data.index);
        })

        const textLikesDiv = document.createElement('div');
        textLikesDiv.className = 'thumb-textLikes redColor';

        const titleText = document.createElement('p');
        titleText.className = 'thumb-text';
        titleText.textContent = title;

        const likesSpan = document.createElement('span');
        likesSpan.className = 'thumb-likes';
        likesSpan.textContent = `${likes}`;;

        const heartIcon = document.createElement('i');
        heartIcon.className = 'fa-regular fa-heart';
        heartIcon.ariaLabel = 'likes';
        heartIcon.addEventListener('click', () => {

            const mediaItem = photographerMedias.find((item) => item.title === title);

            if (mediaItem) {
                if (heartIcon.classList.contains('fa-solid')) {
                    mediaItem.likes -= 1;
                    heartIcon.classList.remove("fa-solid");
                    document.querySelectorAll('.fa-heart').forEach(icon => {
                        icon.style.pointerEvents = "auto";
                    });
                } else {
                    mediaItem.likes += 1;
                    heartIcon.classList.add("fa-solid");
                    document.querySelectorAll('.fa-heart').forEach(icon => {
                        if (icon !== heartIcon) {
                            icon.style.pointerEvents = "none";
                        }
                    });
                }
                
                likesSpan.textContent = mediaItem.likes;
                likesSpan.appendChild(heartIcon);
        
                updateTotalLikes(photographerMedias);
            }
        });
        
        textLikesDiv.appendChild(titleText);
        textLikesDiv.appendChild(likesSpan);
        likesSpan.appendChild(heartIcon);
        article.appendChild(mediaElement);
        article.appendChild(textLikesDiv);

        return article;
    }

    return { getMediaCardDOM };
}