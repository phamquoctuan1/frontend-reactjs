import { Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectCurrentUser } from 'features/auth/authSlice';
import { selectValueCart } from 'features/cart/cartItemsSlice';
import {
  productActions,
  selectProductFilter,
} from 'features/product/productSlice';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/Logo-2.png';
import MenuUser from './MenuUser';
import SearchForm from './SearchForm';
import { toast } from 'react-toastify';

const mainNav = [
  {
    display: 'Trang chủ',
    path: '/',
  },
  {
    display: 'Sản phẩm',
    path: '/catalog',
  },
  {
    display: 'Phụ kiện',
    path: '/accessories',
  },
  {
    display: 'Liên hệ',
    path: '/contact',
  },
];

export const Header = () => {
  const cartItems = useAppSelector(selectValueCart);
  const [totalProducts, setTotalProducts] = useState(0);
  const user = useAppSelector(selectCurrentUser);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  const token = JSON.parse(localStorage.getItem('access_token') || '{}');

  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList.add('shrink');
      } else {
        headerRef.current?.classList.remove('shrink');
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);
  const menuLeft = useRef<HTMLDivElement>(null);

  const menuToggle = () => menuLeft.current?.classList.toggle('active');
  useEffect(() => {
    const task = () => {
      if (token) {
        return dispatch(authActions.getUser(token));
      }
      return;
    };
    task();
  }, [token, dispatch]);
  const filter = useAppSelector(selectProductFilter);
  const handleSearchSubmit = async (formValues: any) => {
    setTimeout(() => {
      dispatch(productActions.setFilter(formValues));
    }, 2000);
    toast('Loading...', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  useEffect(() => {
    dispatch(productActions.fetchProductList(filter));
  }, [filter, dispatch]);
  return (
    <div className='header' ref={headerRef}>
      <div className='container'>
        <div className='header__logo'>
          <Link to='/'>
            <img src={logo} alt='' />
          </Link>
        </div>
        <div className='header__menu'>
          <div className='header__menu__mobile-toggle' onClick={menuToggle}>
            <i className='bx bx-menu-alt-left'></i>
          </div>
          <div className='header__menu__left' ref={menuLeft}>
            <div className='header__menu__left__close' onClick={menuToggle}>
              <i className='bx bx-chevron-left'></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? 'active' : ''
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className='header__menu__right'>
            <div className='header__menu__item header__menu__right__item'>
              <SearchForm
                initialValues={{ name: '' }}
                onSubmit={handleSearchSubmit}
              />
            </div>
            <div className='header__menu__item header__menu__right__item'>
              <Link to='/cart'>
                <Badge color='secondary' badgeContent={totalProducts} showZero>
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </div>
            <div className='header__menu__item header__menu__right__item'>
              {user ? (
                <MenuUser img={user.picture} />
              ) : (
                <Link to='/login'>
                  <i className='bx bx-user'></i>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
