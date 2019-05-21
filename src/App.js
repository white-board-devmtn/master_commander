import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import './App.css';
import routes from './Routes/routes'
import store from './Redux/store';

const primary = grey[300];
const secondary = grey[900]
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#616161',
    },
    secondary: {
      main: '#000316'
    }
  },
  typography: {
    useNextVariants: true,
  },
});


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          {routes}
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;

