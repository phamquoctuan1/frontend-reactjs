import {
  Box,
  makeStyles,
  Paper,
  Button,
  Typography,
  Theme,
} from '@material-ui/core';
import authApi from 'api/authApi';
import { Helmet } from 'components/Common';
import { User } from 'models';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { covertBase64 } from 'utils/convertBase64';
import RegisterForm from '../components/RegisterForm';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { Alert } from '@material-ui/lab';
const useStyles = makeStyles((theme: Theme) => ({
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

export default function RegisterPage() {
  const history = useHistory();
  const user = localStorage.getItem('access_token');
  //   const dispatch = useAppDispatch();
  const [error, setError] = useState<string>('');
  const classes = useStyles();
  const initialValues: User = {
    name: '',
    userName: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    picture: '',
  };
  const handleRegisterFormSubmit = async (formValues: User) => {
    try {
      let avatarUser: string | undefined = undefined;
      if (formValues.picture) {
        avatarUser = await covertBase64(formValues.picture?.[0]);
      }
      formValues = { ...formValues, picture: avatarUser };
      await authApi.register(formValues);
      toast.success(
        'Đăng kí thành công! chúng tôi đã gửi một email đến email của bạn, vui lòng xác nhận email!',
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
      history.push('/login');
    } catch (error) {
      let msg = (error as AxiosError).response?.data.message;
      setError(msg);
    }
  };

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);
  return (
    <Helmet title='Đăng ký'>
      <div className={classes.root}>
        <Paper elevation={1} className={classes.box}>
          <Box mb={3}>
            <Button size='small' variant='contained' color='primary'>
              <Link to='/login'>
                <h3>Đã có tài khoản?</h3>
              </Link>
            </Button>
          </Box>
          <Box mt={4}>
            <Typography variant='h2' component='h2' align='center'>
              Đăng ký
            </Typography>
            {error && <Alert severity='error'>{error}</Alert>}
            <RegisterForm
              initialValues={initialValues}
              onSubmit={handleRegisterFormSubmit}
            />
          </Box>
        </Paper>
      </div>
    </Helmet>
  );
}
