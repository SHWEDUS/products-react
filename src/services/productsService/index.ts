import $api from '../../http';
import type { IProduct } from '../../models/IProduct';
import type { FetchProductsArgs } from '../../redux/productsSlice/types';
import { AxiosResponse } from "axios";

export default class ProductsService {
	static async getProducts(): Promise<
		AxiosResponse<IProduct[]>
	> {
		// const  { search, category, sorting, currentPage } = params;
		// return $api.get(`/products?page=${currentPage}&limit=4${category}${search}${sorting}&order=desc`);
		return $api.get(`/products`);
	}
}
