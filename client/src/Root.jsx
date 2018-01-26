import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import configureStore from './store';

import App from './App';

const { store, persistor } = configureStore();

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Route render={() => <App />} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default Root;
