import './App.css';
import { Container, CssBaseline, MuiThemeProvider, Paper, createMuiTheme } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ChooseScreen from './screens/ChooseScreen';
import OrderScreen from './screens/OrderScreen';

const Merienda = "'Merienda', cursive";
const OpenSans = "'Open Sans', cursive";

const theme = createMuiTheme({
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
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Paper>
            <Switch>
            <Route path="/" component={HomeScreen} exact={true}></Route>
            <Route path="/choose" component={ChooseScreen} exact={true}></Route> 
            <Route path="/order" component={OrderScreen} exact={true}></Route> 
            </Switch>
          </Paper>
        </Container>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
