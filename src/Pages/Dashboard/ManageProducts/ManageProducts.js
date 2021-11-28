import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://nameless-badlands-61718.herokuapp.com/products").then((result) => {
      setProducts(result.data);
    });
  }, []);

  const handleDelete = (key) => {
    const confirmDelete = window.confirm(
      "Are you Sure, You want to delete The Product?"
    );
    if (confirmDelete) {
      axios
        .delete(`https://nameless-badlands-61718.herokuapp.com/products/${key}`)
        .then((result) => {
          const remaining = products.filter((product) => product._id !== key);
          setProducts(remaining);
        });
    }
  };
  return (
    <Container>
      <Typography variant="h3">All Products: {products.length}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="right">product Name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={product.productImgUrl}
                    alt=""
                    width="100px"
                    height="100px"
                  />
                </TableCell>
                <TableCell align="right">{product.productTitle}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageProducts;
