
import React, { useState, useEffect } from 'react';
import CartList from './Cart/CardList';
import './Cart/Cart_style.css';

function App() {

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleAddToCart = (event) => {
      const product = event.detail;
      
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        
        if (existingItem) {

          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {

          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    };

    window.addEventListener('addToCart', handleAddToCart);
    
    return () => {
      window.removeEventListener('addToCart', handleAddToCart);
    };
  }, []);

  const handleRemove = (productId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-summary">
        <span>Items: {totalItems}</span>
        <span>Total: ${totalPrice.toFixed(2)}</span>
      </div>
      <CartList items={cartItems} onRemove={handleRemove} />
    </div>
  );
}

export default App;