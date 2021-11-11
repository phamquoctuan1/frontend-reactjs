import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { authActions, LoginPayload, selectErrorLogin } from '../authSlice';

export interface LoginFormProps {
  initialValues?: LoginPayload;
  onSubmit?: (formValues: LoginPayload) => void;
}
const schema = yup
  .object({
    userName: yup.string().required('Tên đăng nhập không thể bỏ trống'),
    password: yup
      .string()
      .min(8, 'Mật khẩu phải trên 8 ký tự')
      .required('Mật khẩu không thể bỏ trống'),
  })
  .required();

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
export default function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
  const userLogin = useAppSelector(selectErrorLogin);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<any>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const classes = useStyles();

  const handleFormSubmit = async (formValues: LoginPayload) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    try {
      dispatch(authActions.clearError());
      await onSubmit?.(formValues);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box maxWidth={350}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name='userName' control={control} label='Tên đăng nhập' />
        <InputField
          name='password'
          control={control}
          type='password'
          label='Mật khẩu'
        />
        {userLogin && <Alert severity='error'>{userLogin}</Alert>}
        <Box mt={2} className={classes.box}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color='primary' />}{' '}
            Đăng nhập
          </Button>
        </Box>
      </form>
    </Box>
  );
}
