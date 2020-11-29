import { all } from 'redux-saga/effects';
import { productsSaga } from '../ducks/products';
export function* saga() {
  yield all([
    productsSaga(),
  ])
} 