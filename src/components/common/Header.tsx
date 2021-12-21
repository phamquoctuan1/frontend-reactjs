import { Badge, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import categoryApi from 'api/categoryApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectCurrentUser } from 'features/auth/authSlice';
import { selectValueCart } from 'features/cart/cartItemsSlice';
import {
  productActions,
  selectProductFilter
} from 'features/product/productSlice';
import { Category, ListParams } from 'models';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
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
 
];


export interface initialFilterType {
  _page?: number;
  _limit?: number;
  categoryId: number | undefined;
}
const initialFilter: ListParams = {
  name: undefined,
  _page: 1,
  _limit: 30,
  color: [],
  size: [],
  categoryId: undefined,
  price: undefined,
};



export const Header = () => {
  const cartItems = useAppSelector(selectValueCart);
  const [totalProducts, setTotalProducts] = useState(0);
  const user = useAppSelector(selectCurrentUser);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const token = JSON.parse(localStorage.getItem('access_token') || '{}');
     const filter = useAppSelector(selectProductFilter);
    const [category, setCategory] = useState<Category[]>();
const history = useHistory();
   const [open, setOpen] = useState(false);
   const anchorRef = useRef<HTMLButtonElement>(null);

   const handleToggle = () => {
     setOpen(true);
    //  setOpen((prevOpen) => !prevOpen);
   };
  
   const handleClose = (event: React.MouseEvent<EventTarget>) => {
     if (
       anchorRef.current &&
       anchorRef.current.contains(event.target as HTMLElement)
     ) {
        setOpen(false)
        return;
     }
   };

   function handleListKeyDown(event: React.KeyboardEvent) {
     if (event.key === 'Tab') {
       event.preventDefault();
       setOpen(false);
     }
   }

   // return focus to the button when we transitioned from !open -> open
   const prevOpen = useRef(open);
   React.useEffect(() => {
     if (prevOpen.current === true && open === false) {
       anchorRef.current!.focus();
     }

     prevOpen.current = open;
   }, [open]);
 useEffect(() => {
   const getCategory = async () => {
     try {
       const category = await categoryApi.getAll();
       setCategory(category.data);
     } catch (error) {
       console.log(error);
     }
   };
   getCategory();
 }, []);
  useEffect(() => {
    dispatch(productActions.fetchProductList(filter));
  }, [dispatch, filter]);
   const handleCategoryClick = (item: Category) => {
     dispatch(productActions.setFilter({ ...filter, categoryId: item.id }));
      setOpen(false);
     history.push('/catalog');
   };
  const clearFilter = () => {  dispatch(productActions.setFilter(initialFilter));  setOpen(false); history.push('/catalog')};
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
      if (Boolean(token)) {
        return dispatch(authActions.getUser(token));
      }
      return localStorage.removeItem('access_token');
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
            <div className='header__menu__item header__menu__left__item'>
              <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={() => clearFilter()}
                onMouseEnter={handleToggle}
                onMouseLeave={handleClose}
              >
                <div className={`header__menu__item header__menu__left__item`}>
                  <span
                    style={{
                      fontSize: '19.5px',
                      textTransform: 'none',
                      fontWeight: 'normal',
                    }}
                  >
                    Danh mục{' '}
                  </span>
                </div>
              </Button>
            </div>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id='menu-list-grow'
                        onKeyDown={handleListKeyDown}
                        onMouseEnter={handleToggle}
                        onMouseLeave={()=>setOpen(false)}
                      >
                        {category?.map((item, index) => (
                          <div
                            key={index}
                            className='catalog__filter__widget__content__item'
                          >
                            <MenuItem onClick={() => handleCategoryClick(item)}>
                              {item.name}
                            </MenuItem>
                          </div>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <div className='header__menu__item header__menu__left__item'>
              <Link to='/about'>
                <span>Giới thiệu</span>
              </Link>
            </div>
            <div className='header__menu__item header__menu__left__item'>
              <Link to='/contact'>
                <span>Liên hệ</span>
              </Link>
            </div>
          </div>
          <div className='header__menu__right'>
            <div className='header__menu__item header__menu__right__item'></div>
            <div className='header__menu__item header__menu__right__item'>
              <Link to='/cart'>
                <Badge
                  color='secondary'
                  badgeContent={totalProducts && totalProducts}
                >
                  <ShoppingCartIcon fontSize='large' />
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
