
import React from 'react';
import CartItem from './CartItem';

    function CartList({ items, onRemove }) {
    if (items.length === 0) {
        return <p className="empty-cart">Cart is empty</p>;
    }

    return (
        <div className="cart-list">
        {items.map(item => (
            <CartItem 
            key={item.id} 
            item={item} 
            onRemove={onRemove} 
            />
        ))}
        </div>
    );
    }

export default CartList;