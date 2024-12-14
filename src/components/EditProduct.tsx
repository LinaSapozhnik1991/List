import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../store/ProductSlice'; // Импортируйте ваше действие
import './EditProduct.css';
import { useNavigate, useParams } from 'react-router-dom';


interface Product {
    beanId: number;
    flavorName: string;
    description: string;
    ingredients: string;
    name:string;
    isLiked: boolean; 
}

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const product = useSelector((state: { products: { products: Product[] } }) => {
        return state.products.products.find(item => item.beanId === Number(id)); 
    });

    const [flavorName, setFlavorName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');

    useEffect(() => {
        if (product) {
            setFlavorName(product.flavorName);
            setDescription(product.description); 
            setIngredients(product.ingredients);
        }
    }, [product]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (product) {
            const updatedProduct: Product = { ...product, flavorName, description, ingredients };
            dispatch(updateProduct(updatedProduct)); 
            navigate(`/products/${id}`);
        }
    };

    if (!product) {
        return <div>Товар не найден</div>; 
    }

    return (
        <form className='EditForm' onSubmit={handleSubmit}>
            <input
                type="text"
                value={flavorName}
                onChange={(e) => setFlavorName(e.target.value)}
                placeholder="Название"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание"
            />
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Состав"
            />
            <button className='EditSaveButton' type="submit">Сохранить</button>
        </form>
    );
};

export default EditProduct;