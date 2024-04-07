import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FormProductArgs } from '../../models/forms/FormProductsArgs';
import type { IProduct } from '../../models/IProduct';
import { Status } from '../../models/Status';
import { getMyItems } from '../../utils/getMyItems';
import {
	fetchProducts,
	fetchProductsByCategory,
	fetchProductsById,
	postProduct
} from './asyncActions';
import {
	fetchProductsBuilder,
	fetchProductsByIdBuilder,
	postProductBuilder
} from './builders';
import type {
	postProductArgs,
	ProductSliceState,
	putProductArgs
} from './types';

const initialState: ProductSliceState = {
	items: [],
	myItems: getMyItems(),
	status: Status.LOADING
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setStatus: (state, action: PayloadAction<Status>) => {
			state.status = action.payload;
		},
		addProduct: (state, action: PayloadAction<postProductArgs>) => {
			if (!state.lastId) {
				state.myItems = [
					...state.myItems,
					{ ...action.payload, id: state.items.length + 1 }
				];
				state.lastId = state.items.length + 1;
			} else {
				state.myItems = [
					...state.myItems,
					{ ...action.payload, id: state.lastId + 1 }
				];
				state.lastId = state.lastId + 1;
			}

			localStorage.setItem('items', JSON.stringify(state.myItems));
		},
		updateProduct: (state, action: PayloadAction<IProduct>) => {
			const items = state.myItems.filter(item => item.id !== action.payload.id);
			state.myItems = [...items, action.payload];
			localStorage.setItem('items', JSON.stringify([...items, action.payload]));
		},
		removeProduct: (state, action: PayloadAction<number>) => {
			const items = state.myItems.filter(item => item.id !== action.payload);
			state.myItems = items;
			localStorage.setItem('items', JSON.stringify(items));
		}
	},
	extraReducers: builder => {
		fetchProductsBuilder(builder, fetchProducts);
		fetchProductsByIdBuilder(builder, fetchProductsById);
		postProductBuilder(builder, postProduct);
		fetchProductsBuilder(builder, fetchProductsByCategory);
	}
});

export const { setStatus, addProduct, removeProduct, updateProduct } =
	productSlice.actions;

export default productSlice.reducer;
