import { resolveClass } from "./resolver.js";

export function processElement(element, cache, prefix) {
    let count = 0;

    const classList = [...element.classList];

    classList.forEach((cls) => {
        if (!cls.startsWith(prefix)) return;

        const style = resolveClass(cls, cache, prefix);

        if (style) {
            element.style.cssText += ";" + style;
            element.classList.remove(cls);
            count++;
        }
    });

    if (element.classList.length === 0) {
        element.removeAttribute("class");
    }

    return count;
}


// ========== EXAMPLE ==========
{/* <div class="chai-p-20 chai-bg-blue-500 my-custom-class"></div>

TO

<div class="my-custom-class" style="padding: 20px; background-color: #3b82f6;"></div> */}
