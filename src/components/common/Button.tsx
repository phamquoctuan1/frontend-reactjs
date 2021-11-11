import React from 'react';

export interface ButtonProps {
  backgroundColor?: string;
  size?: string;
  icon?: string;
  animate?: boolean;
  onClick?: () => void;
  children: any;
}

const Button = (props: ButtonProps) => {
  const bg = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main';

  const size = props.size ? 'btn-' + props.size : '';

  const animate = props.animate ? 'btn-animate' : '';

  const handleClick = () => {
    if (!Boolean(props.onClick)) return;
    props.onClick?.();
  };
  return (
    <button className={`btn ${bg} ${size} ${animate}`} onClick={handleClick}>
      <span className='btn__txt'>{props.children}</span>
      {props.icon ? (
        <span className='btn__icon'>
          <i className={`${props.icon} bx-tada`}></i>
        </span>
      ) : null}
    </button>
  );
};

export default Button;
