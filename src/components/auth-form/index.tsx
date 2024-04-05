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
				label='Имя'
				name='name'
				rules={[{ required: true, message: 'Введите имя' }]}
			>
				<Input autoComplete={'off'} />
			</Form.Item>
			<Form.Item
				label='Email'
				name='email'
				rules={[{ required: true, message: 'Введите email' }]}
			>
				<Input type={'email'} autoComplete={'off'} />
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
