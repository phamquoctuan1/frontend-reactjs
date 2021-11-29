import {
  Box,
  List,
  ListItem,
  ListItemText,
  makeStyles, Typography
} from '@material-ui/core';
import * as React from 'react';
import { covertDateTime } from 'utils';

export interface ReviewOrderDetailsProps {
  data: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  listItemTextPrimary: {
    zIndex: 1000,
    fontWeight: 'bold',
    fontSize: theme.spacing(2),
    color: 'black',
  },
  listItemTextSecondary: {
    fontSize: theme.spacing(2),
    color: 'pupper',
  },
  Typography: {
    fontSize: theme.spacing(4),
    fontWeight: 'bold',
  },
  boxItem:{
      borderTop:' 5px solid black'
  },
}));
export default function ReviewOrderDetails({ data }: ReviewOrderDetailsProps) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography
        variant='h6'
        component='h2'
        gutterBottom
        className={classes.Typography}
        align='center'
      >
        Chi tiết đơn hàng
      </Typography>
      <List disablePadding>
        {data.map((item: any, index: number) => (
          <ListItem key={index} className={classes.root}>
            <Box className={classes.boxItem}>
              <ListItemText
                classes={{
                  primary: classes.listItemTextPrimary,
                  secondary: classes.listItemTextSecondary,
                }}
                primary={`Mã đơn hàng ${item.orderId}`}
                secondary=''
              />
              <ListItemText
                classes={{
                  primary: classes.listItemTextPrimary,
                  secondary: classes.listItemTextSecondary,
                }}
                primary='Sản phẩm'
                secondary={item.productName}
              />
              <ListItemText
                classes={{
                  primary: classes.listItemTextPrimary,
                  secondary: classes.listItemTextSecondary,
                }}
                primary='Số lượng'
                secondary={`${item.quantity} Cái`}
              />
              <ListItemText
                classes={{
                  primary: classes.listItemTextPrimary,
                  secondary: classes.listItemTextSecondary,
                }}
                primary='Màu sắc'
                secondary={item.color}
              />
              <ListItemText
                classes={{
                  primary: classes.listItemTextPrimary,
                  secondary: classes.listItemTextSecondary,
                }}
                primary='Kích cỡ'
                secondary={item.size}
              />
              <ListItemText
                classes={{
                  primary: classes.listItemTextPrimary,
                  secondary: classes.listItemTextSecondary,
                }}
                primary='Ngày đặt'
                secondary={covertDateTime(item.createdAt)}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
