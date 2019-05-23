import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import './App.css';
import routes from './Routes/routes'
import store from './Redux/store';

// REACT-S-ALERT //
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

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
          <Alert stack={{limit: 3}} />
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;

