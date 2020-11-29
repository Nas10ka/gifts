import Products from '../components/Products';
import Product from '../components/Product';

const routes = [
  {
    title: 'Products',
    path: '/',
    component: Products,
  },
  {
    title: 'Product',
    path: '/product/:id',
    component: Product,
  },

];

export default routes;