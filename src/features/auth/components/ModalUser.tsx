import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
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
import { User } from 'models';
import React, { useState } from 'react';
import { covertBase64 } from 'utils/convertBase64';
import EditUserForm from './EditUserForm';
import authApi from 'api/authApi';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'app/hooks';
import { authActions } from '../authSlice';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  boxImg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

export default function ModalUser({ user, title }: ModalUserProps) {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'quoctuan',
    },
  });
  const myImage = cld.image(user?.picture);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues: User = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
  };
  const handleSubmit = async (formValues: User) => {
    try {
      let avatarUser: string | undefined = undefined;
      if (formValues.picture) {
        avatarUser = await covertBase64(formValues.picture?.[0]);
      }
      formValues = { ...formValues, picture: avatarUser };
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
                  <Box className={classes.boxImg}>
                    <AdvancedImage
                      cldImg={myImage
                        .resize(
                          thumbnail().width(150).height(150).gravity('center')
                        ) // Crop the image, focusing on the face.
                        .roundCorners(byRadius(20))}
                    />
                  </Box>
                  <Box mt={2} mb={2}>
                    <Typography variant='h3' component='h3' align='center'>
                      {user?.name}
                    </Typography>
                  </Box>
                </Paper>
                <Paper className={classes.formEdit}>
                  <EditUserForm
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
