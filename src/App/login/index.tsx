import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth-form';
import PageLayout from '../../components/page-layout';
import { useAppDispatch } from '../../redux';
import { selectUser } from '../../redux/userSlice/selectors';
import { setUser } from '../../redux/userSlice/slice';

const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useSelector(selectUser);

	useEffect(() => {
		if (user.isAuth) {
			navigate(-1);
		}
	}, [user]);

	const callbacks = {
		loginUser: useCallback(
			({ name }: Record<string, string>) => dispatch(setUser({ name })),
			[dispatch]
		)
	};

	return (
		<PageLayout user={user} title={'React Chat'}>
			<AuthForm login={callbacks.loginUser} />
		</PageLayout>
	);
};

export default memo(Login);
