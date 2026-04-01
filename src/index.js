import ChaiWindCSS from "./core/engine.js";

if (typeof window !== "undefined") {
    window.Chaiwind = ChaiWindCSS;
    window.pour = pour;

    const boot = () => {
        const engine = new ChaiWindCSS();
        engine.init();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
}

export function pour() {
    const engine = new ChaiWindCSS();
    engine.init();
}

export default ChaiWindCSS;
