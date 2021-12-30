import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core';
import ModalOrderDetails from 'features/auth/components/ModalOrderDetails';
import * as React from 'react';
import { toast } from 'react-toastify';
import { numberWithCommas } from 'utils';
export interface ReviewOrderProps {
  data: any;
  onCancelOrder (id:any):void;
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
export default function ReviewOrder({ data, onCancelOrder }: ReviewOrderProps) {
  const handleCancelOrder = async (id: any) => {
    try {
      onCancelOrder(id);   
      toast.success('thành công!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error('Thất bại!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
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
              secondary={item.status}
            />
            {item.status === 'Chờ xác nhận' && (
              <Box mt={3} mb={3}>
                <Button
                  type='button'
                  onClick={() => handleCancelOrder(item.id)}
                  variant='contained'
                  color='secondary'
                >
                  hủy đơn hàng
                </Button>
              </Box>
            )}
            <ModalOrderDetails title='xem chi tiết' id={item.id} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
