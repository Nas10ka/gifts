import types from './actions/types';
import actions from './actions/index';
import { put, takeEvery, call } from 'redux-saga/effects';
import { fetchData } from './api';

const initState = {
  products: null,
  vendors: null,
}

export default (state = initState, action) => {
  switch(action.type) {
    case types.GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };
    case types.GET_VENDORS_SUCCESS:
      return { ...state, vendors: action.payload };
    default:
      return state;
  }
}

export function* productsSaga() {
  yield takeEvery(types.GET_PRODUCTS, getProductsSaga);
  yield takeEvery(types.GET_VENDORS, getVendorsSaga);
}

function* getProductsSaga() {
  try {
    const products = yield call(fetchData, 'http://localhost:8080/products', 'GET');
    yield put(actions.getProductsSuccess(products));
  } catch (e) {
    console.error('Get Products Error ', e);
  }
}

function* getVendorsSaga() {
  try {
    const vendors = yield call(fetchData, 'http://localhost:8080/vendors', 'GET');
    console.log(vendors);
    yield put(actions.getVendorsSuccess(vendors));
  } catch(e) {
    console.error('Get Vendors Error ', e);
  }
}