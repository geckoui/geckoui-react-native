import type React from 'react';

import { DialogHost } from '../Dialog/Dialog';
import { DrawerHost } from '../Drawer/Drawer';
import { GeckoUIOverlayHosts } from './GeckoUIOverlayHosts';

export const GeckoUIPortal = (): React.ReactElement => (
  <>
    <GeckoUIOverlayHosts />
    <DialogHost />
    <DrawerHost />
  </>
);

GeckoUIPortal.displayName = 'GeckoUIPortal';
