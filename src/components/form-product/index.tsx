import { Button, Flex, Form, Input, InputNumber, Switch } from 'antd';
import React, { memo } from 'react';
import type { FormProductArgs } from '../../models/forms/FormProductsArgs';
import type { IProduct } from '../../models/IProduct';
const { TextArea } = Input;

interface FormProductProps {
	sendForm: (data: FormProductArgs) => void;
	onReset: () => void;
	initValues?: IProduct;
	type: 'edit' | 'create';
	onDelete?: () => void;
}

const FormProduct: React.FC<FormProductProps> = props => {
	const [form] = Form.useForm<FormProductArgs>();
	return (
		<Form
			form={form}
			name={'product-form'}
			onFinish={props.sendForm}
			onReset={props.onReset}
			initialValues={props.initValues}
		>
			<Form.Item
				name={'title'}
				label={'Name of product'}
				rules={[{ required: true, message: 'Enter product name' }]}
			>
				<Input autoComplete={'off'} />
			</Form.Item>
			<Form.Item
				name={'price'}
				label={'Product price'}
				rules={[{ required: true, message: 'Assign a price to the product' }]}
			>
				<InputNumber min={1} autoComplete={''} addonAfter={'$'} />
			</Form.Item>
			<Form.Item
				name={'description'}
				label={'Product description'}
				rules={[
					{ required: true, message: 'Enter a description for the product' }
				]}
			>
				<TextArea autoComplete={''} rows={5} />
			</Form.Item>
			<Form.Item name={'isPublished'} label={'Published product'}>
				<Switch />
			</Form.Item>
			<Flex gap={20}>
				<Button form={'product-form'} htmlType={'reset'} type={'default'}>
					Cancel
				</Button>
				<Button form={'product-form'} htmlType={'submit'} type={'primary'}>
					Send
				</Button>
				{props.type === 'edit' && (
					<Button
						form={'product-form'}
						htmlType={'button'}
						danger
						type={'primary'}
						onClick={props.onDelete}
					>
						Delete
					</Button>
				)}
			</Flex>
		</Form>
	);
};

export default memo(FormProduct);
