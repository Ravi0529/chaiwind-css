import { processElement } from "./processor.js";

export function setupObserver(prefix, cache) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (!node.nodeType !== 1) return;

                if (node.className && node.className.includes(prefix)) {
                    processElement(node, cache, prefix);
                }

                if (node.querySelectorAll) {
                    const children = node.querySelectorAll(
                        `[class*="${prefix}"]`
                    );

                    children.forEach((child) => {
                        processElement(child, cache, prefix);
                    });
                }
            });
        });
    });

    const target = document.body || document.documentElement;

    observer.observe(target, {
        childList: true,
        subtree: true,
    });
}


// ========== EXAMPLE ==========
// MutationObserver: This is a built-in browser tool that "listens" for changes to the HTML structure (the DOM).
// The Watchlist: It specifically looks at document.body and watches for any new nodes (childList) added anywhere inside it (subtree).
// The Filter: When a new element pops up, it checks two things:
// Does the new element itself have your custom classes (e.g., chai-)?
// Do any of its children have those classes?
// The Trigger: If it finds a match, it calls processElement (the "cleanup crew" we discussed) to convert those classes into real CSS styles immediately.
