import ProductViewModal from 'features/product/components/ProductViewModal';
import * as React from 'react';
import { Route, Router } from 'react-router-dom';
import { history } from 'utils';
import { Footer, Header, Routes } from '../common';
export function Layout() {
  return (
    <Router history={history}>
      <Route
        render={(props: any) => (
          <div>
            <div className='container'>
              <Header {...props} />
              <div className='main'>
                <Routes />
              </div>
            </div>
            <Footer />
            <ProductViewModal />
          </div>
        )}
      />
    </Router>
  );
}
