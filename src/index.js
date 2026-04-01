import ChaiWindCSS from "./core/engine.js";

const instance = new ChaiWindCSS();

document.addEventListener("DOMContentLoaded", () => {
    instance.init();
})

export function pour() {
    const engine = new ChaiWindCSS();
    engine.init();
}

export default ChaiWindCSS;
