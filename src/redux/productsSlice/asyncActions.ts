import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IProduct } from '../../models/IProduct';
import ProductsService from '../../services/productsService';
import type {
	deleteProductArgs,
	fetchProductsArgs,
	fetchProductsByIdArgs,
	postProductArgs,
	putProductArgs
} from './types';

export const fetchProducts = createAsyncThunk<IProduct[], fetchProductsArgs>(
	'product/fetchProducts',
	async params => {
		const { data } = await ProductsService.getProducts({ ...params });
		return data;
	}
);

export const fetchProductsById = createAsyncThunk<
	IProduct,
	fetchProductsByIdArgs
>('product/fetchProductsById', async ({ id }) => {
	const { data } = await ProductsService.getProductsById(id);
	return data;
});

export const fetchProductsByCategory = createAsyncThunk<
	IProduct[],
	fetchProductsArgs
>('product/fetchProductsByCategory', async params => {
	const { data } = await ProductsService.getProductsByCategory({ ...params });
	return data;
});

export const postProduct = createAsyncThunk<IProduct, postProductArgs>(
	'product/postProduct',
	async dataPost => {
		const { data } = await ProductsService.postProduct(dataPost);
		return data;
	}
);

export const putProduct = createAsyncThunk<IProduct, putProductArgs>(
	'product/putProduct',
	async ({ id, dataPut }) => {
		const { data } = await ProductsService.putProducts({ id, dataPut });
		return data;
	}
);

export const deleteProduct = createAsyncThunk<IProduct, deleteProductArgs>(
	'product/deleteProduct',
	async ({ id }) => {
		const { data } = await ProductsService.deleteProducts(id);
		return data;
	}
);
