import React from 'react';
import { useSelector } from 'react-redux';
import './ProductDetail.css';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
   import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'; 


interface Product {
    beanId: number;
    flavorName: string;
    imageUrl: string;
    description: string;
    ingredients: string;
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); 
    const product = useSelector((state: { products: { products: Product[] } }) => 
        state.products.products.find(item => item.beanId === Number(id))
    );

    if (!product) {
        return <div> not found</div>;
    }

    return (
        <div className='ProductDetail'>
            <h1>{product.flavorName}</h1> 
            <img className='ProductDetailImg' src={product.imageUrl} alt={product.flavorName} />
            <p className='Description'>{product.description}</p>
            <p className='Ingredients'>{product.ingredients}</p>

            <Link className='Edit' to={`/edit/${id}`}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
                <FontAwesomeIcon icon={faPencilAlt} aria-hidden="true" />Редактировать
            </Link>

            {/* <Link className='back' to="/"> <i className="fa fa-arrow-left" aria-hidden="true"></i> Go back</Link> */}
         
        </div>
    );
};

export default ProductDetail;