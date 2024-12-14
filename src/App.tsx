import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Products from './components/pages/Products';
import ProductDetail from './components/pages/ProductDetail';
import CreateProduct from './components/pages/CreateProduct';
import Navbar from './components/Navbar';
import EditProduct from './components/EditProduct';

const App: React.FC = () => {
    return (
        <div className='App'>
            <BrowserRouter basename='"https://LinaSapozhnik1991.github.io/List'>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/edit/:id" element={<EditProduct />} /> 
                    <Route path="/create-product" element={<CreateProduct />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;