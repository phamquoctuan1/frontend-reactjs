import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from 'utils';
import { Header, Footer, Routes } from '../common';
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
            {/* <ProductViewModal /> */}
          </div>
        )}
      />
    </Router>
  );
}
