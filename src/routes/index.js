import Products from '../components/Products';
import Product from '../components/Product';

const routes = [
  {
    title: 'Products',
    path: '/',
    component: Products,
    exact: true,
  },
  {
    title: 'Product',
    path: '/product/:id',
    component: Product,
    exact: false,
  },

];

export default routes;