import "./App.css";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import commerce from "./lib/commerce";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

  //Render the products and cart once the component mounts
  useEffect(() => {
    fetchProducts();
    fetchCart();
    cartContents();
  }, []);

  return (
    <div>
      {!cart ? <Skeleton /> : <Navbar totalItems={cart.total_items} />}
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
            element={<Cart cart={cart} cartItems={cartItems} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
