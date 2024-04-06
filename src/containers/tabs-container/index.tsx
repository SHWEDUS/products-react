import { Flex, Pagination, Tabs } from 'antd';
import {memo, useCallback} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Item from '../../components/item';
import List from '../../components/list';
import type { IProduct } from '../../models/IProduct';
import { type RootState, store, useAppDispatch } from '../../redux';
import { changeTab } from '../../redux/menuSlice/slice';
import { tabsItems } from '../../utils/consts';

function TabsContainer() {
	const dispatch = useAppDispatch();
	const select = useSelector((state: RootState) => ({
		tab: state.menu.tab
	}));
	
	const callbacks = {
		changeTab: useCallback((value: string) => dispatch(changeTab(value)), [store])
	}
	
	return (
		<Tabs items={tabsItems} defaultActiveKey={select.tab || '1'} onChange={callbacks.changeTab}/>
	);
}

export default memo(TabsContainer);
