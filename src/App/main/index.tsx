import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import { type RootState, useAppDispatch } from '../../redux';
import { fetchProducts } from '../../redux/productsSlice/asyncActions';
import { logout } from '../../redux/userSlice/slice';

function Main() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const select = useSelector((state: RootState) => ({
		user: state.user,
		products: state.products
	}));
	const callbacks = {
		
		onLogout: useCallback(() => {
			dispatch(logout());
			navigate('/');
		}, [navigate])
	};
	
	useEffect(() => {
		if (!select.user.isAuth) {
			navigate('/')
		}
	}, [select.user]);
	
	useEffect(() => {
		dispatch(fetchProducts())
	}, []);
	console.log(select.products.items);
	return (
		<PageLayout
			user={select.user}
			title={'Продукты'}
			logout={callbacks.onLogout}
			footer={<></>}
		>
			{select?.products?.items?.length > 0 && select?.products?.items?.map(item => (
				<div>{item.title}</div>
			))}
		</PageLayout>
	);
}

export default memo(Main);
