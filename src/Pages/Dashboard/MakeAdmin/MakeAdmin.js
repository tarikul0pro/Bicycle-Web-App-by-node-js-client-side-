import { Button, Container, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const MakeAdmin = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const url = "https://nameless-badlands-61718.herokuapp.com/admin";
    axios.put(url, data).then((result) => {
      if (result.data.modifiedCount) {
        alert(`${data.userEmail} is An Admin Now`);
        reset();
      }
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <TextField
            type="email"
            required
            {...register("userEmail", { required: true })}
            label="Email"
            variant="standard"
          />{" "}
          <br />
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ mt: 4 }}
          >
            Make Admin
          </Button>
        </Container>
      </form>
    </>
  );
};

export default MakeAdmin;
