import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../../Product/Product';
import Cart from '../../Cart/Cart';
import { addToDb,getShoppingCart} from '../../../utilities/fakedb';

const Shop = () => {
    const[products,setProducts] = useState([]);
    const[cart,setCart] =useState([]);
    useEffect( () =>{
        console.log('products load before fetch');
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json')
        .then (res =>res.json())
        .then (data => setProducts(data))
        // console.log('products loaded');
    } ,[]);

     useEffect( () =>{
        // console.log('local storage first line');
        const storedCart =getShoppingCart();
        const savedCart = [];
        for(const id in storedCart)
        {
            const addedProduct = products.find(product => product.id === id);
           
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
            // console.log(addedProduct);
        }
        setCart(savedCart);
        // console.log('locat storage finishd');
     },[products])

    const handleAddtocart = (selectedProduct) =>{
        let newCart = []
        const exists = cart.find(product => product.id ===selectedProduct.id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart,selectedProduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest,exists];
        }
        // console.log(product);
        // cart.push(product);
        // const newCart =[...cart,selectedProduct];
        setCart(newCart);
        addToDb(selectedProduct.id);
    }
       
    return (
        <div className='shop-container'>
          <div className='products-container'>
              {
                products.map(product => <Product

                 key={product.id}
                 product = {product}
                 handleAddtocart={handleAddtocart}
                ></Product>)
              }
          </div>
          <div className='cart-container'>
              <Cart cart={cart}></Cart>
          </div>

        </div>
    );
};

export default Shop;