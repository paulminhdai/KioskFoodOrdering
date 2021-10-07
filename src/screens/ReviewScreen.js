import React, { useState, useContext } from 'react'
import { Box, Grid, Card, Dialog, DialogTitle, Button, TextField, Typography, CardActionArea, CardContent  } from '@material-ui/core'
import ArrowRight from '@material-ui/icons/ArrowRight';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import { useStyles } from '../styles'
import { addToOrder, removeFromOrder } from '../actions';
import { Store } from '../Store';

export default function ReviewScreen(props) {
  const { state, dispatch } = useContext(Store);
  const {orderItems, itemsCount, totalPrice, taxPrice, orderType } = state.order;

  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});
  const styles = useStyles();

  const closeHandler = () => {
    setIsOpen(false);
  };

  const productClickHandler = (p) => {
    setProduct(p);
    setIsOpen(true);
  };

  const addToOrderHandler = () => {
    addToOrder(dispatch, { ...product, quantity });
    setIsOpen(false);
  };

  const cancelOrRemoveFromOrder = () => {
    removeFromOrder(dispatch, product);
    setIsOpen(false);
  };

  const procedToCheckoutHandler = () => {
    props.history.push('/select-payment');
  };

  return (
    <Box className={[styles.root]}>
      <Box className={[styles.main, styles.center]}>
      <Dialog
          onClose={closeHandler}
          aria-labelledby="max-width-dialog-title"
          open={isOpen}
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle className={styles.center}>
            Add {product.name}
          </DialogTitle>
          <Box className={[styles.row, styles.center]}>
            <Button
              variant="contained"
              disabled={quantity === 1}
              onClick={(e) => quantity > 1 && setQuantity(quantity - 1)}
              className={[styles.button_secondary]}
            >
              <ArrowLeft />
            </Button>
            <TextField
              inputProps={{ className: styles.largeInput }}
              InputProps={{
                bar: true,
                inputProps: {
                  className: styles.largeInput,
                },
              }}
              className={styles.largeNumber}
              type="number"
              variant="filled"
              min={1}
              value={quantity}
            />
            <Button
              variant="contained"
              className={[styles.button_primary]}
              onClick={(e) => setQuantity(quantity + 1)}
            >
              <ArrowRight />
            </Button>
          </Box>
          <Box className={[styles.row, styles.around]}>
            <Button
              onClick={cancelOrRemoveFromOrder}
              variant="contained"
              size="large"
              className={[styles.largeButton, styles.button_secondary]}
            >
              {orderItems.find((x) => x.name === product.name)
                ? 'Remove From Order'
                : 'Cancel'}
            </Button>

            <Button
              onClick={addToOrderHandler}
              variant="contained"
              size="large"
              className={[styles.largeButton, styles.button_primary]}
            >
              ADD TO ORDER
            </Button>
          </Box>
        </Dialog>
        <Box className={[styles.center, styles.column]}>
          <Typography className={styles.title} gutterBottom variant="h3" component="h3">
            Review your order here
          </Typography>
          <Grid container>
            {orderItems.map((orderItem) => (
              <Grid item md={12} key={orderItem.name}>
                <Card className={styles.card} onClick={() => productClickHandler(orderItem)}>
                  <CardActionArea>
                    <CardContent>
                      <Box className={[styles.row, styles.between]}>
                        <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                          {orderItem.name}
                        </Typography>
                        <Button variant="contained">Edit</Button>
                      </Box>
                      <Box className={[styles.row, styles.between]}>
                        <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                          {orderItem.calorie} Cal
                        </Typography>
                        <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                          {orderItem.quantity} x ${orderItem.price}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box>
          <Box className={[styles.bordered, styles.space, styles.center]}>
            {orderType} | Tax: ${taxPrice} | Total: ${totalPrice} |
            Items: {itemsCount}
          </Box>
          <Box className={[styles.row, styles.around]}>
            <Button
              onClick={() => {
                props.history.push(`/order`);
              }}
              variant="contained"
              className={[styles.largeButton, styles.button_secondary]}
            >
              Back
            </Button>

            <Button
              onClick={procedToCheckoutHandler}
              variant="contained"
              
              disabled={orderItems.length === 0}
              className={[styles.largeButton, styles.button_primary]}
            >
              Check out
            </Button>
          </Box>
        </Box>
    </Box>
  )
}
