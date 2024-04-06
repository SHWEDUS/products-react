import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getMenu } from '../../utils/getMenu';
import type { MenuSliceState } from './types';

const initialState: MenuSliceState = getMenu();

export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		changeTab: (state, action: PayloadAction<string>) => {
			state.tab = action.payload;
			localStorage.setItem('menu', JSON.stringify({ ...state, tab: state.tab }));
		},
		
	},
})

export const { changeTab } = menuSlice.actions

export default menuSlice.reducer