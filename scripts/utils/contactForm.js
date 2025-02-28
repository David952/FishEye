import { photographerName } from "../pages/photographer.js";

const contactButton = document.querySelector(".contact_button");
const modalHeader = document.querySelector(".modal header")
const form = document.querySelector("form");
const contactModal = document.getElementById("contact_modal");
const close = document.getElementById("close");

const first = document.getElementById('first');
const last = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');


const formTitle = document.createElement("h2");
formTitle.ariaLabel = `Contact me ${photographerName}`;
formTitle.textContent = `Contactez-moi ${photographerName}`;
modalHeader.appendChild(formTitle);
modalHeader.insertBefore(formTitle, close);

const focusableElements = 'button, [tabindex="0"], input, textarea';
let focusableContent;
let firstFocusableElement;
let lastFocusableElement;

function displayModal() {
	contactModal.style.display = "block";
    contactModal.ariaHidden = "false";
    focusableContent = contactModal.querySelectorAll(focusableElements);
    firstFocusableElement = focusableContent[0];
    lastFocusableElement = focusableContent[focusableContent.length - 1];
    close.focus();
}

function closeModal() {
    contactModal.style.display = "none";
    contactModal.ariaHidden = "true";
    setTimeout(() => {
        contactButton.focus();
    }, 1);
}

document.addEventListener('keydown', trapFocus);

function trapFocus(event) {
    if (contactModal.ariaHidden === "false") {
        if (event.key === "Tab") {
            if (event.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    }
}

contactButton.addEventListener("click", () => {
    displayModal();
})

close.addEventListener("keypress", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        closeModal();
    }
});

document.addEventListener('keydown', e => {
    if (contactModal.ariaHidden === "false" && e.key === 'Escape') {
        closeModal();
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const errorMessage = document.createElement("p");
    errorMessage.className = "error-message";
    errorMessage.ariaLive = "polite";

    if (first.value.trim() === "" || last.value.trim() === "" || email.value.trim() === "" || message.value.trim() === "") {
        if (first.value.trim() === "") first.ariaInvalid = "true";
        if (last.value.trim() === "") last.ariaInvalid = "true";
        if (email.value.trim() === "") email.ariaInvalid = "true";
        if (message.value.trim() === "") message.ariaInvalid = "true";

        errorMessage.textContent = "Veuillez remplir tous les champs.";

        if (!form.querySelector(".error-message")) {
            form.insertBefore(errorMessage, form.querySelector("button"));
        }

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

        if (!form.querySelector(".error-message")) {
            form.insertBefore(errorMessage, form.querySelector("button"));
        }
        form.reset();
    }
});

close.addEventListener("click", () => {
    closeModal();
    form.reset();
    const error = form.querySelector(".error-message");
    if (error) error.remove();
    console.clear();
});

close.addEventListener("click", () => {
    closeModal();
    form.reset();
    console.clear();
})