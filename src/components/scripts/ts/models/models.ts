import { Translation } from "./abstract";

/** 
 * Função que alterna o tema da página entre claro e escuro, 
 * e armazenando o modo selecionado no Localstorage do navegador
*/
export function setBodyTheme (): void {
    const body: HTMLElement = document.body;

    let theme: any;

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');

        theme = localStorage.setItem('theme', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');

        theme = localStorage.setItem('theme', 'dark-mode');
    }
}

export function clearHistory (): void {
    const div_history: HTMLDivElement = document.querySelector('.history') as HTMLDivElement;
    localStorage.clear();
    div_history.innerHTML = '';
}

/**
 * Função que carrega os dados do LocalStorage na página
*/
export function loadLocalStorage(): void {
    const every_selector: HTMLElement = document.querySelector('body *') as HTMLElement;
    const toggle_switch: HTMLInputElement = document.querySelector('.toggle') as HTMLInputElement;

    const theme_class: string = localStorage.getItem('theme') || 'dark-mode';

    theme_class === 'light-mode' ? toggle_switch.checked = true : toggle_switch.checked = false;

    document.body.classList.add(theme_class);
    every_selector.classList.add(theme_class);

    const words_history: string = localStorage.getItem('words_history') || '';
    
    const array_words: string[] = JSON.parse(words_history);

    const history_section: HTMLDivElement = document.querySelector('.history') as HTMLDivElement;

    history_section.innerHTML = '';

    for (let word = array_words.length - 1; word >= 0; word--) {
        history_section.innerHTML += `<div>${array_words[word]}</div>`;
    }
}

/** 
 * Função que adiciona a palavra buscada pelo usuário no
 * LocalStorage do navegador
 * 
 * @param word Palavras a serem armazenadas
*/
function addToLocalStorage(word: string): void {
    let words: string[] = localStorage.getItem('words_history')
        ? JSON.parse(localStorage.getItem('words_history') || '[]')
        : [];

    words.push(word);

    localStorage.setItem('words_history', JSON.stringify(words));
}

/** Função que fecha o modal de alerta de erro */
export function closeModal (): void {
    (document.querySelector('.modal-alert') as HTMLElement).style.display = 'none';
}

/**
 * Função assíncrona que realiza a tradução de uma palavra ou frase através
 * de uma API
 * @param { Translation } translation Objeto que contém os itens para fazer a tradução
 * @returns { Promise<string | void> } Retorna uma string que será incluída no HTML ou nada
*/
export async function getTranslation (translation: Translation): Promise<string | void> {
    const url_api: string = `https://api.mymemory.translated.net/get?q=${translation.word}!&langpair=${translation.from_lang}|${translation.to_lang}`;
    
    try {
        const response: Response = await fetch(url_api);
        console.log(response)

        if (!response.ok) {
            throw new Error(`Erro na requisição. Status: ${response.status}`);
        }

        const result: any = await response.json();

        if (!result.responseData) {
            throw new Error(`Insira um idioma válido. Status: ${response.status}`);
        }

        const div_translation: string = `<table>
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

        const translation_section: HTMLElement = document.querySelector('.div-translation') as HTMLElement;
        return translation_section.innerHTML = div_translation;

    } catch (err: any) {
        const warning_error: string = `<p>${err}</p>`;
        (document.querySelector('.modal-alert') as HTMLElement).style.display = 'flex';
        return (document.querySelector('#modal-warning') as HTMLElement).innerHTML = warning_error;
    }
}