let counter = 0;

export const generateToastId = (): string => `toast-${++counter}`;

export const variantGlyph = (variant?: string): string => {
  switch (variant) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'warning':
      return '!';
    case 'info':
      return 'i';
    default:
      return '!';
  }
};
