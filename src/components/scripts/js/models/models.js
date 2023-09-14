var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Função que alterna o tema da página entre claro e escuro,
 * e armazenando o modo selecionado no Localstorage do navegador
*/
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
/**
 * Função que carrega os dados do LocalStorage na página
*/
export function loadLocalStorage() {
    const every_selector = document.querySelector('body *');
    const toggle_switch = document.querySelector('.toggle');
    const theme_class = localStorage.getItem('theme') || 'dark-mode';
    theme_class === 'light-mode' ? toggle_switch.checked = true : toggle_switch.checked = false;
    document.body.classList.add(theme_class);
    every_selector.classList.add(theme_class);
    const words_history = localStorage.getItem('words_history') || '';
    const array_words = JSON.parse(words_history);
    const history_section = document.querySelector('.history');
    history_section.innerHTML = '';
    for (let word = array_words.length - 1; word >= 0; word--) {
        history_section.innerHTML += `<div>${array_words[word]}</div>`;
    }
}
function addToLocalStorage(word) {
    let words = localStorage.getItem('words_history')
        ? JSON.parse(localStorage.getItem('words_history') || '[]')
        : [];
    words.push(word);
    localStorage.setItem('words_history', JSON.stringify(words));
}
/** Função que fecha o modal de alerta de erro */
export function closeModal() {
    document.querySelector('.modal-alert').style.display = 'none';
}
/**
 * Função assíncrona que realiza a tradução de uma palavra ou frase através
 * de uma API
 * @param { Translation } translation Objeto que contém os itens para fazer a tradução
 * @returns { Promise<string | void> } Retorna uma string que será incluída no HTML ou nada
*/
export function getTranslation(translation) {
    return __awaiter(this, void 0, void 0, function* () {
        const url_api = `https://api.mymemory.translated.net/get?q=${translation.word}!&langpair=${translation.from_lang}|${translation.to_lang}`;
        try {
            const response = yield fetch(url_api);
            console.log(response);
            if (!response.ok) {
                throw new Error(`Erro na requisição. Status: ${response.status}`);
            }
            const result = yield response.json();
            if (!result.responseData) {
                throw new Error(`Insira um idioma válido. Status: ${response.status}`);
            }
            const div_translation = `<table>
            <tr>
                <td class="lang-td">${translation.from_lang.toLocaleUpperCase()}</td>
                <td class="lang-td">${translation.to_lang.toLocaleUpperCase()}</td>
            </tr>
            <tr>
                <td>${translation.word}</td>
                <td>${result.responseData.translatedText}</td>
            </tr>
        </table>`;
            addToLocalStorage(translation.word);
            loadLocalStorage();
            const translation_section = document.querySelector('.div-translation');
            return translation_section.innerHTML = div_translation;
        }
        catch (err) {
            const warning_error = `<p>${err}</p>`;
            document.querySelector('.modal-alert').style.display = 'flex';
            return document.querySelector('#modal-warning').innerHTML = warning_error;
        }
    });
}
