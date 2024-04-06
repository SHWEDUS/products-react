import type { IProduct } from '../../models/IProduct';
import type { Status } from '../../models/Status';

export interface ProductSliceState {
	items: IProduct[];
	item?: IProduct;
	status: Status;
}

export type FetchProductsArgs = {
	search: string;
	category: string;
	sorting: string;
	currentPage: number
}

export interface fetchProductsByIdArgs {
	id: string | number;
}

export interface fetchProductsArgs {
	limit: number;
}

