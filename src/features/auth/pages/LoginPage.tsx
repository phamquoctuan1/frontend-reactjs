import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { Helmet } from 'components/Common';
import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import { authActions, LoginPayload } from '../authSlice';
import LoginForm from '../components/LoginForm';
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
const configValue: string = process.env
  .REACT_APP_GOOGLE_LOGIN_CLIENT_ID as string;
export default function LoginPage() {
  const history = useHistory();
  const user = localStorage.getItem('access_token');
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const responseGoogle = (response: any) => {
    console.log(response);
  };
  const initialValues: LoginPayload = {
    userName: '',
    password: '',
  };
  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);
  const handleLogin = async (googleData: any) => {
    const token = googleData.tokenId;
    dispatch(authActions.loginGoogle({ token }));
  };
  const handleLoginFormSubmit = (formValues: LoginPayload) => {
    dispatch(authActions.login(formValues));
  };

  return (
    <Helmet title='Đăng nhập'>
      <div className={classes.root}>
        <Paper elevation={1} className={classes.box}>
          <Typography variant='h2' component='h2' align='center'>
            Đăng nhập
          </Typography>
          <Box mt={4}>
            <LoginForm
              initialValues={initialValues}
              onSubmit={handleLoginFormSubmit}
            />
            <Box className={classes.boxlogin}>
              <GoogleLogin
                clientId={configValue}
                buttonText='Đăng nhập bằng tài khoản Google'
                onSuccess={handleLogin}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              ></GoogleLogin>
            </Box>
            <Box mt={2} className={classes.boxlogin}>
              <Button size='small' variant='contained' color='default'>
                <Link to='/forget'>
                  <h3>Quên mật khẩu?</h3>
                </Link>
              </Button>
            </Box>
            <Box mt={2} className={classes.boxlogin}>
              <Button size='small' variant='contained' color='default'>
                <Link to='/register'>
                  <h3>Đăng ký tài khoản?</h3>
                </Link>
              </Button>
            </Box>
          </Box>
        </Paper>
      </div>
    </Helmet>
  );
}
