import { Grid, TextField, Typography, Button } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import axios from 'axios';
import { selectCurrentUser } from 'features/auth/authSlice';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'react-toastify';
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

export default function AddressForm() {
  const checkoutInfo = useAppSelector(selectCheckoutInfo);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { control, handleSubmit } = useForm({
    defaultValues:
      JSON.stringify(checkoutInfo).length > 2
        ? checkoutInfo
        : {
            name: user?.name,
            address: user?.address,
            phone: user?.phone,
            city: ' ',
            district: '',
            ward: '',
          },
  });

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
  }, []);

  const onchangeSelectCity = async (item: any) => {
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
  const onchangeSelectWard = (item: any) => {
    setWardSelected(item.ward_name);
  };
  const onSubmit = (data: any) => {
    data = {
      ...data,
      city: citySelected,
      district: districtSelected,
      ward: wardSelected,
    };
    dispatch(checkoutActions.setCheckoutInfo(data));
    toast.success('Lưu thông tin thành công', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log(data);
  };
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Thông tin
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* There is already an h1 in the page, let's not duplicate it. */}
            <Typography variant='subtitle1' color='primary' component='span'>
              Họ tên
            </Typography>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth variant='standard' />
              )}
            />
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
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name='city'
              control={control}
              render={({ field }) => (
                <Select
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
          <Grid item xs={12} sm={4}>
            <Controller
              name='district'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={districts?.find((c) => c.district_id === field.value)}
                  onChange={(district) => onchangeSelectDistrict(district)}
                  options={districts}
                  getOptionValue={(district) => district?.district_id as string}
                  getOptionLabel={(district) => district?.district_name}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name='ward'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant='contained' color='primary' type='submit'>
              Lưu thông tin
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
