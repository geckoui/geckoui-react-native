import type { ReactNode } from 'react';

import { useSelect } from '../Select.context';
import type { SelectConsumerProps } from './SelectConsumer.types';

const SelectConsumer = <T,>({ render }: SelectConsumerProps<T>): ReactNode => {
  const value = useSelect<T>();
  return render(value);
};

SelectConsumer.displayName = 'SelectConsumer';

export { SelectConsumer };
