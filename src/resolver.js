import { stylesDictionary } from "../config/styles.js";
import { dynamicPrefixes } from "../config/dynamic.js";
import { resolveColor } from "../utils/colorResolver.js";

const unitlessProperties = new Set([
    "opacity",
    "z-index",
    "flex",
    "flex-grow",
    "flex-shrink",
    "order",
    "font-weight",
    "line-height",
]);

const rawValueProperties = new Set([
    "grid-template-columns",
    "grid-template-rows",
    "grid-column",
    "grid-row",
    "transition-duration",
    "transition-delay",
    "blur",
]);

export function resolveClass(className, cache, prefix) {
    if (cache.has(className)) {
        return cache.get(className);
    }

    let styleToApply = null;

    if (stylesDictionary[className]) {
        styleToApply = ensureTrailingSemicolon(stylesDictionary[className]);
    } else {
        styleToApply = resolveDynamicClass(className);

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

function resolveDynamicClass(className) {
    const matchingPrefix = Object.keys(dynamicPrefixes)
        .sort((left, right) => right.length - left.length)
        .find((key) => className.startsWith(key));

    if (!matchingPrefix) {
        return null;
    }

    const propertyConfig = dynamicPrefixes[matchingPrefix];
    const rawValue = className.slice(matchingPrefix.length);

    if (!rawValue) {
        return null;
    }

    const properties = Array.isArray(propertyConfig)
        ? propertyConfig
        : [propertyConfig];

    const declarations = buildDeclarations(properties, rawValue);

    return declarations.length > 0 ? declarations.join(" ") : null;
}

function buildDeclarations(properties, rawValue) {
    if (properties.length === 1 && properties[0] === "blur") {
        const blurValue = normalizeBlurValue(rawValue);
        return blurValue ? [`filter: blur(${blurValue});`] : [];
    }

    return properties.map((property) => {
        const cssValue = normalizeValue(property, rawValue);
        return cssValue ? `${property}: ${cssValue};` : null;
    }).filter(Boolean);
}

function normalizeValue(property, rawValue) {
    if (rawValue === "auto") {
        return "auto";
    }

    if (property === "opacity") {
        return normalizeOpacityValue(rawValue);
    }

    if (property === "grid-template-columns") {
        return normalizeGridTrackValue(rawValue);
    }

    if (property === "grid-template-rows") {
        return normalizeGridTrackValue(rawValue);
    }

    if (property === "grid-column" || property === "grid-row") {
        return normalizeSpanValue(rawValue);
    }

    if (property === "transition-duration" || property === "transition-delay") {
        return normalizeTimeValue(rawValue);
    }

    if (rawValue === "full") {
        return "100%";
    }

    if (rawValue === "screen") {
        return property.includes("width") ? "100vw" : "100vh";
    }

    if (isNumeric(rawValue)) {
        return unitlessProperties.has(property) || rawValue === "0"
            ? rawValue
            : `${rawValue}px`;
    }

    if (rawValue.includes("_")) {
        return rawValue.replaceAll("_", " ");
    }

    if (rawValue.includes("-") && !rawValue.startsWith("-") && !rawValue.includes(".")) {
        return rawValue.replaceAll("-", " ");
    }

    if (rawValueProperties.has(property)) {
        return rawValue;
    }

    return rawValue;
}

function normalizeGridTrackValue(rawValue) {
    if (isNumeric(rawValue)) {
        return `repeat(${rawValue}, minmax(0, 1fr))`;
    }

    return rawValue.replaceAll("_", " ");
}

function normalizeSpanValue(rawValue) {
    if (isNumeric(rawValue)) {
        return `span ${rawValue} / span ${rawValue}`;
    }

    return rawValue.replaceAll("_", " ");
}

function normalizeTimeValue(rawValue) {
    return isNumeric(rawValue) ? `${rawValue}ms` : rawValue;
}

function normalizeOpacityValue(rawValue) {
    if (!isNumeric(rawValue)) {
        return rawValue;
    }

    const numericValue = Number(rawValue);

    if (numericValue >= 0 && numericValue <= 1) {
        return String(numericValue);
    }

    return String(numericValue / 100);
}

function normalizeBlurValue(rawValue) {
    if (isNumeric(rawValue)) {
        return `${rawValue}px`;
    }

    return rawValue || null;
}

function ensureTrailingSemicolon(style) {
    return style.trim().endsWith(";") ? style.trim() : `${style.trim()};`;
}

function isNumeric(value) {
    return value !== "" && !Number.isNaN(Number(value));
}
