import { Button, Flex, Select, Space } from 'antd';
import React, { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import SearchInput from '../../components/search-input';
import type { LimitType } from '../../models/LimitType';
import type { SortType } from '../../models/SortType';
import { type RootState, store, useAppDispatch } from '../../redux';
import {
	changeCategory,
	changeLimit,
	changeSort,
	onReset,
	setSearchValue
} from '../../redux/filterSlice/slice';
import { limitItems, sortItems } from '../../utils/consts';

const CatalogFilter: React.FC = () => {
	const dispatch = useAppDispatch();
	const select = useSelector((state: RootState) => ({
		filter: state.filter,
		categories: [
			{
				value: 'All',
				label: 'All'
			},
			...state.category.items.map((item: string) => ({
				value: item,
				label: item
			}))
		]
	}));

	const callbacks = {
		// Сортировка
		onSort: useCallback(
			(sort: SortType) => dispatch(changeSort(sort)),
			[store]
		),
		// Поиск
		onSearch: useCallback(
			(query: string) => dispatch(setSearchValue(query)),
			[store]
		),
		// Сброс
		onReset: useCallback(() => dispatch(onReset()), [store]),
		// Фильтр по категории
		onCategory: useCallback(
			(category: string) => dispatch(changeCategory(category)),
			[store]
		),
		// Загрузка карточек
		onLimit: useCallback(
			(limit: LimitType) => {
				dispatch(changeLimit(limit as unknown as number));
			},
			[store]
		)
	};

	return (
		<Flex vertical={true} gap={10}>
			<Space>
				<Select
					style={{ minWidth: '200px' }}
					options={select.categories}
					value={select.filter.category}
					onChange={callbacks.onCategory}
				/>
				<Select
					options={sortItems}
					value={select.filter.sort}
					onChange={callbacks.onSort}
				/>
				<Select
					options={limitItems}
					value={{
						label: `${select.filter.limit} product's`,
						value: select.filter.limit
					}}
					onChange={callbacks.onLimit}
				/>
				<Button onClick={callbacks.onReset} type={'default'}>
					Сбросить
				</Button>
			</Space>
			<Space>
				<SearchInput
					value={select.filter.searchValue}
					onChange={callbacks.onSearch}
					placeholder={'Поиск'}
				/>
			</Space>
		</Flex>
	);
};

export default memo(CatalogFilter);
