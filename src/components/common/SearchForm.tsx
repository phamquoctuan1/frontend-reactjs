import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { SearchInputField } from 'components/FormFields/SearchInputField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface IAppProps {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(-1),
        width: 160,
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '15ch',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);
export interface SearchFormProps {
  initialValues?: any;
  onSubmit?: (formValues: any) => void;
}
export default function SearchForm({
  initialValues,
  onSubmit,
}: SearchFormProps) {
  const [error, setError] = useState<string>('');
  const { handleSubmit, control, reset } = useForm<any>({
    defaultValues: initialValues,
  });
  const handleOnSubmit = async (formValues: any) => {
    try {
      setError('');
      await onSubmit?.(formValues);
      reset();
    } catch (err) {
      let msg = (err as Error).message;
      setError(msg);
    }
  };
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <form className={classes.root} onSubmit={handleSubmit(handleOnSubmit)}>
        <SearchInputField
          placeholder='Tìm kiếm sản phẩm ...'
          name='name'
          control={control}
        />
      </form>
      {error && <Alert severity='error'>{error}</Alert>}
    </div>
  );
}
