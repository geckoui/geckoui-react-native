import React from 'react';

import type { SelectOptionConfig } from './SelectOption/SelectOption.types';

export function isTextIncludes(text: string, keyword: string): boolean {
  return text.toLowerCase().includes(keyword.toLowerCase());
}

export function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

export function isSelectOption(el: unknown): boolean {
  return (
    React.isValidElement(el) &&
    (el.type as { displayName?: string })?.displayName === 'SelectOption'
  );
}

export function isSelectTrigger(el: unknown): boolean {
  return (
    React.isValidElement(el) &&
    (el.type as { displayName?: string })?.displayName === 'SelectTrigger'
  );
}

export function isSelectEmpty(el: unknown): boolean {
  return (
    React.isValidElement(el) &&
    (el.type as { displayName?: string })?.displayName === 'SelectEmpty'
  );
}

export function isHideSelectOption({
  keyword,
  label,
  visibility = 'default',
  isEmpty,
}: {
  keyword: string;
  label: string;
  visibility?: string;
  isEmpty: boolean;
}): boolean {
  const isInclude = keyword && !isTextIncludes(label, keyword);
  if (visibility === 'default' && isInclude) return true;
  if (visibility === 'empty' && !isEmpty) return true;
  if (visibility === 'filtered-and-empty' && !isEmpty && isInclude) return true;
  return false;
}

export function findSelectOptions<T>(
  el: unknown,
): SelectOptionConfig<T> | SelectOptionConfig<T>[] | null {
  if (
    typeof el === 'string' ||
    typeof el === 'number' ||
    typeof el === 'boolean'
  )
    return null;
  if (isSelectOption(el)) {
    const { children: _, ...rest } = (el as React.ReactElement).props as {
      children?: unknown;
      [key: string]: unknown;
    };
    return {
      value: rest.value as T,
      label: rest.label as string,
      visibility: rest.visibility as SelectOptionConfig<T>['visibility'],
      props: rest as SelectOptionConfig<T>['props'],
    };
  }
  if (
    React.isValidElement(el) &&
    (el.props as { children?: unknown }).children
  ) {
    return findSelectOptions<T>((el.props as { children?: unknown }).children);
  }
  if (Array.isArray(el)) {
    const options: SelectOptionConfig<T>[] = [];
    for (const child of el) {
      const option = findSelectOptions<T>(child);
      if (option)
        Array.isArray(option) ? options.push(...option) : options.push(option);
    }
    return options;
  }
  return null;
}
