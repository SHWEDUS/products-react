import { Badge, Button, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { IProduct } from '../../models/IProduct';
import { useAppDispatch } from '../../redux';
import { selectIsPublished } from '../../redux/filterSlice/selectors';
import { deleteProduct } from '../../redux/productsSlice/asyncActions';
import { selectMyProducts } from '../../redux/productsSlice/selectors';
import { removeProduct } from '../../redux/productsSlice/slice';
import numberFormat from '../../utils/number-format';

function ProductsTable() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const products = useSelector(selectMyProducts);
	const isPublished = useSelector(selectIsPublished);
	const [table, setTable] = useState(<></>);
	const callbacks = {
		redirectTo: useCallback(
			(id: string | number) => navigate(`/products/edit/${id}`),
			[navigate]
		),
		onDelete: useCallback(
			(id: string | number) => {
				if (
					window.confirm(
						`Are you sure you want to delete a '${products.find(product => product.id === Number(id))?.title}'`
					)
				) {
					dispatch(deleteProduct({ id }));
					dispatch(removeProduct(Number(id)));
				}
			},
			[dispatch, products]
		)
	};

	const columns: ColumnsType = [
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date'
		},
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
			render: value => `${numberFormat(value, 'en-US')} $`,
			width: '90px',
			align: 'center'
		},
		{
			title: 'Published',
			dataIndex: 'isPublished',
			key: 'isPublished',
			render: value => (
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
			return products.filter(product =>
				'isPublished' in product
					? product.isPublished === isPublished
					: !isPublished
			);
		}, [products, isPublished])
	};

	useEffect(() => {
		setTable(
			<Table
				onRow={(element: IProduct) => ({
					onClick: () => {
						callbacks.redirectTo(element.id);
					}
				})}
				rowKey={'id'}
				dataSource={data.tableData()}
				columns={columns}
				pagination={{ pageSize: 5 }}
			/>
		);
	}, [products]);

	return table;
}

export default memo(ProductsTable);
