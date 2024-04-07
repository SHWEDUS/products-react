import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IProduct } from '../../models/IProduct';
import { Status } from '../../models/Status';
import { getLastId } from '../../utils/getLastId';
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
import type { postProductArgs, ProductSliceState } from './types';

const initialState: ProductSliceState = {
	items: [],
	myItems: getMyItems(),
	status: Status.LOADING,
	lastId: getLastId()
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<postProductArgs>) => {
			state.myItems = [
				...state.myItems,
				{ ...action.payload, id: state.lastId + 1 }
			];
			state.lastId = state.lastId + 1;
			localStorage.setItem('lastId', String(state.lastId));
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

export const { addProduct, removeProduct, updateProduct } =
	productSlice.actions;

export default productSlice.reducer;
