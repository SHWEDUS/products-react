import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SortType } from '../../models/SortType';
import type { FilterSliceState } from './types';

const initialState: FilterSliceState = {
	searchValue: '',
	category: 'All',
	currentPage: 1,
	sort: {
		label: 'ancient',
		value: 'asc'
	},
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
		changeSort: (state, action: PayloadAction<SortType>) => {
			state.sort = action.payload;
		},
		changeLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		onReset: state => {
			state.currentPage = 1;
			state.sort = {
				label: 'ancient',
				value: 'asc'
			};
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
	setCurrentPage,
	onReset,
	setSearchValue
} = filterSlice.actions;

export default filterSlice.reducer;
