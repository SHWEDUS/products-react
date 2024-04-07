import { Flex, Image, Rate, Space, Tag } from 'antd';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import type { IProduct } from '../../models/IProduct';
import { Typography } from 'antd';
import styles from './styles.module.scss';
const { Text, Title } = Typography;

const ProductCard: React.FC<IProduct> = props => {
	return (
		<Flex vertical={true}>
			<Flex vertical={true} justify={'center'} align={'center'}>
				<Image height={400} src={props.image} alt={props.title} />
				<Title level={2}>{props.title}</Title>
			</Flex>
			<Flex vertical={true} className={styles.content}>
				<Space>
					<Rate allowHalf disabled defaultValue={props.rating?.rate}></Rate>
					<p>Count of ratings: {props.rating?.count}</p>
				</Space>
				<p>{props.description}</p>
				<p>
					<b>Price: </b>
					<span>{props.price}$</span>
				</p>
			</Flex>
			<Flex justify={'space-between'} align={'center'}>
				<Link className={styles.link} to={'/products'}>
					Назад
				</Link>
				<Tag className={styles.tag}>{props.category}</Tag>
			</Flex>
		</Flex>
	);
};

export default memo(ProductCard);
