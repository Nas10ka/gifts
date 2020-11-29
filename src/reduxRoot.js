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

const reducers = history => combineReducers({
  router: connectRouter(history),
  data,

});


export const store = createStore(
  reducers(history),
  compose(applyMiddleware(routerMw, sagaMw)),
);

sagaMw.run(saga)