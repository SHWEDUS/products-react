import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser } from '../../utils/getUser';
import { type LoginPayloadAction, UserSliceState } from './types';

const initialState: UserSliceState = getUser();

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<LoginPayloadAction>) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.isAuth = true;
			sessionStorage.setItem(
				'user',
				JSON.stringify({ isAuth: true, name: action.payload.name, email: action.payload.email })
			);
		},
		logout: state => {
			state.name = '';
			state.email = '';
			state.isAuth = false;
			sessionStorage.removeItem('user');
		}
	}
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
