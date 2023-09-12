import { setBodyTheme } from "./models/models";

(() => {
    const toggle_switch: HTMLInputElement = document.querySelector('.toggle') as HTMLInputElement;
    toggle_switch.addEventListener('change', setBodyTheme);
})();