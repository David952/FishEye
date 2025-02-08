export async function getPhotographers() {

    const response = await fetch('/data/photographers.json');
    const photographers = await response.json()

    return photographers;
}

export async function getMedias() {
    const response = await fetch('/data/photographers.json');
    const media = await response.json()

    return media;
}