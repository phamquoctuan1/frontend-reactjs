import React, { useState } from 'react';
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
  return (
    <div>
      <input
        type='file'
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          field.onChange(e.target.files);
        }}
      />
    </div>
  );
}
