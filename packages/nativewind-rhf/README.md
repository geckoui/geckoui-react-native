# @geckoui/nativewind-rhf

[React Hook Form](https://react-hook-form.com) wrappers for [`@geckoui/nativewind`](https://www.npmjs.com/package/@geckoui/nativewind) components.

[![npm](https://img.shields.io/npm/v/@geckoui/nativewind-rhf)](https://www.npmjs.com/package/@geckoui/nativewind-rhf)

## Install

```sh
npm install @geckoui/nativewind-rhf react-hook-form
```

Make sure `@geckoui/nativewind` is already set up in your app — see [its README](https://www.npmjs.com/package/@geckoui/nativewind).

### Peer dependencies

| Package | Min version |
|---|---|
| `@geckoui/nativewind` | `>=0.1` |
| `react` | `>=18` |
| `react-hook-form` | `>=7` |
| `react-native` | `>=0.73` |
| `nativewind` | `>=4` |

## Setup

Add the stylesheet **after** the base package's stylesheet in your `global.css`:

```css
@import '@geckoui/nativewind/styles.css';
@import '@geckoui/nativewind-rhf/styles.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

The order matters — RHF error-state rules need to load after the base component styles to win the cascade.

## Usage

```tsx
import { FormProvider, useForm } from 'react-hook-form';
import { Button, SelectOption } from '@geckoui/nativewind';
import {
  RHFInput,
  RHFInputGroup,
  RHFSelect,
} from '@geckoui/nativewind-rhf';

interface FormValues {
  email: string;
  country: string;
}

export default function SignUpForm() {
  const methods = useForm<FormValues>({
    defaultValues: { email: '', country: '' },
  });

  const onSubmit = methods.handleSubmit((values) => {
    console.log(values);
  });

  return (
    <FormProvider {...methods}>
      <RHFInputGroup label="Email" required>
        <RHFInput
          name="email"
          rules={{ required: 'Email is required' }}
          keyboardType="email-address"
        />
      </RHFInputGroup>

      <RHFInputGroup label="Country" required>
        <RHFSelect
          name="country"
          rules={{ required: 'Choose a country' }}
          placeholder="Pick a country"
        >
          <SelectOption value="us" label="United States" />
          <SelectOption value="uk" label="United Kingdom" />
        </RHFSelect>
      </RHFInputGroup>

      <Button onPress={onSubmit}>Submit</Button>
    </FormProvider>
  );
}
```

`RHFInputGroup` wraps `Label` + the RHF input + an automatic `RHFError` underneath. It auto-detects the inner RHF component (any component whose `displayName` contains `"rhf"`) to bind error display.

## Components

### Foundation
- **`RHFController`** — wraps RHF's `Controller`, auto-injects `control` from `useFormContext`
- **`RHFError`** — renders the active validation message via `InputError`
- **`RHFInputGroup`** — Label + child input + RHFError combo

### Wrappers
- **`RHFInput`** — text input (with `transform.input` / `transform.output` hooks)
- **`RHFTextarea`**
- **`RHFNumberInput`** — numeric-only with `maxFractionDigits`, `maxWholeDigitPlaces`, `strict`, `positiveOnly`
- **`RHFCurrencyInput`** — `RHFNumberInput` + currency symbol/code chrome + thousands separator
- **`RHFCheckbox`** — boolean / single-with-uncheckedValue / multi-array modes; supports `label`
- **`RHFRadio`** — radio bound to a name; supports `label`
- **`RHFSwitch`**
- **`RHFSelect`** — single + multi modes
- **`RHFDateInput`**
- **`RHFDateRangeInput`**
- **`RHFOTPInput`**
- **`RHFCounterInput`**

## Validation

Pass any RHF `rules` to a wrapper:

```tsx
<RHFInput
  name="email"
  rules={{
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email',
    },
  }}
/>
```

Errors render automatically below the input (red border + message via `RHFError`). The error styling lives in `nativewind-rhf/styles.css` — override the relevant `.GeckoUIRHF<Component>--error` class to customize.

## License

MIT
