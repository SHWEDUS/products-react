import { memo } from 'react';
import { Input, Select, Button, Form } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

interface AuthFormArgs {
	name: string;
	email: string;
}

interface AuthFormProps {
	login: ({ name, email }: Record<string, string>) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ login }) => {
	const [form] = Form.useForm<AuthFormArgs>();
	const navigate = useNavigate();

	const handleFormSubmit = (values: AuthFormArgs) => {
		login({ name: values.name, email: values.email });
		navigate(`/products`);
	};

	return (
		<Form form={form} onFinish={handleFormSubmit}>
			<Title style={{ fontSize: '25px' }}>Авторизуйтесь</Title>
			<Form.Item
				label='Login'
				name='name'
				rules={[{ required: true, message: 'Enter a login!' }]}
			>
				<Input autoComplete={'off'} />
			</Form.Item>
			<Form.Item
				label='Password'
				name='password'
				rules={[{ required: true, message: 'Enter a password!' }]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				label='Confirm password'
				name='confirm'
				rules={[
					{
						required: true,
						message: 'Confirm your password!'
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(
								new Error('The new password that you entered do not match!')
							);
						}
					})
				]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Отправить
				</Button>
			</Form.Item>
		</Form>
	);
};

export default memo(AuthForm);
