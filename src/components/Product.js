import { connect } from 'react-redux';
import Skeleton from './Skeleton';

const Product = props => {
  const { products, id } = props;
  const product = products ? products[id] : null;

  console.log(product);
  return (
    <div>
      {product ? 
        product.name
        : <Skeleton num={1} />}
    </div>
  )};

const mapStateToProps = (state, props) => ({
  products: state.data.products,
  id: props.match.params.id,
});

export default connect(mapStateToProps)(Product);