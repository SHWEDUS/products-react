import type { FormProductArgs } from '../models/forms/FormProductsArgs';
import type { postProductArgs } from '../redux/productsSlice/types';

export const getMyItems = (): postProductArgs[] => {
	try {
		const items = JSON.parse(localStorage.getItem('items') as string) || [];
		return items;
	} catch (e) {
		return []
	}
};
