# Pour-Chaiwind

`pour-chaiwind` is a lightweight runtime utility CSS engine for the browser.

It lets you write Tailwind-like utility classes such as `chai-p-20`, `chai-bg-blue-500`, and `chai-flex` directly in your HTML or JSX, then converts them into inline styles at runtime. No build step is required.

## What This Package Provides

- Utility-first styling with the default `chai-` prefix
- Static utility classes for layout, spacing, typography, borders, effects, and more
- Dynamic utility classes like `chai-p-20`, `chai-w-320`, `chai-gap-16`, `chai-grid-cols-3`
- Built-in color palette support such as `chai-bg-blue-500`, `chai-text-slate-700`, `chai-border-rose-300`
- Semantic colors like `chai-bg-semantic-primary`
- Automatic processing of dynamically inserted DOM nodes through `MutationObserver`
- A JavaScript API for manual initialization and cleanup

## How It Works

ChaiWind scans the DOM for classes starting with `chai-`, resolves them to CSS declarations, applies them as inline styles, and removes the processed utility classes.

Example:

```html
<div class="chai-bg-blue-500 chai-text-white chai-p-20 chai-rounded-xl">
  Hello ChaiWind
</div>
```

becomes:

```html
<div
  style="background-color: #3b82f6; color: #ffffff; padding: 20px; border-radius: 12px;"
>
  Hello ChaiWind
</div>
```

## Installation

```bash
npm install pour-chaiwind
```

## Package Entry

The package entry is:

```js
import ChaiWindCSS from "pour-chaiwind";
```

You can also import the helper:

```js
import { pour } from "pour-chaiwind";
```

## Usage Without Installing: CDN `<script>`

If you want to use the package directly in a plain HTML file without installing it, load the built bundle from jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/pour-chaiwind@latest/dist/chaiwind.min.js"></script>
```

Then write your HTML with `chai-` classes:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ChaiWind CDN Demo</title>
  </head>
  <body>
    <div class="chai-bg-blue-500 chai-text-white chai-p-20 chai-rounded-xl">
      CDN test
    </div>

    <script src="https://cdn.jsdelivr.net/npm/pour-chaiwind@latest/dist/chaiwind.min.js"></script>
  </body>
</html>
```

### Global Object in CDN Mode

The bundle exposes `Chaiwind` on `window`.

If needed, you can manually initialize it:

```html
<script src="https://cdn.jsdelivr.net/npm/pour-chaiwind@latest/dist/chaiwind.min.js"></script>
<script>
  const engine = new Chaiwind();
  engine.init();
</script>
```

In normal usage, the bundle auto-initializes on `DOMContentLoaded`.

## Usage After Installing

### Vanilla JavaScript

```js
import ChaiWindCSS from "pour-chaiwind";

const chaiwind = new ChaiWindCSS();
chaiwind.init();
```

### With the helper function

```js
import { pour } from "pour-chaiwind";

pour();
```

### Example HTML after installing

```html
<div
  class="chai-flex chai-items-center chai-gap-12 chai-p-16 chai-bg-slate-100 chai-rounded-lg"
>
  <span
    class="chai-bg-semantic-primary chai-text-white chai-px-12 chai-py-8 chai-rounded-full"
  >
    Badge
  </span>
  <p class="chai-text-slate-700 chai-font-medium">Hello from pour-chaiwind</p>
</div>
```

## React Usage

Since ChaiWind works by scanning the DOM in the browser, initialize it once on the client after your React app mounts.

### React example

```jsx
import { useEffect } from "react";
import ChaiWindCSS from "pour-chaiwind";

export default function App() {
  useEffect(() => {
    const chaiwind = new ChaiWindCSS();
    chaiwind.init();

    return () => {
      chaiwind.destroy();
    };
  }, []);

  return (
    <main className="chai-p-24 chai-bg-slate-100 chai-min-h-screen">
      <section className="chai-bg-white chai-rounded-3xl chai-shadow-lg chai-p-24 chai-max-w-420 chai-mx-auto">
        <h1 className="chai-text-3xl chai-font-bold chai-text-slate-800">
          React + ChaiWindCSS
        </h1>
        <p className="chai-text-slate-600 chai-leading-relaxed chai-mt-12">
          Utility classes are resolved at runtime after the component mounts.
        </p>
        <button className="chai-bg-blue-500 chai-text-white chai-px-16 chai-py-10 chai-rounded-full chai-mt-16">
          Click me
        </button>
      </section>
    </main>
  );
}
```

## Utility Examples

### Spacing

```html
<div class="chai-p-20"></div>
<div class="chai-px-16 chai-py-8"></div>
<div class="chai-mt-24 chai-mx-auto"></div>
```

### Sizing

```html
<div class="chai-w-320 chai-h-180"></div>
<div class="chai-w-full chai-min-h-100"></div>
```

### Flexbox

```html
<div class="chai-flex chai-items-center chai-justify-between chai-gap-16">
  <div>Left</div>
  <div>Right</div>
</div>
```

### Grid

```html
<div class="chai-grid chai-gap-20 chai-grid-cols-3">
  <div class="chai-col-span-2 chai-bg-amber-100 chai-p-16">Wide item</div>
  <div class="chai-bg-blue-100 chai-p-16">Side item</div>
</div>
```

### Typography

```html
<h1 class="chai-text-4xl chai-font-bold chai-leading-tight chai-tracking-tight">
  ChaiWindCSS
</h1>
<p class="chai-text-slate-600 chai-leading-relaxed">
  Runtime utility styling in the browser.
</p>
```

### Colors

```html
<div class="chai-bg-blue-500 chai-text-white chai-p-20">Primary</div>
<div class="chai-bg-emerald-100 chai-text-emerald-700 chai-p-20">Success</div>
<div class="chai-border-rose-300 chai-border-w-2 chai-border-solid chai-p-20">
  Border
</div>
<div class="chai-bg-semantic-danger chai-text-white chai-p-20">Danger</div>
```

## Supported Utility Families

Current coverage includes:

- Background utilities
- Text color and typography utilities
- Border radius, width, color, and style utilities
- Flexbox utilities
- Grid utilities
- Spacing utilities
- Width and height utilities
- Position utilities
- Opacity, blur, shadow, and transition utilities
- Overflow and interaction utilities

## Dynamic Utility Families

ChaiWind supports dynamic prefixes for:

- `chai-p-*`, `chai-px-*`, `chai-py-*`, `chai-pt-*`, `chai-pr-*`, `chai-pb-*`, `chai-pl-*`
- `chai-m-*`, `chai-mx-*`, `chai-my-*`, `chai-mt-*`, `chai-mr-*`, `chai-mb-*`, `chai-ml-*`
- `chai-gap-*`, `chai-gap-x-*`, `chai-gap-y-*`
- `chai-w-*`, `chai-min-w-*`, `chai-max-w-*`
- `chai-h-*`, `chai-min-h-*`, `chai-max-h-*`
- `chai-top-*`, `chai-right-*`, `chai-bottom-*`, `chai-left-*`
- `chai-inset-*`, `chai-inset-x-*`, `chai-inset-y-*`
- `chai-rounded-*`
- `chai-border-w-*`, `chai-border-t-*`, `chai-border-r-*`, `chai-border-b-*`, `chai-border-l-*`
- `chai-flex-*`, `chai-basis-*`, `chai-grow-*`, `chai-shrink-*`, `chai-order-*`
- `chai-grid-cols-*`, `chai-grid-rows-*`, `chai-col-span-*`, `chai-row-span-*`
- `chai-text-size-*`, `chai-leading-*`, `chai-tracking-*`, `chai-font-w-*`
- `chai-opacity-*`, `chai-z-*`, `chai-shadow-blur-*`
- `chai-duration-*`, `chai-delay-*`

## Color Palette

Built-in palette support includes:

- base colors: `white`, `black`, `transparent`, `current`
- neutrals: `slate`, `gray`, `zinc`
- warm colors: `red`, `orange`, `amber`, `yellow`, `lime`
- cool colors: `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`
- accent colors: `violet`, `purple`, `fuchsia`, `pink`, `rose`
- semantic tokens: `semantic-primary`, `semantic-secondary`, `semantic-success`, `semantic-warning`, `semantic-danger`, `semantic-info`

Example:

```html
<div class="chai-bg-blue-500"></div>
<div class="chai-text-slate-700"></div>
<div class="chai-border-emerald-300"></div>
<div class="chai-bg-semantic-primary"></div>
```

## Notes

- ChaiWindCSS is a runtime engine, not a build-time compiler
- It applies styles as inline CSS
- It removes processed `chai-` classes after applying styles
- Unknown prefixed classes log warnings in the console
- It is especially useful for experiments, prototypes, demos, educational projects, and lightweight apps

## License

MIT
