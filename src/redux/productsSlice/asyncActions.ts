import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IProduct } from '../../models/IProduct';
import ProductsService from '../../services/productsService';
import type { FetchProductsArgs } from './types';

export const fetchProducts = createAsyncThunk<IProduct[]>(
	'product/fetchProducts',
	async () => {
		const { data } = await ProductsService.getProducts();
		console.log(data);
		return data
	}
)