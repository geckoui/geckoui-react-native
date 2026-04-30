import type React from 'react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import Dialog from '../Dialog/Dialog';
import type { DialogContentProps } from '../Dialog/Dialog.types';
import { LoadingButton } from '../LoadingButton';
import type {
  ConfirmDialogContentProps,
  ConfirmDialogOptions,
} from './ConfirmDialog.types';

function ConfirmDialogContent({
  title,
  content,
  confirmButtonLabel = 'Ok',
  cancelButtonLabel = 'Cancel',
  titleClassName,
  contentClassName,
  confirmButtonClassName,
  cancelButtonClassName,
  dismiss,
  onConfirm,
  onCancel,
}: ConfirmDialogContentProps): React.ReactElement {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const handleConfirm = async () => {
    const result = onConfirm?.({ dismiss });
    if (result instanceof Promise) {
      setConfirmLoading(true);
      try {
        await result;
      } finally {
        setConfirmLoading(false);
      }
    }
    dismiss();
  };

  const handleCancel = async () => {
    const result = onCancel?.({ dismiss });
    if (result instanceof Promise) {
      setCancelLoading(true);
      try {
        await result;
      } finally {
        setCancelLoading(false);
      }
    }
    dismiss();
  };

  const renderContent = (): ReactNode => {
    if (typeof content === 'function') {
      return content({ dismiss }) as ReactNode;
    }
    if (typeof content === 'string') {
      return (
        <Text className="GeckoUIConfirmDialog__content-text">{content}</Text>
      );
    }
    return content as ReactNode;
  };

  return (
    <View>
      {title ? (
        <Text
          className={twMerge('GeckoUIConfirmDialog__title', titleClassName)}
        >
          {title}
        </Text>
      ) : null}
      <View
        className={twMerge('GeckoUIConfirmDialog__content', contentClassName)}
      >
        {renderContent()}
      </View>
      <View className="GeckoUIConfirmDialog__actions">
        <LoadingButton
          variant="outlined"
          size="md"
          loading={cancelLoading}
          disabled={confirmLoading}
          className={twMerge(
            'GeckoUIConfirmDialog__cancel-button',
            cancelButtonClassName,
          )}
          onPress={handleCancel}
        >
          {cancelButtonLabel}
        </LoadingButton>
        <LoadingButton
          size="md"
          loading={confirmLoading}
          disabled={cancelLoading}
          className={twMerge(
            'GeckoUIConfirmDialog__confirm-button',
            confirmButtonClassName,
          )}
          onPress={handleConfirm}
        >
          {confirmButtonLabel}
        </LoadingButton>
      </View>
    </View>
  );
}

const show = (options: ConfirmDialogOptions) => {
  Dialog.show({
    dismissOnEsc: true,
    dismissOnOutsideClick: true,
    ...options,
    className: twMerge('GeckoUIConfirmDialog__dialog', options.className),
    content: ({ dismiss }: DialogContentProps) => (
      <ConfirmDialogContent {...options} dismiss={dismiss} />
    ),
  });
};

const ConfirmDialog = { show, dismiss: Dialog.dismiss };

export default ConfirmDialog;
