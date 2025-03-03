import { photographerName } from "../pages/photographer.js";
import { initializeFocusableElements, trapFocus } from "./trapFocus.js";

const contactButton = document.querySelector(".contact_button");
const modalHeader = document.querySelector(".modal header");
const form = document.querySelector("form");
const contactModal = document.getElementById("contact_modal");
const close = document.getElementById("close");

const first = document.getElementById('first');
const last = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');

// Ajout du titre de formulaire avec le nom du photographe
const formTitle = document.createElement("h2");
formTitle.ariaLabel = `Contact me ${photographerName}`;
formTitle.textContent = `Contactez-moi ${photographerName}`;
modalHeader.appendChild(formTitle);
modalHeader.insertBefore(formTitle, close);

// Définition des variables pour le focus des élements
let firstFocusableElement;
let lastFocusableElement;

/**
 * Affiche la modale de contact.
 * Rend la modale visible, la rend accessible pour les lecteurs d'écran,
 * et gère le focus pour une navigation accessible.
 */
function displayModal() {
    contactModal.style.display = "block";
    contactModal.removeAttribute('inert')

    const { firstFocusableElement: first, lastFocusableElement: last } = initializeFocusableElements(contactModal);
    firstFocusableElement = first;
    lastFocusableElement = last;

    close.focus();
}

/**
 * Ferme la modale de contact.
 * Masque la modale, la rend inaccessible pour les lecteurs d'écran,
 * et replace le focus sur le bouton de contact.
 */
function closeModal() {
    contactModal.style.display = "none";
    contactModal.setAttribute('inert', '');
    
    setTimeout(() => {
        contactButton.focus();
    }, 1);
}

// Gestion des événements
contactButton.addEventListener("click", displayModal);

document.addEventListener('keydown', (event) => {
    trapFocus(event, firstFocusableElement, lastFocusableElement);
});

close.addEventListener("keypress", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        closeModal();
    }
});

document.addEventListener('keydown', event => {
    if (contactModal.ariaHidden === "false" && event.key === 'Escape') {
        closeModal();
    }
});

/**
 * Gère la soumission du formulaire et affiche les erreurs ou le succès.
 * @param {Event} event - Événement de soumission du formulaire.
 */
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let errorMessage = form.querySelector(".error-message");
    if (!errorMessage) {
        errorMessage = document.createElement("p");
        errorMessage.className = "error-message";
        errorMessage.ariaLive = "polite";
        form.insertBefore(errorMessage, form.querySelector("button"));
    }

    if (first.value.trim() === "" || last.value.trim() === "" || email.value.trim() === "" || message.value.trim() === "") {
        first.ariaInvalid = first.value.trim() === "" ? "true" : "false";
        last.ariaInvalid = last.value.trim() === "" ? "true" : "false";
        email.ariaInvalid = email.value.trim() === "" ? "true" : "false";
        message.ariaInvalid = message.value.trim() === "" ? "true" : "false";
        
        errorMessage.textContent = "Veuillez remplir tous les champs.";
    } else {
        first.ariaInvalid = "false";
        last.ariaInvalid = "false";
        email.ariaInvalid = "false";
        message.ariaInvalid = "false";

        console.log("%cDonnées du formulaire", "font-weight: bold; text-decoration: underline");
        console.log("Prénom :", first.value);
        console.log("Nom :", last.value);
        console.log("Email :", email.value);
        console.log("Message :", message.value);

        errorMessage.textContent = "Formulaire envoyé avec succès !";
        form.reset();
    }
});

close.addEventListener("click", () => {
    closeModal();
    const error = form.querySelector(".error-message");
    if (error) error.remove();
    console.clear();
});