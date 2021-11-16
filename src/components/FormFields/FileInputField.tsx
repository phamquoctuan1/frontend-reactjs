import React, { useState, useEffect } from 'react';
import { Control, useController } from 'react-hook-form';
import { InputHTMLAttributes } from 'react-transition-group/node_modules/@types/react';

export interface FileInputFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export default function FileInputField({
  name,
  control,
  label,
  ...inputProps
}: FileInputFieldProps) {
  const { field } = useController({ control, name });
  const [value, setValue] = useState('');
  const [img, setImg] = useState('');
  const handleOnChange = (e: any) => {
    setValue(e.target.value);
    field.onChange(e.target.files);
    const imgURL = URL.createObjectURL(e.target.files[0]);
    setImg(imgURL);
  };
  useEffect(() => {
    return () => {
      img && URL.revokeObjectURL(img);
    };
  }, [img]);
  return (
    <div>
      <input
        accept='image/*'
        type='file'
        value={value}
        onChange={(e) => handleOnChange(e)}
      />
      {img && (
        <div
          style={{
            margin: '15px 5px 0',
            display: 'flex',
            justifyContent: 'space-between',
            width: '125px',
            alignItems: 'center',
          }}
        >
          <h3>Avatar</h3>
          <img
            src={img}
            alt=''
            width='50px'
            height='50px'
            style={{ borderRadius: '50%' }}
          />
        </div>
      )}
    </div>
  );
}
