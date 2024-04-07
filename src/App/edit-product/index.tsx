import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FormProduct from '../../components/form-product';
import PageLayout from '../../components/page-layout';
import type { FormProductArgs } from '../../models/forms/FormProductsArgs';
import type { IProduct } from '../../models/IProduct';
import type { ProductParams } from '../../models/params/product-params';
import { type RootState, store, useAppDispatch } from '../../redux';
import { products } from '../../redux/exports';
import {
	deleteProduct,
	fetchProducts,
	postProduct,
	putProduct
} from '../../redux/productsSlice/asyncActions';
import {
	addProduct,
	removeProduct,
	updateProduct
} from '../../redux/productsSlice/slice';
import { logout } from '../../redux/userSlice/slice';

const EditProduct: React.FC = () => {
	const { id } = useParams<ProductParams>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const select = useSelector((state: RootState) => ({
		user: state.user,
		product:
			state.products.items.find(item => item.id === Number(id)) ||
			state.products.myItems.find(item => item.id === Number(id))
	}));

	useEffect(() => {
		dispatch(fetchProducts({ limit: 0, sort: 'asc' }));
	}, []);

	const callbacks = {
		onLogout: useCallback(() => {
			dispatch(logout());
			navigate('/');
		}, [navigate]),
		sendForm: useCallback(
			(data: FormProductArgs) => {
				const date = new Date().toJSON().slice(0, 10).replace(/-/g, '.');
				id && dispatch(putProduct({ id: id, dataPut: { ...data, date } }));
				id && dispatch(updateProduct({ ...data, date, id: Number(id) }));
				navigate('/products');
			},
			[store, id]
		),
		onDelete: useCallback(() => {
			if (
				window.confirm(
					`Are you sure you want to delete a '${select.product?.title}'`
				)
			) {
				dispatch(deleteProduct({ id: Number(id) }));
				dispatch(removeProduct(Number(id)));
				navigate('/products');
			}
		}, [store, id]),
		onReset: useCallback(() => navigate('/products'), [navigate])
	};

	useEffect(() => {
		if (!select.user.isAuth) {
			navigate('/');
		}
	}, [select.user]);

	if (!select.product) {
		return <></>;
	}

	return (
		<PageLayout
			user={select.user}
			title={`${select.product.title} (Edit)`}
			logout={callbacks.onLogout}
		>
			<FormProduct
				type={'edit'}
				sendForm={callbacks.sendForm}
				onReset={callbacks.onReset}
				onDelete={callbacks.onDelete}
				initValues={select.product}
			/>
		</PageLayout>
	);
};

export default memo(EditProduct);
