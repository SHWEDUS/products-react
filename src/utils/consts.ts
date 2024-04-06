import type { SortType } from '../models/SortType';

export const sortItems: SortType[] = [
	{label: 'популярности', value: 'rating'},
	{label: 'цене', value: 'price'},
	{label: 'алфавиту', value: 'title'}
]

export const siderItems = [
	{label: 'Продукты', id: 1, url: '/products'},
	{label: 'Добавить продукт', id: 2, url: '/products/create'}
]

export const limitItems = [
	{label: '8 продуктов', value: 8},
	{label: '16 продуктов', value: 16},
	{label: 'Все', value: ''}
]