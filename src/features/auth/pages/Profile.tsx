import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
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
    justifyContent: 'center',
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
}));

export default function Profile() {
  const user = useAppSelector(selectCurrentUser);
  const classes = useStyles();
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'quoctuan',
    },
  });
  const myImage = cld.image(user?.picture);
  if (!user) {
    return <Redirect to='/' />;
  }
  return (
    <Helmet title='Thông tin'>
      <Container maxWidth='sm' className={classes.root}>
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
                    secondary={`${user?.phone}`}
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
                    secondary={`${user?.address}`}
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
