import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import { useAppSelector } from 'app/hooks';
import { Helmet } from 'components/common';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { selectCurrentUser } from '../authSlice';
import ChangePasswordModal from '../components/ChangePasswordModal';
import ModalUser from '../components/ModalUser';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  boxImg: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '20px',
    backgroundColor: '#d5e0f4',
  },
  boxBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  listItemText: {
    fontWeight: 'bold',
    fontSize: theme.spacing(2),
  },
  Img: {
    width: '150px',
    height: '150px',
    borderRadius: '20%',
  },
}));

export default function Profile() {
  const user = useAppSelector(selectCurrentUser);
  const classes = useStyles();

  if (!user) {
    return <Redirect to='/' />;
  }
  return (
    <Helmet title='Thông tin'>
      <Container maxWidth='sm' className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.boxImg}>
              <img src={user?.picture} alt='' className={classes.Img} />
              <Box mt={2} mb={2}>
                <Typography variant='h3' component='h3' align='center'>
                  {user?.name}
                </Typography>
              </Box>
            </Paper>
            <Paper>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EmailIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    classes={{
                      primary: classes.listItemText,
                      secondary: classes.listItemText,
                    }}
                    primary='Email'
                    secondary={`${user?.email}`}
                  />
                </ListItem>
                <Divider variant='inset' component='li' />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PhoneIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    classes={{
                      primary: classes.listItemText,
                      secondary: classes.listItemText,
                    }}
                    primary='Số điện thoại'
                    secondary={
                      user.phone
                        ? `${user?.phone}`
                        : 'Chưa đăng ký số điện thoại'
                    }
                  />
                </ListItem>
                <Divider variant='inset' component='li' />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <HomeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    classes={{
                      primary: classes.listItemText,
                      secondary: classes.listItemText,
                    }}
                    primary='Địa chỉ'
                    secondary={
                      user.address
                        ? `${user?.address}`
                        : 'Chưa cập nhật địa Chỉ'
                    }
                  />
                </ListItem>
              </List>
            </Paper>
            <Box mt={3}>
              <Box className={classes.boxBtn}>
                <ModalUser title='Sửa thông tin' user={user} />
                <ChangePasswordModal title='Đổi mật khẩu' user={user} />
                <Button variant='contained' color='primary'>
                  Xem đơn hàng đã đặt
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Helmet>
  );
}
