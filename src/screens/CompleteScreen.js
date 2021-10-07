import React, { useContext, useEffect } from 'react'
import { Box, CircularProgress, Typography, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { useStyles } from '../styles'
import { Store } from '../Store'
import { createOrder } from '../actions';
import Logo from '../components/Logo';

export default function CompleteScreen(props) {
  const styles = useStyles();
  const { state, dispatch } = useContext(Store);
  const { order } = state;
  const { loading, error, newOrder } = state.orderCreate;

  useEffect(() => {
    if(order.orderItems.length > 0) {
      createOrder(dispatch, order);
    }
  }, [order, dispatch])

  return (
    <Box className={[styles.root]}>
      <Box className={[styles.main, styles.center]}>
        <Box>
          <Logo large></Logo>
          {loading ? (
            <CircularProgress></CircularProgress>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
            <Typography className={styles.title} variant="h3" component="h3" gutterBottom>
              Your order has been placed
            </Typography>
            <Typography className={styles.title} variant="h1" component="h1" gutterBottom>
              Thank You!
            </Typography>
            <Typography className={styles.title} variant="h3" component="h3" gutterBottom>
              Your order number is {newOrder.number}
            </Typography>
            </>
          )}
        </Box>
      </Box>
      <Box className={[styles.center, styles.space]}>
          <Button
          onClick={() => props.history.push('/')}
          variant="contained"
          className={[styles.button_primary, styles.largeButton]}
          >
            Order Again
          </Button>
        </Box>
    </Box>
  )
}
