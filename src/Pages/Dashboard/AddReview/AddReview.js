import { Button, Container, Grid, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const AddReview = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const onSubmit = (data) => {
    axios
      .post("https://nameless-badlands-61718.herokuapp.com/reviews", data)
      .then((result) => {
        if (result.data.insertedId) {
          alert("Review Submited!");
          reset();
        }
      });
  };
  return (
    <div>
      <Container>
        <h2>Write a Review</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item md={8}>
              <TextField
                label="Name"
                variant="standard"
                required
                defaultValue={user.displayName}
                {...register("reviewerName")}
              />
            </Grid>
            <Grid item md={8}>
              <TextField
                label="Rating"
                variant="standard"
                required
                {...register("reviewerRating", { min: 1, max: 5 })}
                type="number"
              />
              <div>
                <small>(1-5)</small>
              </div>
            </Grid>
            <Grid item md={8}>
              <TextField
                label="write Comment"
                multiline
                rows={4}
                variant="standard"
                required
                {...register("reviewerMessage")}
              />
            </Grid>
            <Grid item md={5}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default AddReview;
