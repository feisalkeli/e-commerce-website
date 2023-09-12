import React, { useState } from "react";
import { InputLabel, Select, MenuItem, Grid, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";

import commerce from "../../../lib/commerce";

import FormInput from "./CustomTextField";
const AddressForm = () => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState([""]);
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <FormInput name="firstName" required label="First Name" />
            <FormInput name="lastName" required label="Last Name" />
            <FormInput name="address1" required label="Address" />
            <FormInput name="email" required label="Email" />
            <FormInput name="city" required label="City" />
            <FormInput name="zip" required label="Postal Code" />
            <Grid type xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select>
                <MenuItem>United States of America </MenuItem>
              </Select>
            </Grid>
            <Grid type xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select>
                <MenuItem>United States of America </MenuItem>
              </Select>
            </Grid>
            <Grid type xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select>
                <MenuItem>United States of America </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
