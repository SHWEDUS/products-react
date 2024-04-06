import { Button, Flex, Form, Image, Input, InputNumber, Space, Switch, Tag } from 'antd';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import type { FormProductArgs } from '../../models/forms/FormProductsArgs';
import type { IProduct } from '../../models/IProduct';
import { Typography} from 'antd';
import styles from './styles.module.scss'
const {TextArea} = Input

interface FormProductProps {
	sendForm: (data: FormProductArgs) => void;
	onReset: () => void;
}

const FormProduct: React.FC<FormProductProps> = (props) => {
	const [form] = Form.useForm<FormProductArgs>();
	return (
		<Form form={form} name={'create-form'} onFinish={props.sendForm} onReset={props.onReset}>
			<Form.Item name={'title'} label={'Name of product'} rules={[{ required: true, message: 'Enter product name' }]}>
				<Input autoComplete={'off'}/>
			</Form.Item>
			<Form.Item name={'price'} label={'Product price'} rules={[{ required: true, message: 'Assign a price to the product' }]}>
				<InputNumber min={1} autoComplete={''} addonAfter={'$'} />
			</Form.Item>
			<Form.Item name={'description'} label={'Product description'} rules={[{ required: true, message: 'Enter a description for the product' }]}>
				<TextArea autoComplete={''} rows={5} />
			</Form.Item>
			<Form.Item name={'isPublished'} label={'Published product'} rules={[{ required: true, message: 'Note that the product has been published' }]}>
				<Switch />
			</Form.Item>
			<Flex gap={20}>
				<Button form={'create-form'} htmlType={'reset'} type={'default'}>Cancel</Button>
				<Button form={'create-form'} htmlType={'submit'} type={'primary'}>Send</Button>
			</Flex>
		</Form>
	);
}

export default memo(FormProduct);