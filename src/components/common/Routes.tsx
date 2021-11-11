import ForgetPasswordPage from 'features/auth/pages/ForgetPasswordPage';
import LoginPage from 'features/auth/pages/LoginPage';
import Profile from 'features/auth/pages/Profile';
import RegisterPage from 'features/auth/pages/RegisterPage';
import ResetPasswordPage from 'features/auth/pages/ResetPasswordPage';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from '../../features/cart';
import Catalog from '../../features/catalog';
import Home from '../../features/home';
import Product from '../../features/product';

export function Routes() {
  return (
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/catalog/:slug'>
        <Product />
      </Route>
      <Route path='/catalog'>
        <Catalog />
      </Route>
      <Route path='/cart'>
        <Cart />
      </Route>
      <Route path='/login'>
        <LoginPage />
      </Route>
      <Route path='/register'>
        <RegisterPage />
      </Route>
      <Route exact path='/forget'>
        <ForgetPasswordPage />
      </Route>
      <Route path='/forget/:id/:token'>
        <ResetPasswordPage />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
    </Switch>
  );
}
