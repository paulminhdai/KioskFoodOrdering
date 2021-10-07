import React, { useContext } from 'react'
import { Typography, Box, Card, CardActionArea, CardMedia, CardContent } from '@material-ui/core';
import Logo from '../components/Logo'
import { useStyles } from '../styles'
import { setPaymentType } from '../actions'
import { Store } from '../Store';


export default function SelectPaymentScreen(props) {
  const { dispatch } = useContext(Store);
  const styles = useStyles();
  const selectHandler = (paymentType) => {
    setPaymentType(dispatch, paymentType);
    if (paymentType === 'Pay here') {
      props.history.push('/payment');
    } else {
      props.history.push('/complete');
    }
  };
  return (
    <Box  className={[styles.root]}>
      <Box className={[styles.main, styles.center]}>
        <Logo large></Logo>
        <Typography variant="h2" component="h2" className={styles.center} gutterBottom>
          Where?!?
        </Typography>
        <Box className={styles.cards}>
          <Card className={[styles.card, styles.space, ]}>
            <CardActionArea onClick={()=> selectHandler('Pay here')}>
              <CardMedia component="img" alt="Dine in" image="/images/payhere.png" className={styles.media}>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h4" component="p" color="textPrimary">
                  Pay Here
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={[styles.card, styles.space,]}>
            <CardActionArea onClick={()=> selectHandler('At counter')}>
              <CardMedia component="img" alt="Dine in" image="/images/atcounter.png" className={styles.media}>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h4" component="p" color="textPrimary">
                  At Counter
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}
