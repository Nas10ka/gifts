import { Component } from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import routes from './routes';
import actions from './ducks/actions/index';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getProducts();
    this.props.getVendors();
  }

  render() {
    return (
      <Grid container spacing={0}>
        <Switch>
          {routes.map((route, index) =>
            <Route
              key={index}
              path={route.path}
              exact={true}
              render={() => <route.component title={route.title} />}
            />
          )}
        </Switch>
      </Grid>
    );
  }
}

const mapDispatchToProps = {
  getProducts: actions.getProducts,
  getVendors: actions.getVendors,
}

export default connect(null, mapDispatchToProps)(App);
