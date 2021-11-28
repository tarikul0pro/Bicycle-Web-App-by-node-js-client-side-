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
import { useEffect, useState } from "react";

const ManageAllOrders = () => {
  const [orderId, setOrderId] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`https://nameless-badlands-61718.herokuapp.com/allOrders`).then((result) => {
      setOrders(result.data);
    });
  }, [orderId]);
  const handleDelete = (key) => {
    const getConfirmation = window.confirm(
      "Are you Sure want to cancel your order?"
    );
    if (getConfirmation) {
      axios
        .delete(`https://nameless-badlands-61718.herokuapp.com/orders/${key}`)
        .then((result) => {
          const remaining = orders.filter((order) => order._id !== key);
          setOrders(remaining);
        });
    }
  };
  // http://localhost:8000
  const handleUpdate = (orderId) => {
    setOrderId(orderId);
    const updatedData = ["Delivered"];
    if (orderId) {
      axios
        .put(`http://localhost:8000/orders/${orderId}`, updatedData)
        .then((result) => {
          if (result.data.matchedCount) {
          }
        });
    }
  };

  return (
    <Container>
      <Typography variant="h3">All Orders: {orders.length}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Orders Name</TableCell>
              <TableCell align="right">User Email</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.orderName}
                </TableCell>
                <TableCell align="right">{order.email}</TableCell>
                <TableCell align="right">{order.status}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(order._id)}
                  >
                    Cancel
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleUpdate(order._id)}
                  >
                    Delivered
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

export default ManageAllOrders;
