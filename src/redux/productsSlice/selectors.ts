import type { RootState } from '../index';

export const selectProducts = (state: RootState) => state.products.items;

export const selectStatus = (state: RootState) => state.products.status;

export const selectMyProducts = (state: RootState) => state.products.myItems;

export const selectProduct = (state: RootState) => state.products.item;
