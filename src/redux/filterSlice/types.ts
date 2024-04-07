import type { SortType } from '../../models/SortType';

export interface FilterSliceState {
	searchValue: string;
	category: string;
	sort: 'asc' | 'desc';
	limit: number;
	isPublished: boolean;
}
