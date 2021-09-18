import { useStyles } from '../styles';
import React, { useEffect, useContext }from 'react'
import { Avatar, Box, CircularProgress, Grid, List, ListItem } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Store } from '../Store'
import { listCategories } from '../actions'

export default function OrderScreen() {
  const styles = useStyles();
  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoryList;
  useEffect(() => {
    listCategories(dispatch);
  }, [dispatch]);

  return (
    <Box  className={[styles.root]}>
      <Box className={[styles.main]}>
        <Grid container>
          <Grid item md={2}>
            <List>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                  {categories.map((category) => (
                    <ListItem key={category.name}>
                      <Avatar src={category.image} alt={category.name}></Avatar>
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </Grid>
          <Grid item md={10}>
          </Grid>
        </Grid>
      </Box>
    </Box>
    
  )
}
