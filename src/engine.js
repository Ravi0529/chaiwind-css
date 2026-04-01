import { processElement } from "./processor.js";
import { setupObserver } from "./observer.js";

export default class ChaiWindCSS {
    constructor() {
        this.cache = new Map();
        this.prefix = "chai-";
    }

    init() {
        const startTime = performance.now();
        let parsedCount = 0;

        if (document.body) {
            document.body.style.visibility = "hidden";
        }

        const elements = document.querySelectorAll(`[class*="${this.prefix}"]`);

        elements.forEach((el) => {
            parsedCount += processElement(el, this.cache, this.prefix);
        });

        const endTime = performance.now();

        console.log(
            `ChaiwindCSS initialized in ${(endTime - startTime).toFixed(2)}ms. Processed ${parsedCount} classes.`
        );

        if (document.body) {
            document.body.style.visibility = "visible";
        }

        setupObserver(this.prefix, this.cache);
    }
}
