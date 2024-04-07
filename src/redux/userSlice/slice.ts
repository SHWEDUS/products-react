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
			state.isAuth = true;
			localStorage.setItem(
				'user',
				JSON.stringify({
					isAuth: true,
					name: action.payload.name
				})
			);
		},
		logout: state => {
			state.name = '';
			state.isAuth = false;
			localStorage.removeItem('user');
		}
	}
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
