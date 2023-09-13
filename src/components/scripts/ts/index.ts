import { Translation } from "./models/abstract";
import { getTranslation, loadLocalStorage, setBodyTheme } from "./models/models";

(() => {
    window.addEventListener('DOMContentLoaded', loadLocalStorage);

    const toggle_switch: HTMLInputElement = document.querySelector('.toggle') as HTMLInputElement;
    toggle_switch.addEventListener('change', setBodyTheme);

    const translate_btn: HTMLElement = document.getElementById('translate') as HTMLElement;

    translate_btn.addEventListener('click', () => {
        const form_translation: Translation = {
            'from_lang': (document.querySelector('#from_lang') as HTMLInputElement).value,
            'to_lang': (document.querySelector('#to_lang') as HTMLInputElement).value,
            'word': (document.querySelector('#word') as HTMLInputElement).value.replace(' ', '%')
        }
        getTranslation(form_translation)
    });
})();