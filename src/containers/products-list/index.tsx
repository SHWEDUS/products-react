import { Flex, Pagination } from 'antd';
import {memo, useCallback} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Item from '../../components/item';
import List from '../../components/list';
import type { IProduct } from '../../models/IProduct';
import type { RootState } from '../../redux';

function ProductsList() {
	const navigate = useNavigate();
	const select = useSelector((state: RootState) => ({
		products: state.products.items,
		currentPage: state.filter.currentPage
	}));
	
	const callbacks = {
		redirectTo: useCallback((id: string | number) => navigate(`/products/${id}`), [navigate])
	}
	
	const renders = {
		item: useCallback((item: IProduct) => (
			<Item item={item} redirectTo={callbacks.redirectTo}/>
		), []),
	};
	
	return (
		<Flex vertical={true}>
			<List list={select.products} renderItem={renders.item}/>
			<Pagination defaultCurrent={select.currentPage} total={select.products.length}/>
		</Flex>
	);
}

export default memo(ProductsList);
