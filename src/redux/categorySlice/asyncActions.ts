import { createAsyncThunk } from '@reduxjs/toolkit';
import CategoriesService from '../../services/categoriesService';

export const fetchCategories = createAsyncThunk<string[]>(
	'product/fetchCategories',
	async () => {
		const { data } = await CategoriesService.getCategories();
		return data
	}
)