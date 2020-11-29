import React from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import routes from './routes';
import actions from './ducks/actions/index';
import Product from './components/Product';
import Products from './components/Products';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    this.props.getProducts();
    this.props.getVendors();
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" render={(props) => <Products {...props} />} />
          <Route path="/products" render={(props) => <Products {...props} />} />
          <Route path='/product/:id' render={(props) => <Product {...props} />} />
        </Switch>
      </>
    );
  }
}

const mapDispatchToProps = {
  getProducts: actions.getProducts,
  getVendors: actions.getVendors,
}

export default connect(null, mapDispatchToProps)(App);
