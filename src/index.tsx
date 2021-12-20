import { CssBaseline } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import { Layout } from './components/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/index.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import * as serviceWorker from './serviceWorker';
import { ToastContainer } from 'react-toastify';
import { history } from 'utils';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CssBaseline />
        <Layout />
      </ConnectedRouter>
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
