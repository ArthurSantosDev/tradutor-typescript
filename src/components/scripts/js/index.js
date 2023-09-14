import { closeModal, getTranslation, loadLocalStorage, setBodyTheme } from "./models/models.js";
(() => {
    window.addEventListener('DOMContentLoaded', loadLocalStorage);
    const toggle_switch = document.querySelector('.toggle');
    toggle_switch.addEventListener('change', setBodyTheme);
    const page_form = document.querySelector('form');
    page_form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const form_translation = {
            'from_lang': document.querySelector('#from_lang').value,
            'to_lang': document.querySelector('#to_lang').value,
            'word': document.querySelector('#word').value
        };
        getTranslation(form_translation);
    });
    const modal_btn = document.querySelector('button#modal-btn');
    modal_btn.onclick = () => closeModal();
})();
