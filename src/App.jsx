import './App.css'
import React, { useState, useEffect } from 'react';

const productsData = [
  { id: 1, name: 'Javascript Fundamentals', amount: 10 },
  { id: 2, name: 'Introduction to Data Analytics', amount: 20 },
  { id: 3, name: 'Web Development Bootcamp', amount: 15 },
  // Add more products here
];

const App = () => {
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState('');
  const couponCode = 'WEB3BRIDGECOHORTx';

  useEffect(() => {
    // Calculate total whenever the cart changes
    const newTotal = cart.reduce((acc, item) => acc + item.amount * item.quantity, 0);
    setTotal(newTotal);

    // Save cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // If item already exists in the cart, update quantity
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // If item doesn't exist, add it to the cart
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleCouponApply = () => {
    if (coupon === couponCode) {
      // Apply 10% discount
      setTotal(total * 0.9);
    }
  };

  useEffect(() => {
    // Load cart from local storage on component mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  return (
    <div>
      <h1>One Stop TECH Shop!</h1>
      <div>
        <h2>Our Products</h2>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.name} - ${product.amount}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Shopping Cart</h2>
        {cart.map((item) => (
          <div key={item.id}>
            <p>
              {item.name} - ${item.amount} - Quantity: {item.quantity}
            </p>
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </div>
        ))}
        <p>Total: ${total.toFixed(2)}</p>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button onClick={handleCouponApply}>Apply Coupon</button>
      </div>

      <button>PAY NOW</button>
    </div>
  );
};

export default App;
