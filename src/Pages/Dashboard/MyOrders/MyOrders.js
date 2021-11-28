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
import useAuth from "../../../hooks/useAuth";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`https://nameless-badlands-61718.herokuapp.com/orders?email=${user.email}`)
      .then((result) => {
        setOrders(result.data);
      });
  }, [user.email]);
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
  return (
    <Container>
      <Typography variant="h3">My Orders:{orders.length}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="right">Orders Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={order.orderImg}
                    alt=""
                    width="100px"
                    height="100px"
                  />
                </TableCell>
                <TableCell align="right">{order.orderName}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MyOrders;
