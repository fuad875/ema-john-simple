import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Product.css';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    const {name,img,seller,price,ratings} = props.product;
    // const {handleAddtocart,product} = props;
    return (
        <div className='product'>
            <img src={img} alt=''/>
           <div className='product-info'>
           <p className='product-name'>{name}</p>
            <p>Price:${price}</p>
            <p><small>Seller:{seller}</small></p>
            <p><small>Ratings:{ratings} stars</small></p>
           </div>
           <button onClick={() =>props.handleAddtocart(props.product)} className='btn-cart'>
           <p className='btn-text'>Add to Cart</p>
           <FontAwesomeIcon icon={ faShoppingCart }></FontAwesomeIcon>
           </button>
           
        </div>
    );
};

export default Product;