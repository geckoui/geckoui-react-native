import type { RHFInputProps } from '../RHFInput';

export interface RHFNumberInputProps extends RHFInputProps {
  /**
   * Reject leading zeros / sanitize the integer portion. Default `true`.
   * Disable for things like room numbers where leading zeros matter.
   */
  strict?: boolean;

  /**
   * Reject negative numbers. Default `false` (negatives allowed).
   */
  positiveOnly?: boolean;

  /**
   * Max decimal places. `0` forces integer.
   */
  maxFractionDigits?: number;

  /**
   * Max digits before the decimal.
   */
  maxWholeDigitPlaces?: number;
}
