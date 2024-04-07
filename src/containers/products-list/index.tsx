import { Flex, Pagination } from 'antd';
import { memo, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Item from '../../components/item';
import List from '../../components/list';
import type { IProduct } from '../../models/IProduct';
import type { SortType } from '../../models/SortType';
import { type RootState, useAppDispatch } from '../../redux';
import { changeLimit } from '../../redux/filterSlice/slice';
import {
	fetchProducts,
	fetchProductsByCategory
} from '../../redux/productsSlice/asyncActions';

function ProductsList() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [products, setProducts] = useState<IProduct[]>([]);
	const select = useSelector((state: RootState) => ({
		products: state.products.items,
		filter: state.filter
	}));
	const { ref, inView } = useInView({
		threshold: 0.5
	});

	useEffect(() => {
		const length = products.length;
		if (products.length > 0 && inView && select.filter.limit <= length) {
			dispatch(changeLimit(select.filter.limit + 5));
		}
	}, [products, inView]);

	useEffect(() => {
		select.filter.category === 'All' &&
			dispatch(
				fetchProducts({
					limit: select.filter.limit,
					sort: select.filter.sort as unknown as 'asc' | 'desc'
				})
			);
	}, [select.filter.limit, select.filter.sort, select.filter.category]);

	useEffect(() => {
		select.filter.searchValue
			? setProducts(
					select.products.filter(product =>
						product.title
							.toLowerCase()
							.includes(select.filter.searchValue.toLowerCase())
					)
				)
			: setProducts(select.products);
	}, [select.filter.searchValue, select.products]);

	useEffect(() => {
		console.log(select.filter.sort);
		select.filter.category !== 'All' &&
			dispatch(
				fetchProductsByCategory({
					category: select.filter.category,
					sort: select.filter.sort as unknown as 'asc' | 'desc',
					limit: select.filter.limit
				})
			);
	}, [select.filter.category, select.filter.sort, select.filter.limit]);

	const callbacks = {
		redirectTo: useCallback(
			(id: string | number) => navigate(`/products/${id}`),
			[navigate]
		)
	};

	const renders = {
		item: useCallback(
			(item: IProduct) => (
				<Item item={item} redirectTo={callbacks.redirectTo} />
			),
			[]
		)
	};

	return (
		<Flex vertical={true}>
			<List list={products} renderItem={renders.item} />
			<div
				style={{
					display: `${products.length === 0 ? 'none' : 'block'}`,
					height: '5px'
				}}
				ref={ref}
			></div>
		</Flex>
	);
}

export default memo(ProductsList);
