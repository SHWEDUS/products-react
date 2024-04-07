import { Flex, Switch, Tabs } from 'antd';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux';
import { selectIsPublished } from '../../redux/filterSlice/selectors';
import { changeIsPublished } from '../../redux/filterSlice/slice';
import { selectTab } from '../../redux/menuSlice/selectors';
import { changeTab } from '../../redux/menuSlice/slice';
import { tabsItems } from '../../utils/consts';

function TabsContainer() {
	const dispatch = useAppDispatch();
	const tab = useSelector(selectTab);
	const isPublished = useSelector(selectIsPublished);

	const callbacks = {
		changeTab: useCallback(
			(value: string) => dispatch(changeTab(value)),
			[dispatch]
		),
		changeIsPublished: useCallback(
			(value: boolean) => dispatch(changeIsPublished(value)),
			[dispatch]
		)
	};

	return (
		<Flex justify={'space-between'} align={'center'}>
			<Tabs
				items={tabsItems}
				defaultActiveKey={tab || '1'}
				onChange={callbacks.changeTab}
			/>
			{tab === '2' && (
				<Switch
					checkedChildren={'Published'}
					unCheckedChildren={'Not Published'}
					defaultChecked={isPublished}
					onChange={callbacks.changeIsPublished}
				/>
			)}
		</Flex>
	);
}

export default memo(TabsContainer);
