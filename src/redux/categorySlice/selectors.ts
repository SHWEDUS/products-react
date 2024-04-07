import type { RootState } from '../index';

export const selectCategories = (state: RootState) => state.category.items;

export const selectStatusCategories = (state: RootState) =>
	state.category.status;
