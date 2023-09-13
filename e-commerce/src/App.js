import "./App.css";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import commerce from "./lib/commerce";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";

function App() {
  // fetch all products from commerce.js api
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //Fetch products from commerce.js
  const fetchProducts = async () => {
    if (isLoading) {
      <Skeleton variant="rectangular" width={210} height={118} />;
    }
    const { data } = await commerce.products.list();
    setIsLoading(false);
    setProducts(data);
  };

  //Fetch Cart from commerce.js

  const fetchCart = async () => {
    const response = await commerce.cart.retrieve();

    setCart(response);
  };

  ///Handle Add To Cart Functionality

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);

    console.log(cart, "addCart");
  };

  //Get Cart Contents

  const cartContents = async () => {
    const contents = await commerce.cart.contents();
    console.log(`contents`, contents);
    setCartItems(contents);
  };

  //Update Cart Quantity

  const handleUpdateCartQty = async (productId, quantity) => {
    const updatedItem = await commerce.cart.update(productId, { quantity });
    setCart(updatedItem.cart);
  };
  //Remove Items From Cart
  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  //Empty The Cart

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };
  //Render the products and cart once the component mounts
  useEffect(() => {
    fetchProducts();
    fetchCart();
    cartContents();
  }, []);

  return (
    <div>
      {cart ? (
        <Navbar totalItems={cart.total_items} />
      ) : (
        "Loading Cart Contents..."
      )}
      <Router>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          />
          {/*  */}
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                cartItems={cartItems}
                handleUpdateCartQty={handleUpdateCartQty}
                handleEmptyCart={handleEmptyCart}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            }
          />
          <Route path="/checkout" element={<Checkout cart={cart} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
