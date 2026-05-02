# @geckoui/nativewind

Component library for React Native apps using [NativeWind](https://www.nativewind.dev/) v4 + Tailwind CSS v3.

[![npm](https://img.shields.io/npm/v/@geckoui/nativewind)](https://www.npmjs.com/package/@geckoui/nativewind)

## Install

```sh
npx expo install nativewind react-native-safe-area-context
npx expo install --dev tailwindcss postcss-import
npm install @geckoui/nativewind
```

> `tailwindcss` must be `^3` — NativeWind v4 does not support Tailwind v4. `npx expo install` pins the correct version automatically.

### Peer dependencies

| Package | Min version |
|---|---|
| `react` | `>=18` |
| `react-native` | `>=0.73` |
| `nativewind` | `>=4` |
| `react-native-safe-area-context` | `>=4` |

## Setup

### 1. `babel.config.js`

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
```

### 2. `postcss.config.js`

```js
module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 3. `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [
    require('nativewind/preset'),
    require('@geckoui/nativewind/preset'),
  ],
  theme: { extend: {} },
  plugins: [],
};
```

> No `node_modules/@geckoui/...` entry needed in `content` — our preset safelists every `GeckoUI*` class.

### 4. `global.css`

```css
@import '@geckoui/nativewind/styles.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. `metro.config.js`

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

module.exports = withNativeWind(getDefaultConfig(__dirname), {
  input: './global.css',
});
```

### 6. `nativewind-env.d.ts`

```ts
/// <reference types="nativewind/types" />
```

### 7. `tsconfig.json`

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "types": ["nativewind/types"]
  }
}
```

### 8. App entry — wrap in providers

```tsx
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GeckoUIPortal } from '@geckoui/nativewind';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* your screens */}
      <GeckoUIPortal />
    </SafeAreaProvider>
  );
}
```

`<GeckoUIPortal />` hosts `Dialog`, `Drawer`, `Toast`, `Tooltip`, and the `Select` bottom-sheet menu — render it once at the app root.

## Usage

```tsx
import { Button, Input, Select, SelectOption } from '@geckoui/nativewind';

<Input placeholder="Email" value={email} onChangeText={setEmail} />

<Select value={country} onChange={setCountry} placeholder="Country" filterable>
  <SelectOption value="us" label="United States" />
  <SelectOption value="uk" label="United Kingdom" />
</Select>

<Button onPress={submit}>Continue</Button>
<Button variant="outlined" onPress={cancel}>Cancel</Button>
```

## What's included

- **Form**: Input, Textarea, Checkbox, Radio, Switch, Select (single + multi + filterable), DateInput, DateRangeInput, OTPInput, CounterInput, Label, InputError
- **Feedback**: Alert, Toast, Tooltip, Spinner, LoadingButton
- **Overlays**: Dialog, ConfirmDialog, Drawer, Menu, Calendar
- **Layout / utilities**: Button, Pagination, GeckoUIPortal, DynamicComponentRenderer

## Theming

Every color is a CSS variable defined in `styles.css`:

```css
:root {
  --color-primary-600: #5b5bd6;
  --color-text-primary: #1a1a1a;
  /* ... */
}

.dark {
  --color-primary-600: #7979e8;
  /* dark overrides */
}
```

Override any token in your `global.css` to retheme the entire library.

Class-based dark mode (`darkMode: 'class'`) — toggle the `dark` class on a parent View to switch.

## Override per component

Three escape hatches, in order of precedence:

```tsx
{/* 1. style prop — single instance, bypasses NativeWind */}
<Button style={{ borderRadius: 999 }}>Pill</Button>

{/* 2. className prop — single instance */}
<Button className="bg-emerald-600">Save</Button>

{/* 3. CSS class override in global.css — affects all instances */}
<style>{`
  @layer components {
    .GeckoUIButton--filled-primary { @apply bg-emerald-600; }
  }
`}</style>
```

## Looking for forms?

See [`@geckoui/nativewind-rhf`](https://www.npmjs.com/package/@geckoui/nativewind-rhf) — React Hook Form wrappers for every input in this package.

## License

MIT
