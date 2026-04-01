import { stylesDictionary } from "../config/styles.js";
import { dynamicPrefixes } from "../config/dynamic.js";
import { resolveColor } from "../utils/colorResolver.js";

export function resolveClass(className, cache, prefix) {
    if (cache.has(className)) {
        return cache.get(className);
    }

    let styleToApply = null;

    if (stylesDictionary[className]) {
        styleToApply = stylesDictionary[className] + ";";
    } else {
        for (let key in dynamicPrefixes) {
            if (className.startsWith(key)) {
                const property = dynamicPrefixes[key];
                let value = className.replace(key, "");

                const cssValue = isNaN(value) ? value : `${value}px`;

                styleToApply = `${property}: ${cssValue};`;
                break;
            }
        }

        if (!styleToApply) {
            styleToApply = resolveColor(className);
        }
    }

    if (styleToApply) {
        cache.set(className, styleToApply);
    } else if (className.startsWith(prefix)) {
        console.warn(`ChaiwindCSS: Unknown utility "${className}"`);
    }

    return styleToApply;
}


// ========== EXAMPLE ==========
// {
//   "flex": "display: flex;",
//   "p-20": "padding: 20px;",
//   "chai-bg-blue-500": "background-color: #3b82f6;"
// }
