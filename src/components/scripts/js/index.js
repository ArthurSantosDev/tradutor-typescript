import { getTranslation, loadLocalStorage, setBodyTheme } from "./models/models.js";
(() => {
    window.addEventListener('DOMContentLoaded', loadLocalStorage);
    const toggle_switch = document.querySelector('.toggle');
    toggle_switch.addEventListener('change', setBodyTheme);
    const translate_btn = document.getElementById('translate');
    translate_btn.addEventListener('click', () => {
        const form_translation = {
            'from_lang': document.querySelector('#from_lang').value,
            'to_lang': document.querySelector('#to_lang').value,
            'word': document.querySelector('#word').value.replace(' ', '%')
        };
        alert(form_translation.word)
        getTranslation(form_translation);
    });
})();
