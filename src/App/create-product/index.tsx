import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import ProductCard from '../../components/productCard';
import CatalogFilter from '../../containers/catalog-filter';
import ProductsList from '../../containers/products-list';
import { type RootState, useAppDispatch } from '../../redux';
import { fetchCategories } from '../../redux/categorySlice/asyncActions';
import { fetchProducts, fetchProductsById } from '../../redux/productsSlice/asyncActions';
import { logout } from '../../redux/userSlice/slice';


const CreateProduct: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const select = useSelector((state: RootState) => ({
		user: state.user,
		product: state.products.item
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
	
	if (!select.product) {
		return <></>;
	}
	
	return (
		<PageLayout
			user={select.user}
			title={select.product?.title}
			logout={callbacks.onLogout}
		>
			<ProductCard {...select.product} />
		</PageLayout>
	);
}

export default memo(CreateProduct);