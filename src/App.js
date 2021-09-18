import './App.css';
import { Container, CssBaseline, ThemeProvider, Paper, createMuiTheme } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ChooseScreen from './screens/ChooseScreen';
import OrderScreen from './screens/OrderScreen';

const font = "'Merienda', cursive";

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
    h1: {fontWeight: 'bold'},
    h2: {
      fontSize: '2rem',
      color: 'black',
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: 'red',
    },
    
    h5: {
      fontWeight: 'bold',
    },
    
    h6: {
      fontSize: '.8rem'
    },

    palette: {
      primary: {main: '#ff1744'},
      secondary: {
        main: '#118e16',
        contrastText: '#ffffff',
      }
    }
  }
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
