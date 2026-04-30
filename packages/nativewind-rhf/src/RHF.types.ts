import type {
  Control,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';

export interface RHFBaseProps {
  /** Name of the input field. Will be injected into the RHF Controller. */
  name: string;

  /** RHF validation rules. */
  rules?: ControllerProps['rules'];

  /**
   * RHF control object. By default uses `useFormContext()`.
   *
   * Pass explicitly when you have nested `FormProvider`s and need to bind
   * to a specific form instance.
   */
  // biome-ignore lint/suspicious/noExplicitAny: matches RHF's own Control<any> default
  control?: Control<any>;
}

export interface RHFRenderArgs<T extends FieldValues> {
  field: ControllerRenderProps<T>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<T>;
}
