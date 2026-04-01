import { processElement } from "./processor.js";

export function setupObserver(prefix, cache) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType !== Node.ELEMENT_NODE) {
                    return;
                }

                if (node.classList?.length) {
                    processElement(node, cache, prefix);
                }

                node.querySelectorAll?.(`[class*="${prefix}"]`).forEach((child) => {
                    processElement(child, cache, prefix);
                });
            });
        });
    });

    const target = document.body || document.documentElement;

    observer.observe(target, {
        childList: true,
        subtree: true,
    });

    return observer;
}
