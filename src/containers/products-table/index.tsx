import { Badge, Button, Flex, Pagination, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { log } from 'node:util';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import product from '../../App/product';
import Item from '../../components/item';
import List from '../../components/list';
import type { FormProductArgs } from '../../models/forms/FormProductsArgs';
import type { IProduct } from '../../models/IProduct';
import { type RootState, store, useAppDispatch } from '../../redux';
import {
	deleteProduct,
	fetchProducts
} from '../../redux/productsSlice/asyncActions';
import { removeProduct } from '../../redux/productsSlice/slice';
import type { postProductArgs } from '../../redux/productsSlice/types';
import numberFormat from '../../utils/number-format';

function ProductsTable() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const select = useSelector((state: RootState) => ({
		products: state.products.myItems,
		isPublished: state.filter.isPublished
	}));

	useEffect(() => {
		dispatch(fetchProducts({ limit: 0, sort: 'asc' }));
	}, []);

	const callbacks = {
		redirectTo: useCallback(
			(id: string | number) => navigate(`/products/edit/${id}`),
			[navigate]
		),
		onDelete: useCallback(
			(id: string | number) => {
				if (
					window.confirm(
						`Are you sure you want to delete a '${select.products.find(product => product.id === Number(id))?.title}'`
					)
				) {
					dispatch(deleteProduct({ id }));
					dispatch(removeProduct(Number(id)));
				}
			},
			[store]
		)
	};

	const columns: ColumnsType = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title'
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description'
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (value, record) => `${numberFormat(value, 'en-US')} $`,
			width: '90px',
			align: 'center'
		},
		{
			title: 'Published',
			dataIndex: 'isPublished',
			key: 'isPublished',
			render: (value, record) => (
				<Badge
					status={value ? 'success' : 'default'}
					text={value ? 'Published' : 'Not Published'}
				/>
			)
		},
		{
			title: 'Action',
			dataIndex: 'id',
			key: 'action',
			render: value => (
				<Button
					danger
					type={'primary'}
					onClick={e => {
						e.stopPropagation();
						callbacks.onDelete(value);
					}}
				>
					Delete
				</Button>
			)
		}
	];

	const data = {
		tableData: useCallback(() => {
			return select.products.filter(product =>
				'isPublished' in product
					? product.isPublished === select.isPublished
					: !select.isPublished
			);
		}, [select.products, select.isPublished])
	};

	return (
		<Table
			onRow={(element: IProduct) => ({
				onClick: () => {
					callbacks.redirectTo(element.id);
				}
			})}
			rowKey={'title'}
			dataSource={data.tableData()}
			columns={columns}
			pagination={{ pageSize: 5 }}
		/>
	);
}

export default memo(ProductsTable);
