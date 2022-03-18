// IMPORT AND USE ONLY ONCE IN APPLICATION

import NoSleep from "nosleep.js";
export { addNoSleepListener, removeNoSleepListener };

let noSleep = new NoSleep();
let eventListenerExists = false;

function enableNoSleep() {
    document.removeEventListener("submit", enableNoSleep, false);
    noSleep.enable();
}

async function addNoSleepListener(element: HTMLElement) {
    element.addEventListener("submit", enableNoSleep, false);
}

async function removeNoSleepListener() {
    if (eventListenerExists) {
        document.removeEventListener("submit", enableNoSleep, false);
        noSleep.disable();
        eventListenerExists = false;
    }
}
