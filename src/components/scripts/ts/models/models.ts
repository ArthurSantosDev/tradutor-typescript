import { Translation } from "./abstract";

export function setBodyTheme (): void {
    const body: HTMLElement = document.body;

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
}

function closeModal (): void {
    document.getElementById('modal-alert')!.style.display = 'none';
}

export async function getTranslation (translation: Translation): Promise<string> {
    const url_api: string = `https://glosbe.com/gapi/translate?from=
    ${translation.from_lang}&dest=${translation.to_lang}&phrase=${translation.word}`;

    try {
        const response: Response = await fetch(url_api);

        if (!response.ok) {
            throw new Error(`Erro na requisição. Status: ${response.status}`);
        }

        const data: any = await response.json();
        const translated: string = data.tuc[0]?.phrase?.text || 'Tradução não encontrada.';

        const div_translation: string = `
            <div class="translation">
                <h3>Tradução</h3>
                <ul>
                    <li>${translation.from_lang} - ${translation.to_lang}</li>
                </ul>
                <p>
                    <strong>${translation.word}:</strong> <wbr> ${translated}
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
                <button id="modal-btn" type="button" onclick="closeModal()">Ok</button>
            </div>
        `;

        return document.body.innerHTML = modal_error;
    }
}