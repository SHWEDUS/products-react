import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../models/Status';
import { fetchCategories } from './asyncActions';
import { fetchCategoriesBuilder } from './builders';
import type { CategorySliceState } from './types';

const initialState: CategorySliceState = {
	items: [],
	status: Status.LOADING
}

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setStatus: (state, action: PayloadAction<Status>) => {
			state.status = action.payload;
		},
	},
	extraReducers: (builder) => {
		fetchCategoriesBuilder(builder, fetchCategories)
	}
});

export const { setStatus } = categorySlice.actions;

export default categorySlice.reducer;
