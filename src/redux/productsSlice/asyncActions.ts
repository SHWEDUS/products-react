import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IProduct } from '../../models/IProduct';
import ProductsService from '../../services/productsService';
import type { fetchProductsArgs, fetchProductsByIdArgs } from './types';

export const fetchProducts = createAsyncThunk<IProduct[], fetchProductsArgs>(
	'product/fetchProducts',
	async (params) => {
		const { data } = await ProductsService.getProducts({ ...params });
		return data
	}
)



export const fetchProductsById = createAsyncThunk<IProduct, fetchProductsByIdArgs>(
	'product/fetchProductsById',
	async ({id}) => {
		const { data } = await ProductsService.getProductsById(id);
		return data
	}
)