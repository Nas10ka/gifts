import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConnectedRouter } from 'connected-react-router';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { history, store } from './reduxRoot';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#bfdcff',
    },
    secondary: {
      light: '#bfdcff',
      main: '#263143',
      contrastText: '#ffcc00',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        {/* <React.StrictMode> */}
          <App />
        {/* </React.StrictMode> */}
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
