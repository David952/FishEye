export function mediaTemplate(data) {
    const { image, video, title, likes, photographerName } = data;

    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.className = 'thumb-imgfull';

        const mediaElement = document.createElement('img');
        mediaElement.className = 'thumb-img';
        const mediaPath = `assets/images/${photographerName}/${video ? 'miniature.png' : image}`;
        mediaElement.src = mediaPath;
        mediaElement.alt = title;

        if (video) {
            mediaElement.controls = true;
        }

        const textLikesDiv = document.createElement('div');
        textLikesDiv.className = 'thumb-textLikes';

        const titleText = document.createElement('p');
        titleText.className = 'thumb-text';
        titleText.textContent = title;

        const heartIcon = document.createElement('i');
        heartIcon.className = 'fa-solid fa-heart';

        const likesSpan = document.createElement('span');
        likesSpan.className = 'thumb-likes';
        likesSpan.textContent = `${likes}`;;

        textLikesDiv.appendChild(titleText);
        textLikesDiv.appendChild(likesSpan);
        likesSpan.appendChild(heartIcon);
        article.appendChild(mediaElement);
        article.appendChild(textLikesDiv);

        return article;
    }

    return { getMediaCardDOM };
}