import type { TabsProps } from 'antd';
import CatalogFilter from '../containers/catalog-filter';
import type { LimitType } from '../models/LimitType';
import type { SortType } from '../models/SortType';

export const sortItems: SortType[] = [
	{ label: 'recent', value: 'desc' },
	{ label: 'ancient', value: 'asc' }
];

export const siderItems = [
	{ label: 'Продукты', id: 1, url: '/products' },
	{ label: 'Добавить продукт', id: 2, url: '/products/create' }
];

export const limitItems: LimitType[] = [
	{ label: "8 product's", value: 8 },
	{ label: "16 product's", value: 16 },
	{ label: "All product's", value: 0 }
];

export const tabsItems: TabsProps['items'] = [
	{
		key: '1',
		label: 'Store',
		children: <CatalogFilter />
	},
	{
		key: '2',
		label: 'Table'
	}
];
