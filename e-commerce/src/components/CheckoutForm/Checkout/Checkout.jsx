import React, { useState } from "react";
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

import { styles } from "./styles";
const steps = ["Shipping adress", "Payment details"];
const Confirmation = () => <div>confirmation</div>;

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const classes = { ...styles };

  const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);
  return (
    <>
      <div sx={{ ...styles.toolbar }} className={classes.toolbar}>
        <main sx={{ ...styles.layout }} className={classes.layout}>
          <Paper sx={{ ...styles.paper }} className={classes.paper}>
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
            {activeStep === steps.length ? <Confirmation /> : <Form />}
          </Paper>
        </main>
      </div>
    </>
  );
};

export default Checkout;
