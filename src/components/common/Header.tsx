import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectCurrentUser } from 'features/auth/authSlice';
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/Logo-2.png';
import MenuUser from './MenuUser';
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
  const user = useAppSelector(selectCurrentUser);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  const token = JSON.parse(localStorage.getItem('access_token') || '{}');

  const headerRef = useRef<HTMLDivElement>(null);
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
      if (!token) {
        return;
      }
      return dispatch(authActions.getUser(token));
    };
    task();
  }, [token, dispatch]);
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
              <i className='bx bx-search'></i>
            </div>
            <div className='header__menu__item header__menu__right__item'>
              <Link to='/cart'>
                <i className='bx bx-shopping-bag'></i>
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