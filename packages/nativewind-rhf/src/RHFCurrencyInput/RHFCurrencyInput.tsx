import type React from 'react';
import { Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { RHFNumberInput } from '../RHFNumberInput';
import type { RHFCurrencyInputProps } from './RHFCurrencyInput.types';

const formatThousands = (value = ''): string => {
  if (value === '' || value === '-') return value;
  const isNegative = value.startsWith('-');
  const body = isNegative ? value.slice(1) : value;
  const [whole, decimal] = body.split('.');
  const wholeFormatted = whole
    ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : '';
  const out =
    decimal !== undefined ? `${wholeFormatted}.${decimal}` : wholeFormatted;
  return isNegative ? `-${out}` : out;
};

/**
 * `RHFNumberInput` enhanced with a currency symbol prefix and code suffix,
 * plus thousands-separator formatting on the displayed value.
 */
export const RHFCurrencyInput = ({
  className,
  currency,
  transform,
  ...rest
}: RHFCurrencyInputProps): React.ReactElement => (
  <RHFNumberInput
    {...rest}
    strict
    className={twMerge('GeckoUIRHFCurrencyInput', className)}
    transform={{
      input: transform?.input ?? formatThousands,
      output: transform?.output,
    }}
    prefix={
      currency?.symbol ? (
        <Text className="GeckoUIRHFCurrencyInput__currency-symbol">
          {currency.symbol}
        </Text>
      ) : undefined
    }
    suffix={
      currency?.code ? (
        <Text className="GeckoUIRHFCurrencyInput__currency-code">
          {currency.code}
        </Text>
      ) : undefined
    }
  />
);

RHFCurrencyInput.displayName = 'RHFCurrencyInput';
