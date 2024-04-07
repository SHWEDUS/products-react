import type { FormProductArgs } from '../../models/forms/FormProductsArgs';
import type { IProduct } from '../../models/IProduct';
import type { Status } from '../../models/Status';

export interface ProductSliceState {
	items: IProduct[];
	item?: IProduct;
	myItems: IProduct[];
	status: Status;
	lastId: number;
}

export type FetchProductsArgs = {
	search: string;
	category: string;
	sorting: string;
	currentPage: number;
};

export interface fetchProductsByIdArgs {
	id: string | number;
}

export interface fetchProductsArgs {
	limit: number;
	sort: 'asc' | 'desc';
	category?: string;
}

export interface postProductArgs {
	date: string;
	title: string;
	price: number;
	description: string;
	isPublished: boolean;
}

export interface putProductArgs {
	id: number | string;
	dataPut: FormProductArgs;
}

export interface deleteProductArgs {
	id: number | string;
}
