import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../models/Status';
import { fetchProducts, fetchProductsById } from './asyncActions';
import { fetchProductsBuilder, fetchProductsByIdBuilder } from './builders';
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
		fetchProductsByIdBuilder(builder, fetchProductsById)
	}
});

export const { setStatus } = productSlice.actions;

export default productSlice.reducer;
