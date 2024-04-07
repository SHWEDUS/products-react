import { Button, Flex, Select, Space } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import SearchInput from '../../components/search-input';
import { Status } from '../../models/Status';
import { useAppDispatch } from '../../redux';
import {
	selectCategories,
	selectStatusCategories
} from '../../redux/categorySlice/selectors';
import { selectFilters } from '../../redux/filterSlice/selectors';
import {
	changeCategory,
	changeLimit,
	changeSort,
	onReset,
	setSearchValue
} from '../../redux/filterSlice/slice';
import { limitItems, sortItems } from '../../utils/consts';

const CatalogFilter: React.FC = () => {
	const [limit, setLimit] = useState(8);
	const dispatch = useAppDispatch();
	const filter = useSelector(selectFilters);
	const status = useSelector(selectStatusCategories);
	const categories = [
		{
			value: 'All',
			label: 'All'
		},
		...useSelector(selectCategories).map((item: string) => ({
			value: item,
			label: item
		}))
	];

	const callbacks = {
		// Сортировка
		onSort: useCallback(
			(sort: 'asc' | 'desc') => dispatch(changeSort(sort)),
			[dispatch]
		),
		// Поиск
		onSearch: useCallback(
			(query: string) => dispatch(setSearchValue(query)),
			[dispatch]
		),
		// Сброс
		onReset: useCallback(() => {
			setLimit(8);
			dispatch(onReset());
		}, [dispatch, setLimit]),
		// Фильтр по категории
		onCategory: useCallback(
			(category: string) => dispatch(changeCategory(category)),
			[dispatch]
		),
		// Загрузка карточек
		onLimit: useCallback(
			(limit: number) => {
				setLimit(limit);
				dispatch(changeLimit(limit));
			},
			[dispatch, setLimit]
		)
	};

	return (
		<Flex vertical={true} gap={10}>
			<Space>
				<Select
					loading={status === Status.LOADING}
					style={{ minWidth: '200px' }}
					options={categories}
					value={filter.category}
					onChange={callbacks.onCategory}
				/>
				<Select
					options={sortItems}
					value={filter.sort}
					onChange={callbacks.onSort}
				/>
				<Select
					options={limitItems}
					value={limit}
					onChange={callbacks.onLimit}
				/>
				<Button onClick={callbacks.onReset} type={'default'}>
					Сбросить
				</Button>
			</Space>
			<Space>
				<SearchInput
					value={filter.searchValue}
					onChange={callbacks.onSearch}
					placeholder={'Поиск'}
				/>
			</Space>
		</Flex>
	);
};

export default memo(CatalogFilter);
