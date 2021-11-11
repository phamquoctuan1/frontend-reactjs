import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { InputField } from 'components/FormFields';
import FileInputField from 'components/FormFields/FileInputField';
import { User } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface RegisterFormProps {
  initialValues?: User;
  onSubmit?: (formValues: User) => void;
}
const schema = yup
  .object({
    name: yup.string().required('Nhập tên của bạn'),
    userName: yup.string().required('Tên đăng nhập không thể bỏ trống'),
    password: yup
      .string()
      .min(8, 'Mật khẩu phải trên 8 ký tự')
      .required('Mật khẩu không thể bỏ trống'),
    email: yup
      .string()
      .email('Vui lòng nhập đúng định dạng email')
      .required('Email không được bỏ trống'),
    phone: yup
      .string()
      .matches(
        /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
        'Số điện thoại không hợp lệ'
      ),
  })
  .required();

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
export default function RegisterForm({
  initialValues,
  onSubmit,
}: RegisterFormProps) {
  const [error, setError] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<any>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const classes = useStyles();

  const handleFormSubmit = async (formValues: User) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (err) {
      let msg = (err as Error).message;
      setError(msg);
    }
  };
  return (
    <Box maxWidth={350}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name='userName' control={control} label='Tên đăng nhập' />
        <InputField
          name='password'
          control={control}
          label='Mật khẩu'
          type='password'
        />
        <InputField name='name' control={control} label='Họ tên' />
        <InputField name='email' control={control} label='Email' />
        <InputField name='phone' control={control} label='Số điện thoại' />
        <InputField name='address' control={control} label='Địa chỉ' />
        <FileInputField
          name='picture'
          control={control}
          label='Avatar'
          type='file'
        />
        {error && <Alert severity='error'>{error}</Alert>}
        <Box mt={2} className={classes.box}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color='primary' />}{' '}
            Đăng ký
          </Button>
        </Box>
      </form>
    </Box>
  );
}
