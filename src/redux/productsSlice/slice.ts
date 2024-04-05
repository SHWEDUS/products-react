import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../models/Status';
import { fetchProducts } from './asyncActions';
import { fetchProductsBuilder } from './builders';
import type { ProductSliceState } from './types';

const initialState: ProductSliceState = {
	items: [],
	status: Status.LOADING
}

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setStatus: (state, action: PayloadAction<Status>) => {
			state.status = action.payload;
		},
	},
	extraReducers: (builder) => {
		fetchProductsBuilder(builder, fetchProducts)
	}
});

export const { setStatus } = productSlice.actions;

export default productSlice.reducer;
