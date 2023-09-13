import { Translation } from "./abstract";

export function setBodyTheme (): void {
    const body: HTMLElement = document.body;

    let theme;

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

export function loadLocalStorage () {
    const every_selector: HTMLElement = document.querySelector('body *') as HTMLElement;
    const toggle_switch: HTMLInputElement = document.querySelector('.toggle') as HTMLInputElement;

    const theme_class: string = localStorage.getItem('theme') as string || 'dark-mode';

    (theme_class === 'dark-mode') && toggle_switch.checked;
    
    document.body.classList.add(theme_class);
    every_selector.classList.add(theme_class);
}

export function closeModal (): void {
    (document.querySelector('.modal-alert') as HTMLElement).style.display = 'none';
}

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
                <td>${translation.from_lang.toLocaleUpperCase()}</td>
                <td>${translation.to_lang.toLocaleUpperCase()}</td>
            </tr>
            <tr>
                <td>${translation.word}</td>
                <td>${result.responseData.translatedText}</td>
            </tr>
        </table>`;

        const translation_section: HTMLElement = document.querySelector('.div-translation') as HTMLElement;
        return translation_section.innerHTML = div_translation;

    } catch (err: any) {
        const warning_error: string = `<p>${err}</p>`;
        (document.querySelector('.modal-alert') as HTMLElement).style.display = 'flex';
        return (document.querySelector('#modal-warning') as HTMLElement).innerHTML = warning_error;
    }
}