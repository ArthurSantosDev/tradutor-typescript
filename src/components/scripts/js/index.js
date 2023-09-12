import { setBodyTheme } from "./models/models.js";
(() => {
    const toggle_switch = document.querySelector('.toggle');
    toggle_switch.addEventListener('change', setBodyTheme);
})();
