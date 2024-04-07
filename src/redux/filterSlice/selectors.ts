import type { RootState } from '../index';

export const selectFilters = (state: RootState) => state.filter;

export const selectIsPublished = (state: RootState) => state.filter.isPublished;
