import type { RHFNumberInputProps } from '../RHFNumberInput';

interface Currency {
  /** Symbol shown as the input prefix, e.g. "$", "€", "¥". */
  symbol?: string;

  /** Code shown as the input suffix, e.g. "USD", "EUR". */
  code?: string;
}

export interface RHFCurrencyInputProps
  extends Omit<RHFNumberInputProps, 'strict'> {
  /** Currency display config. Symbol → prefix, code → suffix. */
  currency?: Currency;
}
