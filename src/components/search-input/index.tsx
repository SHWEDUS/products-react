import { Input } from 'antd';
import React, {memo, useCallback, useLayoutEffect, useState} from 'react';
import debounce from 'lodash.debounce';
import styles from './styles.module.scss'

interface SearchInputProps {
	onChange: (value: string) => void;
	value: string;
	type?: string;
	placeholder: string;
}
const SearchInput: React.FC<SearchInputProps> = (props) => {
	const [value, setValue] = useState(props.value);
	
	const onChangeDebounce = useCallback(
		debounce(value => props.onChange(value), 600),
		[props.onChange]
	);
	
	// Обработчик изменений в поле
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		onChangeDebounce(event.target.value);
	};
	
	// Обновление стейта, если передан новый value
	useLayoutEffect(() => setValue(props.value), [props.value]);
	
	return (
		<Input
			allowClear
			className={styles.input}
			value={value}
			type={props.type}
			placeholder={props.placeholder}
			onChange={onChange}
		/>
	)
}

export default memo(SearchInput);
