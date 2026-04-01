import ChaiWindCSS from "./core/engine.js";

if (typeof window !== "undefined") {
    window.Chaiwind = ChaiWindCSS;

    document.addEventListener("DOMContentLoaded", () => {
        const engine = new ChaiWindCSS();
        engine.init();
    });
}

export function pour() {
    const engine = new ChaiWindCSS();
    engine.init();
}

export default ChaiWindCSS;
