export function photographerTemplate(data) {
    const { portrait, name, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM(options = {}) {
        const {isHomePage = true} = options;

        const article = document.createElement('article');
        article.role = "article";

        const a = document.createElement('a');
        a.href = `photographer.html?id=${id}`;

        const img = document.createElement('img');
        img.id = "image";
        img.src = picture;
        img.alt = name;

        const h1 = document.createElement('h1');
        h1.id = "title";
        h1.textContent = name;
        h1.ariaLabel = `Photographe: ${name}`;

        const h2 = document.createElement('h2');
        h2.id = "title";
        h2.textContent = name;
        h2.ariaLabel = `Photographe: ${name}`;

        const cityCountryP = document.createElement('p');
        cityCountryP.id = "cityCountry";
        cityCountryP.textContent = `${city}, ${country}`;
        cityCountryP.ariaLabel = `Ville et Pays: ${city}, ${country}`;

        const taglineP = document.createElement('p');
        taglineP.id = "tagline";
        taglineP.textContent = tagline;
        taglineP.ariaLabel = `Slogan: ${tagline}`;

        const priceP = document.createElement('p');
        priceP.id = "price";
        priceP.textContent = `${price}€/jour`;
        priceP.ariaLabel = `Prix: ${price} euros par jour`;

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
    
    return { getUserCardDOM }
}