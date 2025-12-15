
import React from 'react';
    function CartItem({ item, onRemove }) {
    return (
        <div className="cart-item">
        <img src={item.image} alt={item.title} className="cart-item-image" />
        <div className="cart-item-info">
            <h4>{item.title}</h4>
            <p>${item.price.toFixed(2)}</p>
            <span>Quantity: {item.quantity}</span>
        </div>
        <button className="remove-btn"
            onClick={() => onRemove(item.id)}>
            Remove
        </button>
        </div>
    );
    }
    export default CartItem;