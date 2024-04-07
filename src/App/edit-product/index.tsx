import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FormProduct from '../../components/form-product';
import PageLayout from '../../components/page-layout';
import type { FormProductArgs } from '../../models/forms/FormProductsArgs';
import type { ProductParams } from '../../models/params/product-params';
import { useAppDispatch } from '../../redux';
import {
	deleteProduct,
	fetchProducts,
	putProduct
} from '../../redux/productsSlice/asyncActions';
import { selectMyProducts } from '../../redux/productsSlice/selectors';
import { removeProduct, updateProduct } from '../../redux/productsSlice/slice';
import { selectUser } from '../../redux/userSlice/selectors';
import { logout } from '../../redux/userSlice/slice';

const EditProduct: React.FC = () => {
	const { id } = useParams<ProductParams>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useSelector(selectUser);
	const product = useSelector(selectMyProducts).find(
		item => item.id === Number(id)
	);

	useEffect(() => {
		dispatch(fetchProducts({ limit: 0, sort: 'asc' }));
	}, []);

	const callbacks = {
		onLogout: useCallback(() => {
			dispatch(logout());
			navigate('/');
		}, [navigate, dispatch]),
		sendForm: useCallback(
			(data: FormProductArgs) => {
				const date = new Date().toJSON().slice(0, 10).replace(/-/g, '.');
				id && dispatch(putProduct({ id: id, dataPut: { ...data, date } }));
				id && dispatch(updateProduct({ ...data, date, id: Number(id) }));
				navigate('/products');
			},
			[dispatch, id]
		),
		onDelete: useCallback(() => {
			if (
				window.confirm(`Are you sure you want to delete a '${product?.title}'`)
			) {
				dispatch(deleteProduct({ id: Number(id) }));
				dispatch(removeProduct(Number(id)));
				navigate('/products');
			}
		}, [dispatch, id, window]),
		onReset: useCallback(() => navigate('/products'), [navigate])
	};

	useEffect(() => {
		if (!user.isAuth) {
			navigate('/');
		}
	}, [user]);

	if (!product?.title) {
		return <></>;
	}

	return (
		<PageLayout
			user={user}
			title={`${product.title} (Edit)`}
			logout={callbacks.onLogout}
		>
			<FormProduct
				type={'edit'}
				sendForm={callbacks.sendForm}
				onReset={callbacks.onReset}
				onDelete={callbacks.onDelete}
				initValues={product}
			/>
		</PageLayout>
	);
};

export default memo(EditProduct);
