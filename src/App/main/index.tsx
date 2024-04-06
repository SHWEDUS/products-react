import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import CatalogFilter from '../../containers/catalog-filter';
import ProductsList from '../../containers/products-list';
import TabsContainer from '../../containers/tabs-container';
import { type RootState, useAppDispatch } from '../../redux';
import { fetchCategories } from '../../redux/categorySlice/asyncActions';
import { fetchProducts } from '../../redux/productsSlice/asyncActions';
import { logout } from '../../redux/userSlice/slice';

function Main() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const select = useSelector((state: RootState) => ({
		user: state.user,
		limit: state.filter.limit
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
		dispatch(fetchCategories())
	}, []);
	
	useEffect(() => {
		dispatch(fetchProducts({limit: select.limit}))
		
	}, [select.limit]);
	
	return (
		<PageLayout
			user={select.user}
			title={'Продукты'}
			logout={callbacks.onLogout}
		>
			<TabsContainer />
			<ProductsList />
		</PageLayout>
	);
}

export default memo(Main);
