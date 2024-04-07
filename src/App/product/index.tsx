import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import ProductCard from '../../components/productCard';
import type { ProductParams } from '../../models/params/product-params';
import { useAppDispatch } from '../../redux';
import { fetchProductsById } from '../../redux/productsSlice/asyncActions';
import { selectProduct } from '../../redux/productsSlice/selectors';
import { selectUser } from '../../redux/userSlice/selectors';
import { logout } from '../../redux/userSlice/slice';

const Product: React.FC = () => {
	const { id } = useParams<ProductParams>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useSelector(selectUser);
	const product = useSelector(selectProduct);
	const callbacks = {
		onLogout: useCallback(() => {
			dispatch(logout());
			navigate('/');
		}, [navigate, dispatch])
	};

	useEffect(() => {
		if (!user.isAuth) {
			navigate('/');
		}
	}, [user]);

	useEffect(() => {
		id && dispatch(fetchProductsById({ id }));
	}, [id]);

	if (!product) {
		return <></>;
	}

	return (
		<PageLayout user={user} title={product?.title} logout={callbacks.onLogout}>
			<ProductCard {...product} />
		</PageLayout>
	);
};

export default memo(Product);
