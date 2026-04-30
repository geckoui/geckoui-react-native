import type { OTPInputProps } from '@geckoui/nativewind';

import type { RHFBaseProps } from '../RHF.types';

export interface RHFOTPInputProps
  extends RHFBaseProps,
    Omit<OTPInputProps, 'value' | 'onChange' | 'onBlur'> {
  /** Called with the current value whenever it changes. */
  onChange?: (value: string) => void;

  /** Called when the OTP input loses focus. */
  onBlur?: (value: string) => void;
}
