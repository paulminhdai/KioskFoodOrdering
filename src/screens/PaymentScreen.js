import { Typography, Box, CircularProgress, Button } from '@material-ui/core'
import React from 'react'
import Logo from '../components/Logo'
import { useStyles } from '../styles'

export default function PaymentScreen(props) {
  const styles = useStyles();
  return (
    <Box className={[styles.root]}>
      <Box className={[styles.main, styles.center]}>
          <Logo large></Logo>
          <Typography className={styles.title} variant="h3" component="h3" gutterBottom>
            Insert your card and follow the instructions
          </Typography>
          <CircularProgress />
      </Box>
      <Box>
        <Box className={[styles.center, styles.space]}>
          <Button onClick={() => props.history.push('/complete')} variant="contained" className={[styles.largeButton, styles.button_primary]}>
            COMPLETE ORDER
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
