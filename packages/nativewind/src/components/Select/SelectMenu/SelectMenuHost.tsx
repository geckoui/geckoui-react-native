import type { ReactNode } from 'react';
import { Fragment, useEffect, useState } from 'react';

type SelectMenuHostEntry = {
  setSlot: (id: number, node: ReactNode | null) => void;
};

const _hostStack: SelectMenuHostEntry[] = [];
let nextId = 0;

export const createSelectMenuSlot = (): number => ++nextId;

export const setSelectMenuNode = (id: number, node: ReactNode | null): void => {
  _hostStack[_hostStack.length - 1]?.setSlot(id, node);
};

export const SelectMenuHost = (): ReactNode => {
  const [slots, setSlots] = useState<Map<number, ReactNode>>(new Map());

  useEffect(() => {
    const entry: SelectMenuHostEntry = {
      setSlot: (id, node) => {
        setSlots((prev) => {
          const next = new Map(prev);
          if (node === null) {
            next.delete(id);
          } else {
            next.set(id, node);
          }
          return next;
        });
      },
    };
    _hostStack.push(entry);
    return () => {
      const idx = _hostStack.indexOf(entry);
      if (idx !== -1) _hostStack.splice(idx, 1);
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
