import React, { useEffect, useState } from "react";
import { InputLabel, Select, MenuItem, Grid, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";

import commerce from "../../../lib/commerce";

import FormInput from "./CustomTextField";
const AddressForm = ({ checkoutToken }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState([""]);
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  ///destruct countries returns an array of an array
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  ///country subdivision
  const countrySubdivison = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );
  //shipping options

  const options = shippingOptions.map((shipments) => ({
    id: shipments.id,
    label: `${shipments.description}-(${shipments.formatted_with_symbol})`,
  }));

  const hardCodedCountries = [
    {
      id: 1,
      countryName: "United States",
    },
    {
      id: 2,
      countryName: "Somalia",
    },
    {
      id: 3,
      countryName: "Monaco",
    },
  ];
  const HardCodedCountries = () =>
    hardCodedCountries.map((country) => (
      <MenuItem key={country.id} value={country.id}>
        {country.countryName}
      </MenuItem>
    ));

  console.log("my countries", countries);
  // fetch shipping countries from commerce.js
  const fetchShippingCountries = async (checkoutTokenId) => {
    try {
      const { countries } = await commerce.services.localeListCountries(
        checkoutTokenId
      );
      if (!countries.ok) {
        throw new Error("couldnt fetch locale shipping countries");
      }
      console.log("countries", countries);
      setShippingCountries(countries);
      console.log(
        "shipping keys",
        setShippingCountry(Object.keys(countries)[0])
      );
    } catch (error) {
      console.log(error, "Error fetching countries");
    }
  };

  ///Fetch subdivisions
  const fetchSubdivisions = async (countryCode) => {
    try {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        countryCode
      );
      setShippingSubdivision(subdivisions);
      console.log(subdivisions, "subdivisions");
      setShippingSubdivision(Object.keys(subdivisions)[0]);
    } catch (err) {
      console.error(err, "failed to fetch subdivisions");
    }
  };

  // fetch shipping options

  const fetchShippingOptions = async (checkoutTokenId, country, region) => {
    try {
      const options = await commerce.checkout.getShippingOptions(
        checkoutTokenId,
        { country, region }
      );
      console.log("options", options, "options");
      setShippingOptions(options);
      setShippingOption(options[0].id);
    } catch (error) {
      console.log(error, "Failed to load shipping options");
    }
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);
  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

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
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries && countries.length > 0 ? (
                  countries.map((country) => (
                    <MenuItem key={country._id} value={country._id}>
                      {country.label}
                    </MenuItem>
                  ))
                ) : (
                  <HardCodedCountries />
                )}
              </Select>
            </Grid>
            <Grid type xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                fullWidth
                value={shippingSubdivision}
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {/* Map Through The Subdivisions */}
                {countrySubdivison && countrySubdivison > 0 ? (
                  countrySubdivison.map((subdivision) => (
                    <MenuItem key={subdivision.id} value={subdivision.id}>
                      {subdivision.label}{" "}
                    </MenuItem>
                  ))
                ) : (
                  <HardCodedCountries />
                )}
              </Select>
            </Grid>
            <Grid type xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                fullWidth
                value={shippingOption}
                onChange={() => setShippingOption(e.target.value)}
              >
                <MenuItem>United States of America </MenuItem>
                {options && options > 0 ? (
                  options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}{" "}
                    </MenuItem>
                  ))
                ) : (
                  <HardCodedCountries />
                )}
              </Select>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
