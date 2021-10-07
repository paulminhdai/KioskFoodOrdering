import './App.css';
import React, { useContext } from 'react';
import { Container, CssBaseline, MuiThemeProvider, Paper, createTheme } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ChooseScreen from './screens/ChooseScreen';
import OrderScreen from './screens/OrderScreen';
import ReviewScreen from './screens/ReviewScreen';
import SelectPaymentScreen from './screens/SelectPaymentScreen';
import PaymentScreen from './screens/PaymentScreen';
import CompleteScreen from './screens/CompleteScreen';
import AdminScreen from './screens/AdminScreen';
import { Store } from './Store'

const Merienda = "'Merienda', cursive";
const OpenSans = "'Open Sans', cursive";

const theme = createTheme({
  typography: {
    fontFamily: OpenSans,
    h1: {fontWeight: 'bold', fontFamily: Merienda, color: '#127a75'},
    h2: {fontSize: '2.2rem', fontWidth: 'bold', fontFamily: Merienda, color: '#127a75'},
    h3: {fontSize: '1.8rem', fontWeight: 'bold', color: '#127a75'},
    h4: {fontSize: '1.3rem', fontWeight: 'bold', color: '#127a75'},
    h5: {fontSize: '1rem', fontWeight: 'bold'},
    h6: {fontSize: '.8rem', color: '#127a75'},
  }
});

function App() {
  const { state } =  useContext(Store);
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth={state.widthScreen ? 'lg' : 'sm'}>
          <Paper>
            <Switch>
            <Route path="/" component={HomeScreen} exact={true}></Route>
            <Route path="/choose" component={ChooseScreen} exact={true}></Route> 
            <Route path="/order" component={OrderScreen} exact={true}></Route> 
            <Route path="/review" component={ReviewScreen} exact={true}></Route> 
            <Route path="/select-payment" component={SelectPaymentScreen} exact={true}></Route> 
            <Route path="/payment" component={PaymentScreen} exact={true}></Route> 
            <Route path="/complete" component={CompleteScreen } exact={true}></Route> 
            <Route path="/admin" component={AdminScreen } exact={true}></Route> 
            </Switch>
          </Paper>
        </Container>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
