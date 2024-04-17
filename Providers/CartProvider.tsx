// @ts-nocheck
import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

    const getTotalAmount = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex((item) => item.id === itemId);
    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].quantity -= 1;
      if (updatedCartItems[existingItemIndex].quantity === 0) {
        updatedCartItems.splice(existingItemIndex, 1);
      }
      setCartItems(updatedCartItems);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, 
              addToCart, 
              removeFromCart, 
              totalCartItems: getTotalCartItems() ,
              totalAmount: getTotalAmount(),
            }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};