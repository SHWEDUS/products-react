import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormProduct from '../../components/form-product';
import PageLayout from '../../components/page-layout';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import type { FormProductArgs } from '../../models/forms/FormProductsArgs';
import { useAppDispatch } from '../../redux';
import { postProduct } from '../../redux/productsSlice/asyncActions';
import { addProduct } from '../../redux/productsSlice/slice';
import { selectUser } from '../../redux/userSlice/selectors';
import { logout } from '../../redux/userSlice/slice';

const CreateProduct: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useSelector(selectUser);

	const callbacks = {
		onLogout: useCallback(() => {
			dispatch(logout());
			navigate('/');
		}, [navigate, dispatch]),
		sendForm: useCallback(
			(data: FormProductArgs) => {
				const date = new Date().toLocaleString('ru', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
					timeZone: 'UTC'
				});
				dispatch(addProduct({ ...data, date }));
				dispatch(postProduct({ ...data, date }));
				navigate('/products');
			},
			[dispatch, navigate]
		),
		onReset: useCallback(() => navigate('/products'), [navigate])
	};

	useAuthenticated(user);

	return (
		<PageLayout
			user={user}
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
