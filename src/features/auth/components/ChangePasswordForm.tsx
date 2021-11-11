import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { InputField } from 'components/FormFields';
import { User } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface ChangePasswordFormProps {
  initialValues?: User;
  onSubmit?: (formValues: User) => void;
}
const schema = yup
  .object({
    password: yup
      .string()
      .min(8, 'Mật khẩu phải trên 8 ký tự')
      .required('Mật khẩu không thể bỏ trống'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Mật khẩu nhập lại không đúng')
      .min(8, 'Mật khẩu phải trên 8 ký tự')
      .required('không được bỏ trống'),
  })
  .required();

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
export default function ChangePasswordForm({
  initialValues,
  onSubmit,
}: ChangePasswordFormProps) {
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
        <InputField
          name='password'
          control={control}
          label='Mật khẩu'
          type='password'
        />
        <InputField
          name='passwordConfirmation'
          control={control}
          label='Nhập lại mật khẩu'
          type='password'
        />
        {error && <Alert severity='error'>{error}</Alert>}
        <Box mt={2} className={classes.box}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color='primary' />} Đổi
            mật khẩu
          </Button>
        </Box>
      </form>
    </Box>
  );
}
