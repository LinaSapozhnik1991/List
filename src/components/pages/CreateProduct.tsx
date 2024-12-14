import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/ProductSlice'; 
import './CreateProduct.css';
import { useNavigate } from 'react-router-dom';

interface NewProduct {
    id: number;
    title: string;
    image: string;
    isLiked: boolean;
    description: string;
    ingredients: string;
    name:string;
    beanId:number;
}

const CreateProduct: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newProduct: NewProduct = {
            id: Date.now(),
            title,
            image,
            isLiked: false,
            description,
            ingredients,
            name: '',
            beanId: 0
        };
        dispatch(addProduct(newProduct));
        navigate('/');
    };

    return (
        <div className='CreateProduct'>
            <h1>Создать карточку продукта</h1>
            <form className='CreateForm' onSubmit={handleSubmit}>
                <div className='CreateInput'>
                    <label>Название:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
              
                <div className='CreateInput'>
                    <label>ImageURL:</label>
                    <input 
                        type="text" 
                        value={image} 
                        onChange={(e) => setImage(e.target.value)} 
                    />
                </div>
              
                <div className='CreateInput'>
                    <label>Описание:</label>
                    <input 
                        type='text' 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                
                <div className='CreateInput'>
                    <label>Состав:</label>
                    <input 
                        type='text' 
                        value={ingredients} 
                        onChange={(e) => setIngredients(e.target.value)} 
                    />
                </div>
                
                <button className='CreateButton' type="submit">Создать</button>
            </form>
        </div>
    );
};

export default CreateProduct;