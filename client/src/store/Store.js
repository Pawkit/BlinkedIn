import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers';

const config = {
  key: 'root',
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(config, rootReducer);

const configureStore = () => {
  const middlewares = [thunk];

  //  Creating Enhancer
  const enhancer = compose(applyMiddleware(...middlewares));

  //  Create Store
  const store = createStore(persistedReducer, {}, enhancer);

  //  Persist Store
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
