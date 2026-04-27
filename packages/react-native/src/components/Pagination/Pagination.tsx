import type React from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { PaginationProps } from './Pagination.types';

const getPages = (
  currentPage: number,
  totalPages: number,
): (number | string)[] => {
  const ellipsis = '...';
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, ellipsis, totalPages];
  }
  if (currentPage > totalPages - 4) {
    return [
      1,
      ellipsis,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [
    1,
    ellipsis,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    ellipsis,
    totalPages,
  ];
};

export const Pagination = ({
  currentPage,
  totalPages,
  onChange,
  className,
  style,
}: PaginationProps): React.ReactElement | null => {
  if (totalPages <= 1) return null;

  const pages = getPages(currentPage, totalPages);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <View className={twMerge('GeckoPagination', className)} style={style}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: isPrevDisabled }}
        className={twMerge(
          'GeckoPagination__arrow',
          isPrevDisabled && 'GeckoPagination__arrow--disabled',
        )}
        disabled={isPrevDisabled}
        onPress={() => onChange(currentPage - 1)}
      >
        <Text className="GeckoPagination__arrow-icon">‹</Text>
      </Pressable>

      {pages.map((page, index) => {
        const isActive = page === currentPage;
        const isEllipsis = page === '...';
        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            className={twMerge(
              'GeckoPagination__page-button',
              isActive && 'GeckoPagination__page-button--active',
            )}
            disabled={isEllipsis}
            onPress={() => !isEllipsis && onChange(Number(page))}
          >
            <Text
              className={twMerge(
                'GeckoPagination__page-button-text',
                isActive && 'GeckoPagination__page-button-text--active',
                isEllipsis && 'GeckoPagination__page-button-text--ellipsis',
              )}
            >
              {page}
            </Text>
          </Pressable>
        );
      })}

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: isNextDisabled }}
        className={twMerge(
          'GeckoPagination__arrow',
          isNextDisabled && 'GeckoPagination__arrow--disabled',
        )}
        disabled={isNextDisabled}
        onPress={() => onChange(currentPage + 1)}
      >
        <Text className="GeckoPagination__arrow-icon">›</Text>
      </Pressable>
    </View>
  );
};

Pagination.displayName = 'Pagination';
