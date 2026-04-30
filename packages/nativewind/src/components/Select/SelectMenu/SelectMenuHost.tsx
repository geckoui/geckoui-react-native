import type { ReactNode } from 'react';
import { Fragment, useEffect, useState } from 'react';

type Listener = () => void;

const slots = new Map<number, ReactNode>();
const listeners = new Set<Listener>();
let nextId = 0;

export const createSelectMenuSlot = (): number => ++nextId;

export const setSelectMenuNode = (id: number, node: ReactNode | null): void => {
  if (node === null) {
    if (!slots.has(id)) return;
    slots.delete(id);
  } else {
    slots.set(id, node);
  }
  for (const listener of listeners) listener();
};

export const SelectMenuHost = (): ReactNode => {
  const [, force] = useState(0);
  useEffect(() => {
    const fn = () => force((n) => n + 1);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);
  return (
    <>
      {Array.from(slots.entries()).map(([id, node]) => (
        <Fragment key={id}>{node}</Fragment>
      ))}
    </>
  );
};

SelectMenuHost.displayName = 'SelectMenuHost';
