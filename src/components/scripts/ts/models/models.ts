import { Options, Translation } from "./abstract";

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

function closeModal (): void {
    document.getElementById('modal-alert')!.style.display = 'none';
}

export async function getTranslation (translation: Translation): Promise<string | void> {
    const url_api: string = `https://translation-api4.p.rapidapi.com/translation?from=${translation.from_lang}&to=${translation.to_lang}&query=${translation.word}`;
    const options: Options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
            'X-RapidAPI-Host': 'translation-api4.p.rapidapi.com'
        }
    };
    try {
        const response: Response = await fetch(url_api, options);
        console.log(response)

        if (!response.ok) {
            throw new Error(`Erro na requisição. Status: ${response.status}`);
        }

        const result: string = await response.text();

        const div_translation: string = `
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

        const translation_section: HTMLElement = document.querySelector('section.translation-section') as HTMLElement;
        return translation_section.innerHTML = div_translation;

    } catch (err: any) {
        const modal_error: string = `
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
}