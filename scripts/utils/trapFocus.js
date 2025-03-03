/**
 * Initialise les éléments focusables dans le conteneur donné
 * .
 * @param {HTMLElement} container - Le conteneur dans lequel rechercher les éléments focusables.
 * @returns {Object} - Un objet contenant le premier et le dernier élément focusable.
 */
export function initializeFocusableElements(container) {
    const focusableElements = 'button, input, textarea, [tabindex="0"]';
    const focusableContent = container.querySelectorAll(focusableElements);
    
    return {
        firstFocusableElement: focusableContent[0],
        lastFocusableElement: focusableContent[focusableContent.length - 1]
    };
}

/**
 * Gère le focus dans le formulaire et la lightbox pour une navigation accessible.
 * Empêche le focus de sortir de la modale lors de la navigation au clavier.
 * 
 * @param {KeyboardEvent} event - Événement clavier.
 * @param {HTMLElement} firstFocusableElement - Premier élément focusable dans la modale.
 * @param {HTMLElement} lastFocusableElement - Dernier élément focusable dans la modale.
 */
export function trapFocus(event, firstFocusableElement, lastFocusableElement) {
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