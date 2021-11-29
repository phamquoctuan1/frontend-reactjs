import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button, Card, CircularProgress, Grid, List,
  ListItem, ListItemSecondaryAction, ListItemText, makeStyles, TextField,
  Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import axios from 'axios';
import { selectCurrentUser } from 'features/auth/authSlice';
import { selectValueCart } from 'features/cart/cartItemsSlice';
import qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';
import Select from 'react-select';
import { numberWithCommas } from 'utils';
import * as yup from 'yup';
import { checkoutActions, selectCheckoutInfo } from '../checkoutSlice';
export interface City {
  province_id: number | string;
  province_name: string;
  province_type?: string;
}
export interface District {
  district_id: number | string;
  district_name: string;
}
export interface Ward {
  ward_id: number | string;
  ward_name: string;
}



const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên'),
    address: yup.string().required('Vui lòng cung cấp địa chỉ'),
    phone: yup
      .string()
      .matches(
        /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
        'Số điện thoại không hợp lệ'
      ),
  })
  .required();

  const useStyles = makeStyles((theme) => ({
    root: {
      width:'fit-content',
      display: 'flex',
      justifyContent: 'space-between',
    },
    form:{width: '430px',
      marginRight:'50px'
  },
    card: {
      minWidth: 275,
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    pos: {
      marginBottom: 12,
    },
  }));
export default function AddressForm() {
  const cartItems = useAppSelector(selectValueCart);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const infoCheckout = useAppSelector(selectCheckoutInfo); 

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      orderId: Math.floor(Math.random() * 1000),
      id: user?.id,
      name: user?.name,
      address: user?.address,
      phone: user?.phone,
      city: infoCheckout.city,
      district: infoCheckout.district,
      ward: infoCheckout.ward,
    },
    resolver: yupResolver(schema),
  });
  const history = useHistory();
   const [fee, setFee] = useState<number>(0);
  const [errorsCity, setErrorCity] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>();
  const [citySelected, setCitySelected] = useState<string>();
  const [districts, setDistricts] = useState<District[]>();
  const [districtSelected, setDistrictSelected] = useState<string>();
  const [wards, setWards] = useState<Ward[]>();
  const [wardSelected, setWardSelected] = useState<string>();
  
  useEffect(() => {
    async function getCity() {
      try {
        const city: any = await axios.get(
          'https://vapi.vnappmob.com/api/province/'
        );
        setCities(city.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    getCity();
    return () =>{
      setCities([]);
    }
  }, []);

  const onchangeSelectCity = async (item: any) => {
    setErrorCity(false);
    try {
      const district: any = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${item.province_id}`
      );
      setDistricts(district.data.results);
      setCitySelected(item.province_name);
    } catch (error) {
      console.log(error);
    }
   
  };
  const onchangeSelectDistrict = async (item: any) => {
    setErrorCity(false);
    try {
      const ward: any = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${item.district_id}`
      );
      setWards(ward.data.results);
      setDistrictSelected(item.district_name);
    } catch (error) {
      console.log(error);
    }
  };
  const onchangeSelectWard =  async (item: any) => {
    try {
       setErrorCity(false);
       setWardSelected(item.ward_name);
       const a = {
         pick_province: 'TP.Hồ Chí Minh',
         pick_district: 'Quận 8',
         province: citySelected,
         district: districtSelected,
         ward: item.ward_name,
         weight: 100,
         deliver_option: 'none',
       };
       const b = qs.stringify(a);
       const c = await axios.get(
         `https://services.ghtklab.com/services/shipment/fee?${b}`,
         {
           headers: {
             'Access-Control-Allow-Origin': '*',
             'Content-Type': 'application/json',
             'Token': '8769a1873E7B93ef7eB6ca8Ce911ad90CF5add90',
           },
         }
       );
       setFee(c.data.fee.fee);
    } catch (error) {
      console.log(error)
    }
   

  };
  const onSubmit = async (data: any) => {
    if (
      citySelected === undefined ||
      districtSelected === undefined ||
      wardSelected === undefined
    ) {
      setErrorCity(!errorsCity);
      return
    }
    //  const res = await authApi.updateUser(data);
    //  dispatch(authActions.getUserSuccess(res.data));
     data = {
       ...data,
       fee:fee,
       city: citySelected,
       district: districtSelected,
       ward: wardSelected,
     };  
    
    dispatch(checkoutActions.setCheckoutInfo(data));
    console.log(data);
    history.push(`/payment/${data.orderId}`)
  };

   if (cartItems.length <= 0) {
     return <Redirect to='/catalog' />;
   }
  return (
    <Box className={classes.root}>
      <Box className={classes.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* There is already an h1 in the page, let's not duplicate it. */}
              <Typography variant='subtitle1' color='primary' component='span'>
                Họ tên
              </Typography>
              <Controller
                name='id'
                control={control}
                render={({ field }) => <input type='hidden' {...field} />}
              />
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth variant='standard' />
                )}
              />
              {errors.name && (
                <Alert severity='error'>{errors.name?.message}</Alert>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant='subtitle1' color='primary' component='span'>
                Số điện thoại
              </Typography>
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth variant='standard' />
                )}
              />
              {errors.phone && (
                <Alert severity='error'>{errors.phone?.message}</Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='city'
                control={control}
                render={({ field }) => (
                  <Select
                    placeholder={infoCheckout.city}
                    {...field}
                    onChange={(city) => onchangeSelectCity(city)}
                    options={cities}
                    getOptionValue={(city) => city?.province_id as string}
                    value={cities?.find((c) => c.province_id === field.value)}
                    getOptionLabel={(city) => city?.province_name}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='district'
                control={control}
                render={({ field }) => (
                  <Select
                    placeholder={infoCheckout.district}
                    {...field}
                    value={districts?.find(
                      (c) => c.district_id === field.value
                    )}
                    onChange={(district) => onchangeSelectDistrict(district)}
                    options={districts}
                    getOptionValue={(district) =>
                      district?.district_id as string
                    }
                    getOptionLabel={(district) => district?.district_name}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='ward'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder={infoCheckout.ward}
                    onChange={(ward) => onchangeSelectWard(ward)}
                    options={wards}
                    getOptionValue={(ward) => ward?.ward_id as string}
                    value={wards?.find((c) => c.ward_id === field.value)}
                    getOptionLabel={(ward) => ward?.ward_name}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              {errorsCity && (
                <Alert severity='error'>Không được bỏ trống</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1' color='primary' component='span'>
                Địa chỉ cụ thể (số nhà, đường)
              </Typography>
              <Controller
                name='address'
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth variant='standard' />
                )}
              />
              {errors.address && (
                <Alert severity='error'>{errors.address?.message}</Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting && <CircularProgress size={16} color='primary' />}{' '}
                Thanh toán
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Card className={classes.card}>
        <List>
          <ListItem>
            <ListItemText primary='Số lượng sản phẩm' />
            <ListItemSecondaryAction>
              <ListItemText primary={totalProducts} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary='Tạm tính' />
            <ListItemSecondaryAction>
              <ListItemText primary={numberWithCommas(totalPrice)} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary='Phí giao hàng' />
            <ListItemSecondaryAction>
              <ListItemText primary={numberWithCommas(fee)} />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <Box mt={20}>
          <List>
            <ListItem>
              <ListItemText primary='Tổng tiền' />
              <ListItemSecondaryAction>
                <ListItemText primary={numberWithCommas(fee + totalPrice)} />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Box>
      </Card>
    </Box>
  );
}
