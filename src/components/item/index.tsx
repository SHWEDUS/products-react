import { Button, Card, Divider, Flex, Image, Tag } from 'antd';
import React, { memo, useState } from 'react';
import type { IProduct } from '../../models/IProduct';
import { Typography } from 'antd';
import numberFormat from '../../utils/number-format';
import styles from './styles.module.scss'
const  { Title, Text } = Typography;

interface ItemProps {
	item: IProduct
	redirectTo: (id: number | string) => void
}
const Item: React.FC<ItemProps> = (props) =>  {
	const redirectToProduct = () => {
		props.redirectTo(props.item.id)
	}
	return (
		<Card className={styles.Item}>
			<Flex className={styles.container} vertical={true} justify={'space-between'} align={'center'}>
				<div className={styles.header}>
					<Image height={200} src={props.item.image} />
					<Title className={styles.title} level={4}>{props.item.title}</Title>
				</div>
				<Flex className={styles.footer} justify={'center'} align={'center'} gap={100}>
					<Text className={styles.price} >{numberFormat(props.item.price, 'en-US')}$</Text>
					<Button type={'primary'} onClick={redirectToProduct}>Перейти</Button>
				</Flex>
			</Flex>
		</Card>
	)
}

export default memo(Item);