var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function setBodyTheme() {
    const body = document.body;
    let theme;
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        theme = localStorage.setItem('theme', 'light-mode');
    }
    else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        theme = localStorage.setItem('theme', 'dark-mode');
    }
}
export function loadLocalStorage() {
    const every_selector = document.querySelector('body *');
    const toggle_switch = document.querySelector('.toggle');
    const theme_class = localStorage.getItem('theme') || 'dark-mode';
    (theme_class === 'dark-mode') && toggle_switch.checked;
    document.body.classList.add(theme_class);
    every_selector.classList.add(theme_class);
}
function closeModal() {
    document.getElementById('modal-alert').style.display = 'none';
}
export function getTranslation(translation) {
    return __awaiter(this, void 0, void 0, function* () {
        const url_api = `https://translation-api4.p.rapidapi.com/translation?from=${translation.from_lang}&to=${translation.to_lang}&query=${translation.word}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
                'X-RapidAPI-Host': 'translation-api4.p.rapidapi.com'
            }
        };
        try {
            const response = yield fetch(url_api, options);
            console.log(response);
            if (!response.ok) {
                throw new Error(`Erro na requisição. Status: ${response.status}`);
            }
            const result = yield response.text();
            const div_translation = `
            <div class="translation">
                <h3>Tradução</h3>
                <ul>
                    <li>${translation.from_lang} - ${translation.to_lang}</li>
                </ul>
                <p>
                    <strong>${translation.word}:</strong> <wbr> ${result}
                </p>
            </div>
        `;
            const translation_section = document.querySelector('section.translation-section');
            return translation_section.innerHTML = div_translation;
        }
        catch (err) {
            const modal_error = `
            <div class="modal-alert" id="modal">
                <h2>Erro!</h2>
                <p>
                    ${err}
                </p>
                <button id="modal-btn" type="button" onclick="closeModal();">Ok</button>
            </div>
        `;
            return document.body.insertAdjacentHTML('beforeend', modal_error);
        }
    });
}
