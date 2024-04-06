import type { MenuSliceState } from '../redux/menuSlice/types';

export const getMenu = (): MenuSliceState => {
	try {
		const menu = JSON.parse(localStorage.getItem('menu') as string) || {tab: '1'};
		return menu;
	} catch (e) {
		return {
			tab: '1'
		}
	}
};