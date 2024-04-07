import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateProduct from './create-product';
import EditProduct from './edit-product';
import Login from './login';
import Main from './main';
import Product from './product';

function App() {
	return (
		<Routes>
			<Route path={''} element={<Login />} />
			<Route path={'/products'} element={<Main />} />
			<Route path={'/products/:id'} element={<Product />} />
			<Route path={'/products/create'} element={<CreateProduct />} />
			<Route path={'/products/edit/:id'} element={<EditProduct />} />
		</Routes>
	);
}

export default App;
