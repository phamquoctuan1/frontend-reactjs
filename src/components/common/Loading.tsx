import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import authApi from 'api/authApi';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import { ParamTypes } from 'features/auth/pages/ResetPasswordPage';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

export default function CircularIntegration() {
 const MySwal = withReactContent(Swal);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { id, token } = useParams<ParamTypes>();
  const history = useHistory();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleButtonClick = () => {
 
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setTimeout(async () => {
        try {
          const data = { id, token };
          const response = await authApi.activeUser(data);
          MySwal.fire('Thành công!', response.message, 'success');
          history.push('/login');
        } catch (err) {
          let msg = (err as AxiosError).response?.data.message;
          MySwal.fire('Thất bại!', msg, 'error');
        }
        setSuccess(true);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          size='large'
          variant='contained'
          color='primary'
          className={buttonClassname}
          disabled={loading}
          onClick={handleButtonClick}
        >
          Kích hoạt tài khoản
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}
