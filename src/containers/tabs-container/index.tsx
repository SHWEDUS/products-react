import { Flex, Pagination, Switch, Tabs } from 'antd';
import {memo, useCallback} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Item from '../../components/item';
import List from '../../components/list';
import type { IProduct } from '../../models/IProduct';
import { type RootState, store, useAppDispatch } from '../../redux';
import { changeIsPublished } from '../../redux/filterSlice/slice';
import { changeTab } from '../../redux/menuSlice/slice';
import { tabsItems } from '../../utils/consts';

function TabsContainer() {
	const dispatch = useAppDispatch();
	const select = useSelector((state: RootState) => ({
		tab: state.menu.tab,
		isPublished: state.filter.isPublished
	}));
	
	const callbacks = {
		changeTab: useCallback((value: string) => dispatch(changeTab(value)), [store]),
		changeIsPublished: useCallback((value: boolean) => dispatch(changeIsPublished(value)), [store])
	}
	
	return (
		<Flex justify={'space-between'} align={'center'}>
			<Tabs items={tabsItems} defaultActiveKey={select.tab || '1'} onChange={callbacks.changeTab} />
			{select.tab === '2' && <Switch checkedChildren={'Published'} unCheckedChildren={'Not Published'} defaultChecked={select.isPublished
			} onChange={callbacks.changeIsPublished}/>}
		</Flex>
		
	);
}

export default memo(TabsContainer);
