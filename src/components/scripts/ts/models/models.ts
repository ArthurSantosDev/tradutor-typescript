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

export async function getTranslation (translation: Translation) {
    const url_api: string = `https://glosbe.com/gapi/translate?from=
    ${translation.from_lang}&dest=${translation.to_lang}&phrase=${translation.word}`;

    try {
        const response: Response = await fetch(url_api);

        if (!response.ok) {
            throw new Error(`Erro na requisição. Status: ${response.status}`);
        }
    } catch (err: any) {
        const modal_error: string = `
            <div class="modal-alert">
                <h2>Erro!</h2>
                <p>
                    ${err}
                </p>
                <button type="button">Ok</button>
            </div>
        `;

        return document.body.innerHTML = modal_error;
    }


}