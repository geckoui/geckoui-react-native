import type React from 'react';
import { twMerge } from 'tailwind-merge';

import { RHFInput } from '../RHFInput';
import type { RHFNumberInputProps } from './RHFNumberInput.types';

const sanitize = (
  raw: string,
  {
    strict,
    positiveOnly,
    maxFractionDigits,
    maxWholeDigitPlaces,
  }: {
    strict: boolean;
    positiveOnly: boolean;
    maxFractionDigits?: number;
    maxWholeDigitPlaces?: number;
  },
): string => {
  const isNegative = raw.startsWith('-') && !positiveOnly;
  const cleaned = raw
    .replace(/[^0-9.]/g, '')
    .split('.')
    .slice(0, maxFractionDigits === 0 ? 1 : 2)
    .map((part, index) => {
      if (index === 0) {
        const whole = part.slice(0, maxWholeDigitPlaces);
        if (whole === '') return '';
        return strict ? Number(whole).toString() : whole;
      }
      return part.slice(0, maxFractionDigits);
    })
    .join('.');
  return isNegative ? `-${cleaned}` : cleaned;
};

/**
 * `RHFInput` constrained to numeric input. Strips non-digit characters,
 * caps fractional / whole-digit length, and (optionally) rejects negatives
 * or leading zeros.
 */
export const RHFNumberInput = ({
  strict = true,
  positiveOnly = false,
  maxFractionDigits,
  maxWholeDigitPlaces,
  transform,
  className,
  ...rest
}: RHFNumberInputProps): React.ReactElement => (
  <RHFInput
    keyboardType="decimal-pad"
    {...rest}
    className={twMerge('GeckoUIRHFNumberInput', className)}
    transform={{
      input: transform?.input,
      output:
        transform?.output ??
        ((value: string) =>
          sanitize(value, {
            strict,
            positiveOnly,
            maxFractionDigits,
            maxWholeDigitPlaces,
          })),
    }}
  />
);

RHFNumberInput.displayName = 'RHFNumberInput';
