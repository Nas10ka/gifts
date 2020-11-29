import types from './types.js'

export default Object.freeze({
  getProducts: () => ({ type: types.GET_PRODUCTS }),
  getProductsSuccess: (products) => ({ type: types.GET_PRODUCTS_SUCCESS, payload: products }),
  getVendors: () => ({ type: types.GET_VENDORS }),
  getVendorsSuccess: (vendors) => ({ type: types.GET_VENDORS_SUCCESS, payload: vendors }),
})