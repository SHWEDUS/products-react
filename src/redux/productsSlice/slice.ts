import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FormProductArgs } from '../../models/forms/FormProductsArgs';
import { Status } from '../../models/Status';
import { getMyItems } from '../../utils/getMyItems';
import { fetchProducts, fetchProductsById, postProduct } from './asyncActions';
import { fetchProductsBuilder, fetchProductsByIdBuilder, postProductBuilder } from './builders';
import type { postProductArgs, ProductSliceState } from './types';

const initialState: ProductSliceState = {
	items: [],
	myItems: getMyItems(),
	status: Status.LOADING
}

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setStatus: (state, action: PayloadAction<Status>) => {
			state.status = action.payload;
		},
		addProduct: (state, action: PayloadAction<postProductArgs>) => {
			console.log(action.payload);
			state.myItems = [...state.myItems, action.payload];
			localStorage.setItem('items', JSON.stringify(state.myItems));
		},
	},
	extraReducers: (builder) => {
		fetchProductsBuilder(builder, fetchProducts)
		fetchProductsByIdBuilder(builder, fetchProductsById)
		postProductBuilder(builder, postProduct)
	}
});

export const { setStatus, addProduct } = productSlice.actions;

export default productSlice.reducer;
