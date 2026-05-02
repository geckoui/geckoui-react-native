# GeckoUI for React Native

Component library for React Native apps built with NativeWind, plus first-party React Hook Form wrappers.

## Packages

| Package | Description |
|---|---|
| [`@geckoui/nativewind`](./packages/nativewind) | UI components: Button, Input, Select, Calendar, OTPInput, Dialog, Drawer, Toast, Tooltip, and more |
| [`@geckoui/nativewind-rhf`](./packages/nativewind-rhf) | React Hook Form wrappers around the components above |

## Quick start

```sh
npx expo install nativewind react-native-safe-area-context
npx expo install --dev tailwindcss postcss-import
npm install @geckoui/nativewind
# Optional, only if you use React Hook Form:
npm install @geckoui/nativewind-rhf react-hook-form
```

See [the consumer setup guide](./packages/nativewind/README.md) for full configuration (Tailwind preset, `global.css`, Metro, providers).

```tsx
import './global.css';
import { Button, Input } from '@geckoui/nativewind';

export default function App() {
  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Input placeholder="Email" />
      <Button onPress={submit}>Continue</Button>
    </View>
  );
}
```

## Repo layout

```
.
├── apps/playground/        # Expo demo app — every component on display
├── packages/
│   ├── nativewind/         # UI components
│   └── nativewind-rhf/     # RHF wrappers
└── internal_doc/           # Internal design docs
```

## Development

```sh
pnpm install
pnpm dev          # turbo dev
pnpm build        # build all publishable packages
pnpm typecheck    # type-check across workspace
pnpm lint         # biome lint
```

## Releasing

This repo uses [Changesets](https://github.com/changesets/changesets):

```sh
pnpm changeset    # create a changeset entry for your changes
pnpm bump         # apply pending changesets, bump versions, update CHANGELOGs
pnpm release      # build and publish to npm
```

## License

MIT — see [LICENSE](./LICENSE).
