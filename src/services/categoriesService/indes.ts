import $api from '../../http';
import { AxiosResponse } from "axios";

export default class CategoriesService {
	static async getCategories(): Promise<
		AxiosResponse<[]>
	> {
		return $api.get(`/products/categories`);
	}
}
