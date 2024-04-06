import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormProduct from '../../components/form-product';
import PageLayout from '../../components/page-layout';
import type { FormProductArgs } from '../../models/forms/FormProductsArgs';
import { type RootState, store, useAppDispatch } from '../../redux';
import { postProduct } from '../../redux/productsSlice/asyncActions';
import { addProduct } from '../../redux/productsSlice/slice';
import { logout } from '../../redux/userSlice/slice';


const CreateProduct: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const select = useSelector((state: RootState) => ({
		user: state.user,
	}));
	const callbacks = {
		onLogout: useCallback(() => {
			dispatch(logout());
			navigate('/');
		}, [navigate]),
		sendForm: useCallback((data: FormProductArgs) => {
			const date = new Date().toJSON().slice(0,10).replace(/-/g,'.');
			dispatch(addProduct({...data, date}));
			dispatch(postProduct({...data, date}));
		}, [store]),
		onReset: useCallback(() => navigate('/products'), [navigate])
	};
	
	useEffect(() => {
		if (!select.user.isAuth) {
			navigate('/')
		}
	}, [select.user]);
	
	return (
		<PageLayout
			user={select.user}
			title={'Create Product'}
			logout={callbacks.onLogout}
		>
			<FormProduct sendForm={callbacks.sendForm} onReset={callbacks.onReset}/>
		</PageLayout>
	);
}

export default memo(CreateProduct);
