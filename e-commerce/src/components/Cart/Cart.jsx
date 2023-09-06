import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import { Skeleton } from "@mui/material";
const Cart = ({ cart, cartItems }) => {
  const length = cartItems.length;

  const EmptyCart = () => (
    <Typography variant="h5">
      You Have No Items In Your Shopping Cart,Start Shopping Now
    </Typography>
  );
  const FilledCart = () => (
    <>
      {cart ? (
        <Grid container spacing={3} sx={{ mt: 12 }}>
          <Grid>
            {cart?.line_items?.map((item) => (
              <Grid key={item.id} item xs={12} sm={4}>
                <div>{item.name}</div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        <Skeleton />
      )}

      <div>
        <Typography variant="h4">
          SubTotal:{cart.subtotal.formatted_with_symbol}
        </Typography>
        <Button
          size="large"
          type="button"
          variant="contained"
          color="secondary"
          sx={{ mr: 3 }}
        >
          EmptyCart
        </Button>

        <Button size="large" type="button" variant="contained" color="primary">
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
