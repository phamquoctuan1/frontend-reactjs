import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AxiosError } from 'axios';
import { Helmet } from 'components/Common';
import { InputField } from 'components/FormFields';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import authApi from '../../../api/authApi';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },

  box: {
    padding: theme.spacing(3),
  },
  boxlogin: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
const schema = yup.object({
  email: yup
    .string()
    .email('Vui lòng nhập đúng định dạng email')
    .required('Email không được bỏ trống'),
});
export default function ForgetPasswordPage() {
  const history = useHistory();
  const user = localStorage.getItem('access_token');
  const classes = useStyles();
  const [error, setError] = useState<string>('');
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = async (data: any) => {
    try {
      setError('');
      await authApi.forgetUser(data);
      toast.success(
        'chúng tôi đã gửi một email đến email của bạn, vui lòng xác nhận email!',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (err) {
      let msg = (err as AxiosError).response?.data.message;
      setError(msg);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ email: '' });
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);
  return (
    <Helmet title='Quên mật khẩu'>
      <div className={classes.root}>
        <Paper elevation={1} className={classes.box}>
          <Typography variant='h2' component='h2' align='center'>
            Quên mật khẩu?
          </Typography>
          <Box mt={4}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <InputField name='email' control={control} label='Email' />
              {error && <Alert severity='error'>{error}</Alert>}
              <Box mt={2} className={classes.boxlogin}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <CircularProgress size={16} color='primary' />
                  )}{' '}
                  Gửi
                </Button>
              </Box>
            </form>
            <Box mt={2} className={classes.boxlogin}>
              <Button size='small' variant='contained' color='default'>
                <Link to='/login'>
                  <h3>Trở lại trang đăng nhập</h3>
                </Link>
              </Button>
            </Box>
          </Box>
        </Paper>
      </div>
    </Helmet>
  );
}
