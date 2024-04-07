import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FilterSliceState } from './types';

const initialState: FilterSliceState = {
	searchValue: '',
	category: 'All',
	sort: 'asc',
	limit: 8,
	isPublished: false
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		changeCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload;
		},
		changeSort: (state, action: PayloadAction<'asc' | 'desc'>) => {
			state.sort = action.payload;
		},
		changeLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload;
		},
		onReset: state => {
			state.sort = 'asc';
			state.category = 'All';
			state.searchValue = '';
			state.limit = 8;
		},
		changeIsPublished: (state, action: PayloadAction<boolean>) => {
			state.isPublished = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		}
	}
});

export const {
	changeCategory,
	changeSort,
	changeIsPublished,
	changeLimit,
	onReset,
	setSearchValue
} = filterSlice.actions;

export default filterSlice.reducer;
