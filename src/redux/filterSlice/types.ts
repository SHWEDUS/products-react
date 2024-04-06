import type { SortType } from '../../models/SortType';

export interface FilterSliceState {
	searchValue: string;
	category: string;
	currentPage: number;
	sort: SortType;
	limit: number;
}
