import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import ProductsList from '../../containers/products-list';
import ProductsTable from '../../containers/products-table';
import TabsContainer from '../../containers/tabs-container';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { useAppDispatch } from '../../redux';
import { fetchCategories } from '../../redux/categorySlice/asyncActions';
import { selectTab } from '../../redux/menuSlice/selectors';
import { selectUser } from '../../redux/userSlice/selectors';
import { logout } from '../../redux/userSlice/slice';

function Main() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useSelector(selectUser);
	const tab = useSelector(selectTab);

	const callbacks = {
		onLogout: useCallback(() => {
			dispatch(logout());
			navigate('/');
		}, [navigate, dispatch])
	};

	useAuthenticated(user);

	useEffect(() => {
		dispatch(fetchCategories());
	}, []);

	return (
		<PageLayout user={user} title={'Products'} logout={callbacks.onLogout}>
			<TabsContainer />
			{tab === '1' ? <ProductsList /> : <ProductsTable />}
		</PageLayout>
	);
}

export default memo(Main);
