const contactButton = document.querySelector(".contact_button");
const form = document.querySelector("form");
const contactModal = document.getElementById("contact_modal");
const modal = document.querySelector(".modal");
const close = document.getElementById('close');

const first = document.getElementById('first');
const last = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');


function displayModal() {
	contactModal.style.display = "block";
    contactModal.ariaHidden = "false";
    close.focus();
}

function closeModal() {
    contactModal.style.display = "none";
    contactModal.ariaHidden = "true";
    contactButton.focus();
}

document.addEventListener('keydown', e => {
    if (contactModal.ariaHidden === "false" && e.key === 'Escape') {
        closeModal();
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if(first.value.trim() === "" || last.value.trim() === "" || email.value.trim() === "" || message.value.trim() === "") {
        console.log('Veuillez remplir tous les champs.');
    } else {
        console.log("%cDonnées du formulaire", "font-weight: bold; text-decoration: underline");
        console.log("Prénom :", first.value);
        console.log("Nom :", last.value);
        console.log("Email :", email.value);
        console.log("Message :", message.value);
  }
})

close.addEventListener("click", () => {
    form.reset();
    console.clear();
})