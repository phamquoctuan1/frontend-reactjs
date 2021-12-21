import { alpha, createStyles, FormControl, Input, InputLabel, makeStyles, Theme } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { ListParams } from 'models';
import React, { ChangeEvent } from 'react';


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
  filter: ListParams;
  onSearchChange?: (newFilter: ListParams) => void;
  searchRef:any;
}
export default function SearchForm({ filter, onSearchChange, searchRef }: SearchFormProps) {
  
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter: ListParams = {
      ...filter,
      name: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };

  const classes = useStyles();
  return (
    <div className={classes.search}>
      <div>
        <FormControl variant='outlined' size='small'>
          <InputLabel htmlFor='searchByName'>Tìm theo tên</InputLabel>
          <Input
            id='searchByName'
            endAdornment={<Search />}
            onChange={handleSearchChange}
            inputRef={searchRef}
          />
        </FormControl>
      </div>
    </div>
  );
}
