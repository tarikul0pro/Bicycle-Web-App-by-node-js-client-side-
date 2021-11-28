import { Button, Container, Grid, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const url = "https://nameless-badlands-61718.herokuapp.com/products";
    axios.post(url, data).then((result) => {
      if (result.data.insertedId) {
        alert("Product Successfully Inserted.");
        reset();
      }
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Grid container spacing={4} sx={{ width: "40%" }}>
            <Grid item sm={6} xs={12} md={6}>
              <TextField
                required
                {...register("productTitle", { required: true })}
                label="Title"
                variant="standard"
              />
            </Grid>
            <Grid item sm={6} xs={12} md={6}>
              <TextField
                required
                {...register("productImgUrl", { required: true })}
                label="Image Url"
                variant="standard"
              />
            </Grid>
            <Grid item sm={6} xs={12} md={6}>
              <TextField
                required
                {...register("productPrice", { required: true })}
                label="Price"
                variant="standard"
              />
            </Grid>
            <Grid item sm={6} xs={12} md={6}>
              <TextField
                required
                {...register("RangeControl")}
                label="Product Range Control"
                variant="standard"
              />
            </Grid>
            <Grid item sm={6} xs={12} md={6}>
              <TextField
                required
                {...register("resolution")}
                label="Resolution"
                variant="standard"
              />
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
              <TextField
                required
                {...register("productDescription", { required: true })}
                multiline
                rows={4}
                label="Description"
              />
            </Grid>
            <Grid item sm={6} xs={12} md={6}>
              <Button variant="contained" color="success" type="submit">
                Add Product
              </Button>
            </Grid>
          </Grid>
        </Container>
      </form>
    </>
  );
};

export default AddProduct;
