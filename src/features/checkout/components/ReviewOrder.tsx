import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core';
import ModalOrderDetails from 'features/auth/components/ModalOrderDetails';
import * as React from 'react';
import { numberWithCommas } from 'utils';
export interface ReviewOrderProps{
  data: any;
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  listItemTextPrimary: {
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
}));
export default function ReviewOrder({ data }: ReviewOrderProps) {
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
        Đơn hàng
      </Typography>
      <List disablePadding>
        <ListItem>
          <ListItemText
            classes={{
              primary: classes.listItemTextPrimary,
              secondary: classes.listItemTextSecondary,
            }}
            primary='Tên khách hàng'
            secondary={data.name}
          />
          <ListItemText
            classes={{
              primary: classes.listItemTextPrimary,
              secondary: classes.listItemTextSecondary,
            }}
            primary='Địa chỉ'
            secondary={data.address}
          />
          <ListItemText
            classes={{
              primary: classes.listItemTextPrimary,
              secondary: classes.listItemTextSecondary,
            }}
            primary='Số điện thoại'
            secondary={data.phone}
          />
        </ListItem>
        {data.orderInfo.map((item: any, index: number) => (
          <ListItem key={index} className={classes.root}>
            <ListItemText
              classes={{
                primary: classes.listItemTextPrimary,
                secondary: classes.listItemTextSecondary,
              }}
              primary={`Mã đơn hàng ${item.id}`}
              secondary={item.name}
            />
            <ListItemText
              classes={{
                primary: classes.listItemTextPrimary,
                secondary: classes.listItemTextSecondary,
              }}
              primary='Tổng tiền'
              secondary={numberWithCommas(item.amount)}
            />
            <ListItemText
              classes={{
                primary: classes.listItemTextPrimary,
                secondary: classes.listItemTextSecondary,
              }}
              primary='Trạng thái'
              secondary={item.status ? 'Đã xác nhận' : 'Chưa xác nhận'}
            />
           <ModalOrderDetails title='xem chi tiết' id={item.id} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
