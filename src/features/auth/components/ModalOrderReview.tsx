
import {
    Button,
    Container, Grid, makeStyles, Theme
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import authApi from 'api/authApi';
import ReviewOrder from 'features/checkout/components/ReviewOrder';
import { User } from 'models';
import React, { useEffect, useState } from 'react';
import productApi from 'api/productApi';
const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px ',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height:'600px',
    overflow: 'auto'
  },
  boxImg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemText: {
    fontWeight: 'bold',
    fontSize: theme.spacing(2),
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

export default function ModalOrderReview({ user, title }: ModalUserProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
    const [orderReview, setOrderReview] = useState();
    
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancelOrder = async (id:any) => {
       await productApi.delete(id);
      const res = await authApi.getOrderReview(user?.id);
       setOrderReview(res);
  }
 useEffect(() => {
     const getOrder = async() => {
        const res = await authApi.getOrderReview(user?.id);
        setOrderReview(res);
     }
     getOrder();
 }, [user?.id]);

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
                <ReviewOrder data={orderReview} onCancelOrder={handleCancelOrder}/>
              </Grid>
            </Grid>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}
