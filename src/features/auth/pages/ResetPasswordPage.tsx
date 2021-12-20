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
import { Helmet } from 'components/common';
import { InputField } from 'components/FormFields';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
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
  password: yup
    .string()
    .min(8, 'Mật khẩu phải trên 8 ký tự')
    .required('Mật khẩu không thể bỏ trống'),
});
export interface ParamTypes {
  id: string;
  token: string;
}

export default function ForgetPasswordPage() {
  const user = localStorage.getItem('access_token');
  const history = useHistory();
  const { id, token } = useParams<ParamTypes>();
  const classes = useStyles();
  const [error, setError] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = async (data: any) => {
    try {
      setError('');
      data = { ...data, id, token };
      await authApi.recovertUser(data);
      toast.success('Khôi phục mật khẩu thành công', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push('/login');
    } catch (err) {
      setError(
        'Link đã hết hạn, lưu ý link khôi phục chỉ tồn tại 15p, vui lòng gửi thử lại'
      );
    }
  };
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
            Khôi phục mật khẩu
          </Typography>
          <Box mt={4}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <InputField
                name='password'
                control={control}
                label='Mật khẩu'
                type='password'
              />
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
                  Xác nhận
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </div>
    </Helmet>
  );
}
