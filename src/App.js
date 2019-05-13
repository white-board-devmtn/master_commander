import React from 'react';
import {Provider} from 'react-redux';

import './App.css';
import routes from './Routes/routes'
import store from './Redux/store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      {routes}
    </div>
    </Provider>
  );
}

export default App;

