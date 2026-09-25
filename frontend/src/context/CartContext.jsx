import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [coupon, setCoupon] = useState(null);

  const addItem = (course) => {
    setItems(prev => {
      if (prev.find(i => i.id === course.id)) return prev;
      return [...prev, course];
    });
  };

  const removeItem = (courseId) => {
    setItems(prev => prev.filter(i => i.id !== courseId));
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const coupons = {
      'WELCOME50': { type: 'percent', value: 50, label: 'Giảm 50%' },
      'SAVE100K': { type: 'fixed', value: 100000, label: 'Giảm 100,000₫' },
      'ENGLISHHUB2026': { type: 'percent', value: 30, label: 'Giảm 30%' },
    };
    const found = coupons[code.toUpperCase()];
    if (found) {
      setCoupon({ code: code.toUpperCase(), ...found });
      return true;
    }
    return false;
  };

  const removeCoupon = () => setCoupon(null);

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const discount = coupon
    ? coupon.type === 'percent' ? Math.round(subtotal * coupon.value / 100) : coupon.value
    : 0;
  const total = Math.max(0, subtotal - discount);
  const itemCount = items.length;

  return (
    <CartContext.Provider value={{
      items, coupon, subtotal, discount, total, itemCount,
      addItem, removeItem, clearCart, applyCoupon, removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
