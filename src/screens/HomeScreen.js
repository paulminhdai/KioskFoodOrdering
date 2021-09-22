import React from 'react';
import { Box, Card, CardActionArea, Typography } from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { useStyles } from '../styles';
//import Logo from '../components/Logo';

export default function HomeScreen(props) {
    const styles = useStyles();
    return (
      <Card>
        <CardActionArea onClick={() => props.history.push('/choose')}>
          <Box className={[styles.root]}>
            
            <Box className={[styles.main, styles.center]}>
              <Typography component="h4" variant="h4" className={[styles.margin_bottom]}>
                Welcome to Boba Store!
              </Typography>
              <Typography component="h1" variant="h1" className={[styles.margin_bottom]}>
                Order<br/> here
              </Typography>
              <TouchAppIcon fontSize="large"></TouchAppIcon>
              <Typography component="h6" variant="h6">
                Touch to Start
              </Typography>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    )
}
