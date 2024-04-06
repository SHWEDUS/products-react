import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SortType } from '../../models/SortType';
import type { FilterSliceState} from './types';

const initialState: FilterSliceState = {
	searchValue: '',
	category: 'All',
	currentPage: 1,
	sort: {
		label: 'популярности',
		value: 'rating'
	},
	limit: 8,
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		changeCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload
		},
		changeSort: (state, action: PayloadAction<SortType>) => {
			state.sort = action.payload
		},
		changeLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
		onReset: (state) => {
			state.currentPage = 1
			state.sort = {
				label: 'популярности',
				value: 'rating'
			}
			state.category = 'All'
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload
		}
	},
})

export const { changeCategory, changeSort, changeLimit, setCurrentPage, onReset, setSearchValue} = filterSlice.actions

export default filterSlice.reducer