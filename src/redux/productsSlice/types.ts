import type { IProduct } from '../../models/IProduct';
import type { Status } from '../../models/Status';

export interface ProductSliceState {
	items: IProduct[];
	status: Status;
}

export type FetchProductsArgs = {
	search: string;
	category: string;
	sorting: string;
	currentPage: number
}

