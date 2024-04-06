import $api from '../../http';
import type { IProduct } from '../../models/IProduct';
import type { fetchProductsArgs, FetchProductsArgs } from '../../redux/productsSlice/types';
import { AxiosResponse } from "axios";

export default class ProductsService {
	static async getProducts(params: fetchProductsArgs): Promise<
		AxiosResponse<IProduct[]>
	> {
		// const  { search, category, sorting, currentPage } = params;
		// return $api.get(`/products?page=${currentPage}&limit=4${category}${search}${sorting}&order=desc`);
		return $api.get(`/products?limit=${params.limit}`);
	}
	
	static async getProductsById(id: number | string): Promise<
	AxiosResponse<IProduct>
> {
	return $api.get(`/products/${id}`);
	}

}
