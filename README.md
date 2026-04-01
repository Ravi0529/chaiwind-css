# ChaiWindCSS

ChaiWindCSS is a lightweight runtime utility-CSS engine inspired by Tailwind-style workflows.

It scans your DOM for classes with a configurable prefix, resolves them into inline styles, and applies them directly in the browser with no build step required.

## Why ChaiWindCSS

- No compilation step
- Utility-first workflow
- Browser-based runtime engine
- Static utilities plus dynamic value utilities
- Built-in color palette support
- MutationObserver support for dynamically added elements
- Configurable class prefix

## Features

- Static utility classes such as `chai-flex`, `chai-text-2xl`, `chai-shadow-md`, `chai-rounded-xl`
- Dynamic utilities such as `chai-p-24`, `chai-px-16`, `chai-w-320`, `chai-grid-cols-3`
- Palette-powered color utilities such as `chai-bg-blue-500`, `chai-text-slate-700`, `chai-border-emerald-300`
- Semantic tokens such as `chai-bg-semantic-primary` and `chai-border-semantic-danger`
- Automatic processing of newly inserted DOM elements through `MutationObserver`
- Optional custom prefix support through the engine constructor

## Installation

```bash
npm install chaiwind-css
```

## How It Works

ChaiWindCSS looks for classes beginning with the default prefix `chai-`.

For example:

```html
<div class="chai-p-20 chai-bg-blue-500 chai-rounded-lg"></div>
```

becomes inline styles at runtime:

```html
<div
  style="padding: 20px; background-color: #3b82f6; border-radius: 8px;"
></div>
```

## Quick Start

### Browser / Vanilla JS

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ChaiWindCSS Demo</title>
  </head>
  <body>
    <div class="chai-p-24 chai-bg-blue-500 chai-text-white chai-rounded-xl">
      Hello from ChaiWindCSS
    </div>

    <script
      type="module"
      src="./node_modules/chaiwind-css/src/index.js"
    ></script>
  </body>
</html>
```

If you are testing locally, run the page through a local server instead of opening it directly with `file://`.

### With a bundler

```js
import ChaiWindCSS from "chaiwind-css";

const chaiwind = new ChaiWindCSS();
chaiwind.init();
```

You can also use the helper export:

```js
import { pour } from "chaiwind-css";

pour();
```

## Usage Examples

### Basic card

```html
<section
  class="chai-bg-white chai-rounded-3xl chai-shadow-lg chai-p-24 chai-mx-auto chai-max-w-420"
>
  <h1 class="chai-text-3xl chai-font-bold chai-text-slate-800">Welcome</h1>
  <p class="chai-text-slate-600 chai-leading-relaxed chai-mt-12">
    Build layouts with utility classes and no build step.
  </p>
</section>
```

### Flex layout

```html
<div
  class="chai-flex chai-items-center chai-justify-between chai-gap-16 chai-p-20 chai-bg-slate-100 chai-rounded-xl"
>
  <span class="chai-text-lg chai-font-semibold">ChaiWindCSS</span>
  <button
    class="chai-bg-semantic-primary chai-text-white chai-px-16 chai-py-10 chai-rounded-full"
  >
    Get Started
  </button>
</div>
```

### Grid layout

```html
<div class="chai-grid chai-gap-20 chai-grid-cols-3">
  <div class="chai-bg-rose-100 chai-p-20 chai-rounded-lg">One</div>
  <div class="chai-bg-amber-100 chai-p-20 chai-rounded-lg">Two</div>
  <div class="chai-bg-emerald-100 chai-p-20 chai-rounded-lg">Three</div>
</div>
```

### Dynamic DOM support

```js
import ChaiWindCSS from "chaiwind-css";

const chaiwind = new ChaiWindCSS();
chaiwind.init();

const box = document.createElement("div");
box.className = "chai-bg-violet-500 chai-text-white chai-p-20 chai-rounded-xl";
box.textContent = "Inserted after load";

document.body.appendChild(box);
```

The observer will detect the new node and apply styles automatically.

## API

### `new ChaiWindCSS(options?)`

Creates a new engine instance.

Supported option:

- `prefix`: custom class prefix. Default is `"chai-"`

Example:

```js
import ChaiWindCSS from "chaiwind-css";

const chaiwind = new ChaiWindCSS({
  prefix: "brew-",
});

chaiwind.init();
```

### `chaiwind.init()`

Scans the DOM, resolves matching classes, applies inline styles, and starts the observer.

### `chaiwind.destroy()`

Disconnects the observer and stops future automatic processing.

### `pour()`

Convenience helper that creates a new instance and calls `init()`.

## Utility Coverage

ChaiWindCSS currently includes these utility groups:

- Background utilities
- Text color and typography utilities
- Border color, radius, width, and style utilities
- Flexbox and grid utilities
- Width, height, min/max size utilities
- Spacing utilities
- Positioning utilities
- Opacity, blur, shadow, and transition utilities
- Overflow, cursor, pointer-events, and selection utilities

## Dynamic Utilities

The project supports value-based classes through dynamic prefixes.

Examples:

```html
<div class="chai-p-24"></div>
<div class="chai-px-16 chai-py-8"></div>
<div class="chai-w-320 chai-h-180"></div>
<div class="chai-top-0 chai-right-16"></div>
<div class="chai-grid-cols-4"></div>
<div class="chai-col-span-2"></div>
<div class="chai-duration-300 chai-delay-150"></div>
```

Supported dynamic categories include:

- Padding and margin
- Width, height, min-width, max-width, min-height, max-height
- Gap, row-gap, column-gap
- Position values such as `top`, `right`, `bottom`, `left`, `inset`
- Border widths and border radius
- Flex values such as `grow`, `shrink`, `basis`, `order`
- Grid track and span utilities
- Font size, line height, letter spacing, font weight
- Opacity, z-index, blur, transition duration, transition delay

## Colors and Palette

ChaiWindCSS supports:

- flat colors like `white`, `black`, `transparent`, `current`
- shade-based palettes like `blue-500`, `slate-700`, `rose-300`
- semantic tokens like `semantic-primary`, `semantic-success`, `semantic-danger`

Examples:

```html
<div class="chai-bg-blue-500 chai-text-white"></div>
<div class="chai-text-slate-700"></div>
<div class="chai-border-emerald-300 chai-border-w-2 chai-border-solid"></div>
<div class="chai-bg-semantic-primary chai-text-white"></div>
```

Available palette families include:

- `slate`, `gray`, `zinc`
- `red`, `orange`, `amber`, `yellow`, `lime`
- `green`, `emerald`, `teal`
- `cyan`, `sky`, `blue`, `indigo`
- `violet`, `purple`, `fuchsia`, `pink`, `rose`
- `semantic`

Most palette families support shades from `50` to `950`.

## Notes

- Classes are converted into inline styles at runtime.
- Processed ChaiWindCSS classes are removed after resolution.
- Unknown prefixed classes log a warning in the console.
- Static utilities and dynamic utilities can be mixed freely.
- Best suited for demos, prototypes, learning projects, and lightweight apps that want utility-first styling without a build pipeline.

## Project Structure

```text
src/
  config/
    dynamic.js
    palette.js
    styles.js
  core/
    engine.js
    observer.js
    processor.js
    resolver.js
  utils/
    colorResolver.js
  index.js
```

## Development Example

```bash
npm install
```

Then create a simple `index.html`:

```html
<h1 class="chai-text-red-300 chai-text-4xl chai-font-bold">
  Hello ChaiWindCSS
</h1>
<script type="module" src="./src/index.js"></script>
```

## License

MIT
