import type React from 'react';

import { DialogHost } from '../Dialog/Dialog';
import { DrawerHost } from '../Drawer/Drawer';
import { SelectMenuHost } from '../Select/SelectMenu/SelectMenuHost';

export const GeckoUIPortal = (): React.ReactElement => (
  <>
    <DialogHost />
    <DrawerHost />
    <SelectMenuHost />
  </>
);

GeckoUIPortal.displayName = 'GeckoUIPortal';
