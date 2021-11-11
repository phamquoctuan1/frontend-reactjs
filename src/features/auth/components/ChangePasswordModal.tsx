import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import authApi from 'api/authApi';
import { useAppDispatch } from 'app/hooks';
import { User } from 'models';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { authActions } from '../authSlice';
import ChangePasswordForm from './ChangePasswordForm';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '15px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  boxBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formEdit: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export interface ModalUserProps {
  title: string;
  user?: User;
}

export default function ChangePasswordModal({ user, title }: ModalUserProps) {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues: User = {
    id: user?.id,
    password: '',
    passwordConfirmation: '',
  };
  const handleSubmit = async (formValues: User) => {
    try {
      delete formValues.passwordConfirmation;
      console.log(formValues);
      const res = await authApi.updateUser(formValues);
      dispatch(authActions.getUserSuccess(res.data));
      toast.success(res.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setOpen(false);
    } catch (error) {}
  };
  return (
    <div>
      <Button
        type='button'
        onClick={handleOpen}
        variant='contained'
        color='primary'
      >
        {title}
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Container maxWidth='sm' className={classes.paper}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Paper elevation={0}>
                  <Box mt={2} mb={2}>
                    <Typography variant='h3' component='h3' align='center'>
                      Đổi mật khẩu
                    </Typography>
                  </Box>
                </Paper>
                <Paper className={classes.formEdit}>
                  <ChangePasswordForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}
