import { Flex } from 'antd';
import { memo, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Item from '../../components/item';
import List from '../../components/list';
import type { IProduct } from '../../models/IProduct';
import { Status } from '../../models/Status';
import { useAppDispatch } from '../../redux';
import { selectFilters } from '../../redux/filterSlice/selectors';
import { changeLimit } from '../../redux/filterSlice/slice';
import {
	fetchProducts,
	fetchProductsByCategory
} from '../../redux/productsSlice/asyncActions';
import {
	selectProducts,
	selectStatus
} from '../../redux/productsSlice/selectors';

function ProductsList() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [products, setProducts] = useState<IProduct[]>([]);
	const status = useSelector(selectStatus);
	const productsInit = useSelector(selectProducts);
	const filter = useSelector(selectFilters);
	const { ref, inView } = useInView({
		threshold: 0.5
	});

	useEffect(() => {
		const length = products.length;
		if (products.length > 0 && inView && filter.limit <= length) {
			dispatch(changeLimit(filter.limit + 5));
		}
	}, [products, inView]);

	useEffect(() => {
		filter.category === 'All' &&
			dispatch(
				fetchProducts({
					limit: filter.limit,
					sort: filter.sort
				})
			);
	}, [filter.limit, filter.sort, filter.category]);

	useEffect(() => {
		filter.searchValue
			? setProducts(
					productsInit.filter(product =>
						product.title
							.toLowerCase()
							.includes(filter.searchValue.toLowerCase())
					)
				)
			: setProducts(productsInit);
	}, [filter.searchValue, productsInit]);

	useEffect(() => {
		filter.category !== 'All' &&
			dispatch(
				fetchProductsByCategory({
					category: filter.category,
					sort: filter.sort,
					limit: filter.limit
				})
			);
	}, [filter.category, filter.sort, filter.limit]);

	const callbacks = {
		redirectTo: useCallback(
			(id: string | number) => navigate(`/products/${id}`),
			[navigate]
		)
	};

	const renders = {
		item: useCallback(
			(item: IProduct) => (
				<Item
					isLoading={status === Status.LOADING}
					item={item}
					redirectTo={callbacks.redirectTo}
				/>
			),
			[status, callbacks.redirectTo, Status]
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
