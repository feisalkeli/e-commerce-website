import React, { useState, useEffect } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import {
  Paper,
  Stepper,
  Typography,
  CircularProgress,
  Divider,
  Button,
  Step,
  StepLabel,
} from "@mui/material";
import commerce from "../../../lib/commerce";
import { styles } from "./styles";
const steps = ["Shipping adress", "Payment details"];
const Confirmation = () => <div>confirmation</div>;

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const classes = { ...styles };

  useEffect(() => {
    const generateToken = async () => {
      try {
        if (cart) {
          // Fetch token from commerce
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });
          console.log("token", token);
          setCheckoutToken({ ...token });
        }
      } catch (err) {
        console.error(err);
      }
    };
    generateToken();
  }, [cart]);

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );
  return (
    <>
      <div sx={{ ...styles.toolbar }}>
        <main sx={{ ...styles.layout }}>
          <Paper sx={{ ...styles.paper }}>
            <Typography variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={0} sx={{ ...styles.stepper }}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Confirmation />
            ) : (
              checkoutToken && <Form />
            )}
          </Paper>
        </main>
      </div>
    </>
  );
};

export default Checkout;
