import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormProduct from '../../components/form-product';
import PageLayout from '../../components/page-layout';
import type { FormProductArgs } from '../../models/forms/FormProductsArgs';
import { type RootState, store, useAppDispatch } from '../../redux';
import { postProduct } from '../../redux/productsSlice/asyncActions';
import { addProduct } from '../../redux/productsSlice/slice';
import type { postProductArgs } from '../../redux/productsSlice/types';
import { logout } from '../../redux/userSlice/slice';

const CreateProduct: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const select = useSelector((state: RootState) => ({
		user: state.user
	}));
	const callbacks = {
		onLogout: useCallback(() => {
			dispatch(logout());
			navigate('/');
		}, [navigate]),
		sendForm: useCallback(
			(data: FormProductArgs) => {
				const date = new Date().toJSON().slice(0, 10).replace(/-/g, '.');
				dispatch(addProduct({ ...data, date } as postProductArgs));
				dispatch(postProduct({ ...data, date } as postProductArgs));
				navigate('/products');
			},
			[store]
		),
		onReset: useCallback(() => navigate('/products'), [navigate])
	};

	useEffect(() => {
		if (!select.user.isAuth) {
			navigate('/');
		}
	}, [select.user]);

	return (
		<PageLayout
			user={select.user}
			title={'Create Product'}
			logout={callbacks.onLogout}
		>
			<FormProduct
				type={'create'}
				sendForm={callbacks.sendForm}
				onReset={callbacks.onReset}
			/>
		</PageLayout>
	);
};

export default memo(CreateProduct);
