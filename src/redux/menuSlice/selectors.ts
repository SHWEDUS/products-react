import type { RootState } from '../index';

export const selectTab = (state: RootState) => state.menu.tab;
