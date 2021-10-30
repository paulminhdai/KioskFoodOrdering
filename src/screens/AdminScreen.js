import React, { useEffect, useContext } from 'react'
import { useStyles } from '../styles'
import { Box, Button, CircularProgress, TableCell, TableContainer, Table, TableHead, TableRow, TableBody, Paper } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { listOrders } from '../actions';
import axios from 'axios';
import { Store } from '../Store';

export default function AdminScreen() {
  const styles = useStyles();

  const { state, dispatch } = useContext(Store);
  
  const { orders, loading, error } = state.orderList;
  useEffect(() => {
    listOrders(dispatch);
  }, [dispatch]);

  const setOrderStateHandler = async (order, action) => {
    try {
      await axios.put('/api/orders/' + order.number, {
        action: action,
      });
      listOrders(dispatch);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <Box className={styles.root}>
      <Box className={styles.main}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="Orders">
              <TableHead>
                <TableRow>
                  <TableCell>Order#</TableCell>
                  <TableCell align="right">Price&nbsp;($)</TableCell>
                  <TableCell align="right">Count</TableCell>
                  <TableCell align="right">Items</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Payment</TableCell>
                  <TableCell align="right">State</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.name}>
                    <TableCell component="th" scope="row">
                      {order.number}
                    </TableCell>
                    <TableCell align="right">
                      {order.totalPrice}
                    </TableCell>
                    <TableCell align="right">
                      {order.orderItems.length}
                    </TableCell>
                    <TableCell align="right">
                      {order.orderItems.map((item) => (
                        <Box>
                          {item.name} x {item.quantity}
                        </Box>
                      )) }
                    </TableCell>
                    <TableCell align="right">{order.orderType}</TableCell>
                    <TableCell align="right">{order.paymentType}</TableCell>
                    <TableCell align="right">
                      {order.isProgress ? 'In Progress' : 
                      order.isReady ? 'Ready' : 
                      order.isDelivered ? 'Delivered' : 
                      'Unknown'}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => setOrderStateHandler(order, 'ready')}
                        
                      >
                        Ready
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => setOrderStateHandler(order, 'cancel')}
                        
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => setOrderStateHandler(order, 'deliver')}
                        
                      >
                        Deliver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  )
}
