import React from "react";

import { TextField, Grid } from "@mui/material";

import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Controller
          name={name}
          control={control}
          defaultValue="" //
          render={({ field }) => (
            <TextField
              label={label}
              required={required}
              {...field} // Spread the field properties onto the TextField
            />
          )}
        />
      </Grid>
    </>
  );
};

export default FormInput;
