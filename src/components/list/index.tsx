import { Flex } from 'antd';
import React, { memo } from 'react';
import type { IProduct } from '../../models/IProduct';
import styles from './styles.module.scss';

interface ListProps {
	list: IProduct[];
	renderItem: (item: IProduct) => React.ReactNode;
}
const List: React.FC<ListProps> = ({ list, renderItem }) => {
	return (
		<Flex className={styles.List} wrap={'wrap'} gap={20} justify={'center'}>
			{list.map(item => (
				<div key={item.id}>{renderItem(item)}</div>
			))}
		</Flex>
	);
};

export default memo(List);
