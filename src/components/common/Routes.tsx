import ForgetPasswordPage from 'features/auth/pages/ForgetPasswordPage';
import LoginPage from 'features/auth/pages/LoginPage';
import Profile from 'features/auth/pages/Profile';
import RegisterPage from 'features/auth/pages/RegisterPage';
import ResetPasswordPage from 'features/auth/pages/ResetPasswordPage';
import CheckoutPage from 'features/checkout';
import PaymentForm from 'features/checkout/components/PaymentForm';
import ContactPage from 'features/staticspage';
import About from 'features/staticspage/About';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from '../../features/cart';
import Catalog from '../../features/catalog';
import Home from '../../features/home';
import ProductPage from '../../features/product';
import CircularStatic from './Loading';

export function Routes() {
  return (
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/catalog/:slug'>
        <ProductPage />
      </Route>
      <Route exact path='/catalog'>
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
      <Route exact path='/verify/account/:id/:token'>
        <CircularStatic />
      </Route>
      <Route path='/checkout'>
        <CheckoutPage />
      </Route>
      <Route path='/payment/:id'>
        <PaymentForm />
      </Route>
      <Route path='/contact'>
        <ContactPage />
      </Route>
      <Route path='/about'>
        <About />
      </Route>
    </Switch>
  );
}
