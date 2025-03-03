/**
 * Modèle pour créer une carte de photographe.
 * @param {Object} data - Informations sur le photographe.
 * @returns {Object} Objet contenant la méthode `getUserCardDOM` pour générer la carte du photographe.
 */
export function photographerTemplate(data) {
    const { portrait, name, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    /**
     * Génère la carte d'un photographe sous forme d'élément DOM.
     * Crée un élément `<article>` contenant une image, un nom, une localisation, un slogan et un prix journalier.
     * Gère également l'affichage différent selon la page.
     * 
     * @param {Object} options - Options pour l'affichage.
     * @param {boolean} options.isHomePage - Indique si la carte est affichée sur la page d'accueil.
     * @returns {Object} Contient l'article et l'image du photographe.
     */
    function getUserCardDOM(options = {}) {
        const { isHomePage = true } = options;

        const article = document.createElement('article');

        const a = document.createElement('a');
        a.href = `photographer.html?id=${id}`;

        const img = document.createElement('img');
        img.id = "image";
        img.src = picture;
        img.alt = `Link to the profil of ${name}`;

        const h1 = document.createElement('h1');
        h1.id = "title";
        h1.textContent = name;
        h1.ariaLabel = `Photographer : ${name}`;

        const h2 = document.createElement('h2');
        h2.id = "title";
        h2.textContent = name;

        const cityCountryP = document.createElement('p');
        cityCountryP.className = "redColor";
        cityCountryP.textContent = `${city}, ${country}`;
        cityCountryP.ariaLabel = `City and Country : ${city}, ${country}`;

        const taglineP = document.createElement('p');
        taglineP.id = "tagline";
        taglineP.textContent = tagline;
        taglineP.ariaLabel = `Slogan : ${tagline}`;

        const priceP = document.createElement('p');
        priceP.id = "price";
        priceP.textContent = `${price}€/jour`;
        priceP.ariaLabel = `Prix: ${price} euros per day`;

        const priceDay = document.getElementById('priceDay');
        if (priceDay) {
            priceDay.textContent = `${price}€ / jour`;
        }
        
        // Gestion de l'affichage différent selon la page
        if (isHomePage) {
            article.appendChild(a);
            a.appendChild(img);
            a.appendChild(h2);
            article.appendChild(cityCountryP);
            article.appendChild(taglineP);
            article.appendChild(priceP);
        } else {
            article.appendChild(h1);
            article.appendChild(cityCountryP);
            article.appendChild(taglineP);
        }
        return { article, img };
    }
    
    return { getUserCardDOM };
}