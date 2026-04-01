import { palette } from "../config/palette.js";

const colorPrefixes = {
    "chai-bg-": "background-color",
    "chai-text-": "color",
    "chai-border-": "border-color",
};

export function resolveColor(className) {
    for (const [prefix, property] of Object.entries(colorPrefixes)) {
        if (!className.startsWith(prefix)) {
            continue;
        }

        const value = className.slice(prefix.length);
        return buildColor(property, value);
    }

    return null;
}

function buildColor(property, value) {
    if (!value) {
        return null;
    }

    const resolvedColor = resolvePaletteValue(value);

    if (!resolvedColor) {
        return null;
    }

    return `${property}: ${resolvedColor};`;
}

function resolvePaletteValue(value) {
    const directMatch = palette[value];
    if (typeof directMatch === "string") {
        return directMatch;
    }

    const segments = value.split("-");
    const colorName = segments[0];
    const colorGroup = palette[colorName];

    if (!colorGroup || typeof colorGroup !== "object") {
        return null;
    }

    if (segments.length === 1) {
        return typeof colorGroup[500] === "string" ? colorGroup[500] : null;
    }

    const shadeOrToken = segments.slice(1).join("-");
    if (typeof colorGroup[shadeOrToken] === "string") {
        return colorGroup[shadeOrToken];
    }

    return typeof colorGroup[500] === "string" ? colorGroup[500] : null;
}
