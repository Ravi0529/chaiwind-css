import { processElement } from "./processor.js";
import { setupObserver } from "./observer.js";

export default class ChaiWindCSS {
    constructor(options = {}) {
        this.cache = new Map();
        this.prefix = options.prefix || "chai-";
        this.observer = null;
        this.initialized = false;
    }

    init() {
        if (this.initialized) {
            return;
        }

        const startTime = performance.now();
        let parsedCount = 0;

        document.querySelectorAll(`[class*="${this.prefix}"]`).forEach((element) => {
            parsedCount += processElement(element, this.cache, this.prefix);
        });

        this.observer = setupObserver(this.prefix, this.cache);
        this.initialized = true;

        const endTime = performance.now();
        console.log(
            `ChaiwindCSS initialized in ${(endTime - startTime).toFixed(2)}ms. Processed ${parsedCount} classes.`
        );
    }

    destroy() {
        this.observer?.disconnect();
        this.observer = null;
        this.initialized = false;
    }
}
