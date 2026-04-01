import { resolveClass } from "./resolver.js";

export function processElement(element, cache, prefix) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        return 0;
    }

    let count = 0;
    const classList = [...element.classList];
    const stylesToApply = [];

    classList.forEach((className) => {
        if (!className.startsWith(prefix)) {
            return;
        }

        const style = resolveClass(className, cache, prefix);

        if (!style) {
            return;
        }

        stylesToApply.push(style);
        element.classList.remove(className);
        count += 1;
    });

    if (stylesToApply.length > 0) {
        const existingInlineStyle = element.getAttribute("style");
        const nextInlineStyle = existingInlineStyle
            ? `${existingInlineStyle.trim()} ${stylesToApply.join(" ")}`
            : stylesToApply.join(" ");

        element.setAttribute("style", nextInlineStyle.trim());
    }

    if (element.classList.length === 0) {
        element.removeAttribute("class");
    }

    return count;
}
