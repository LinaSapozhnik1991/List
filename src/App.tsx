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
            <BrowserRouter basename='/List'>
                <Navbar />
                <Routes>
                    <Route path="/List" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/edit/:id" element={<EditProduct />} /> 
                    <Route path="/create-product" element={<CreateProduct />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;