export type SortDirection = 'asc' | 'desc';

export const getSortIcon = <T extends string>(currentKey: T, activeKey: T, direction: SortDirection): string => {
  if (currentKey === activeKey) {
    return direction === 'asc' ? 'heroicons-outline:arrow-up' : 'heroicons-outline:arrow-down';
  }

  return 'heroicons-outline:arrows-up-down';
};

export const getNextSortState = <T extends string>(
  key: T,
  currentSortBy: T,
  currentSortDir: SortDirection,
): { sortBy: T; sortDir: SortDirection } => {
  let sortDir: SortDirection;

  if (key !== currentSortBy) {
    sortDir = 'asc';
  } else if (currentSortDir === 'asc') {
    sortDir = 'desc';
  } else {
    sortDir = 'asc';
  }

  return { sortBy: key, sortDir };
};
