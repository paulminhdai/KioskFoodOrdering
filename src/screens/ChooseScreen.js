import { Typography, Box, Fade, Card, CardActionArea, CardMedia, CardContent } from '@material-ui/core';
import Logo from '../components/Logo';
import { useStyles } from '../styles';
import React, {useContext }from 'react';
import { Store } from '../Store';
import { setOderType } from '../actions';

export default function ChooseScreen(props) {
  const styles = useStyles();
  const { dispatch } = useContext(Store);

  const chooseHandler = (orderType) => {
    setOderType(dispatch, orderType);
    props.history.push('/order');
  };

  return (
    <Fade in={true}>
      <Box  className={[styles.root]}>
        <Box className={[styles.main, styles.center]}>
          <Logo large></Logo>
          <Typography variant="h2" component="h2" className={styles.center} gutterBottom>
            
          </Typography>
          <Box className={styles.cards}>
            <Card className={[styles.card, styles.space, ]}>
              <CardActionArea onClick={()=> chooseHandler('Dine in')}>
                <CardMedia component="img" alt="Dine in" image="/images/eatin.png" className={styles.media}>
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="p" color="textPrimary">
                    Dine In
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={[styles.card, styles.space,]}>
              <CardActionArea onClick={()=> chooseHandler('Take out')}>
                <CardMedia component="img" alt="Dine in" image="/images/eatin.png" className={styles.media}>
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="p" color="textPrimary">
                    Take Out
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Box>
      </Box>
    </Fade>
  )
}
