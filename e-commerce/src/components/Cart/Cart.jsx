import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import Commerce from "@chec/commerce.js";
import { Skeleton } from "@mui/material";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
const Cart = ({
  cart,
  cartItems,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const length = cartItems.length;
  console.log(cart, "mycart");
  ///Fetch Cart contetnts first to prevent bugs

  const [loading, setLoading] = useState(true);
  const [cartContents, setCartContents] = useState([]);

  useEffect(() => {
    const fetchCartContents = async () => {
      try {
        const contents = await Commerce.cart.contents();
        setCartContents(contents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart contents: ", error);
      }
    };

    fetchCartContents();
  }, []);

  const EmptyCart = () => (
    <Typography variant="h5">
      You Have No Items In Your Shopping Cart,Start Shopping Now
      <Link to="/">
        <div>
          <Button variant="contained" type="button" color="primary">
            Go Back
          </Button>
        </div>
      </Link>
    </Typography>
  );
  const FilledCart = () => (
    <>
      {cartContents ? (
        <Grid
          container
          spacing={3}
          sx={{
            mt: 12,
          }}
        >
          <Grid container spacing={2}>
            <Typography variant="h3" sx={{ textAlign: "center" }}></Typography>
            {cart?.line_items?.map((item) => (
              <Grid key={item.id} item xs={10} sm={4} sx={{ mt: 5, mx: 4 }}>
                {/* Cart Items */}
                <CartItem
                  item={item}
                  onUpdateCartQty={handleUpdateCartQty}
                  onRemoveCartQty={handleRemoveFromCart}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        <Skeleton />
      )}

      <div className="flex ">
        <Typography variant="h4" sx={{ mt: 5 }}>
          SubTotal:
          {/* {cart?.subtotal.formatted_with_symbol ? (
            cart.subtotal.formatted_with_symbol
          ) : (
            <Skeleton />
          )} */}
          {cart ? cart.subtotal.formatted_with_symbol : <Skeleton />}
        </Typography>
        <Button
          size="large"
          type="button"
          variant="contained"
          color="secondary"
          sx={{ mr: 3, minWidth: "150px" }}
          onClick={handleEmptyCart}
        >
          EmptyCart
        </Button>

        <Button
          // component={(Link = "/checkout")}
          size="large"
          type="button"
          variant="contained"
          color="primary"
        >
          Checkout
        </Button>
        <br />
      </div>
    </>
  );
  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography variant="h3" sx={{}}>
        {length ? <FilledCart /> : <EmptyCart />}
      </Typography>
    </Container>
  );
};

export default Cart;
