import $api from '../../http';
import type { IProduct } from '../../models/IProduct';
import type {
	fetchProductsArgs,
	postProductArgs,
	putProductArgs
} from '../../redux/productsSlice/types';
import { AxiosResponse } from 'axios';

export default class ProductsService {
	static async getProducts(
		params: fetchProductsArgs
	): Promise<AxiosResponse<IProduct[]>> {
		return $api.get(
			`/products?limit=${params.limit === 0 ? '' : params.limit}&sort=${params.sort}`
		);
	}

	static async getProductsById(
		id: number | string
	): Promise<AxiosResponse<IProduct>> {
		return $api.get(`/products/${id}`);
	}

	static async postProduct(
		data: postProductArgs
	): Promise<AxiosResponse<IProduct>> {
		return $api.post(`/products`, {
			...data
		});
	}

	static async putProducts({
		id,
		dataPut
	}: putProductArgs): Promise<AxiosResponse<IProduct>> {
		return $api.put(`/products/${id}`, {
			...dataPut
		});
	}

	static async deleteProducts(
		id: number | string
	): Promise<AxiosResponse<IProduct>> {
		return $api.delete(`/products/${id}`);
	}

	static async getProductsByCategory(
		params: fetchProductsArgs
	): Promise<AxiosResponse<IProduct[]>> {
		return $api.get(
			`/products/category/${params.category}?limit=${params.limit}&sort=${params.sort}`
		);
	}
}
