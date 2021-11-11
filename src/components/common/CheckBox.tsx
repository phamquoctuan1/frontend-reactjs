import React from 'react';

export interface CheckBoxProps {
  label?: string;
  checked?: boolean;
  onChange?: (data: any) => void;
}
const CheckBox = (props: CheckBoxProps) => {
  const inputRef = React.useRef(null);

  const onChange = () => {
    if (props.onChange) {
      props.onChange(inputRef.current);
    }
  };

  return (
    <label className='custom-checkbox'>
      <input
        type='checkbox'
        ref={inputRef}
        onChange={onChange}
        checked={props.checked}
      />
      <span className='custom-checkbox__checkmark'>
        <i className='bx bx-check'></i>
      </span>
      {props.label}
    </label>
  );
};

export default CheckBox;
