import React from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Products from './components/pages/Products';
import ProductDetail from './components/pages/ProductDetail';
import CreateProduct from './components/pages/CreateProduct';
import Navbar from './components/Navbar';
import EditProduct from './components/EditProduct';

const App: React.FC = () => {
    return (
        <div className='App'>
            <HashRouter >
                <Navbar />
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/edit/:id" element={<EditProduct />} /> 
                    <Route path="/create-product" element={<CreateProduct />} />
                </Routes>
            </HashRouter>
        </div>
    );
};

export default App;