/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProducts, toggleLike, removeProduct } from '../../store/ProductSlice';
import Pagination from '../Pagination';
import './Products.css';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart, faFaceFrown } from '@fortawesome/free-regular-svg-icons';
import { faTrash, } from '@fortawesome/free-solid-svg-icons';
import Preloader from '../../ui/Preloader';



interface Product {
    beanId: number;
    flavorName: string;
    name: string,
    imageUrl: string;
    isLiked?: boolean; 
}

const Products: React.FC = () => {
    const dispatch = useDispatch();
    const products: Product[] = useSelector((state: { products: { products: Product[] } }) => state.products.products);
    const [filter, setFilter] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const itemsPerPage = 3; 

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://jellybellywikiapi.onrender.com/api/Beans/');
                console.log('API Response:', response.data); 

                const items = response.data.items;

                if (Array.isArray(items)) {
                    dispatch(setProducts(items.map((item: Product) => ({ ...item, isLiked: false }))));
                } else {
                    console.error("Получены некорректные данные:", response.data);
                }
            } catch (error) {
                console.error('Ошибка при получении продуктов:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [dispatch]);


    const filteredProducts = products.filter(product =>
        product.flavorName && product.flavorName.toLowerCase().includes(filter.toLowerCase())
    );


    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div className='Products'>
            <h1 className='ProductListTitle'> Список товаров </h1>
            <input
                className='Searh'
                id='Searh'
                type="text"
                placeholder="Введите название целиком или его часть..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <div className='ProductList'>
                {loading ? (
                    <Preloader/>
                ) : (
                    filteredProducts.length > 0 && currentProducts.length > 0 ? (
                        currentProducts.map(product => (
                            <div className='ProductsCards' key={product.beanId}>
                                <Link className='ProductsCardsLink' to={`/products/${product.beanId}`}>
                                    <img src={product.imageUrl} alt={product.flavorName} />
                                    <h3>{product.flavorName.length > 30 ? `${product.flavorName.substring(0, 30)}...` : product.flavorName}</h3>
                                </Link>
                           
                                <div className='buttons'>
    <button className='Like button' onClick={() => dispatch(toggleLike(product.beanId))}>
        <FontAwesomeIcon icon={product.isLiked ? solidHeart : regularHeart} />
    </button>
    <button className='Remove button' onClick={() => dispatch(removeProduct(product.beanId))}>
        <FontAwesomeIcon icon={faTrash} />
    </button>
</div>
                            </div>
                        ))
                    ) : (<div className='frown'>
                        <p>Такие товары не найдены</p>
                        <FontAwesomeIcon icon={faFaceFrown} size='2xl' />
                </div>
                    )
                )}
            </div>
          
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        
        </div>
    );
};

export default Products;