import {  applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { createBrowserHistory as createHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import data from './ducks/products';
import { saga } from './saga';

export const history = createHistory();

const routerMw = routerMiddleware(history);

const sagaMw = createSagaMiddleware({
  onError: (error) => {
    console.error('@ Saga error: ', error);
  },
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = history => combineReducers({
  data,
  router: connectRouter(history),
});


export const store = createStore(
  reducers(history),
  composeEnhancers(applyMiddleware(sagaMw, routerMw)),
);

sagaMw.run(saga)