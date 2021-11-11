import React from 'react';
export interface SectionProps {
  children: any;
}
export const Section = (props: SectionProps) => {
  return <div className='section'>{props.children}</div>;
};

export const SectionTitle = (props: SectionProps) => {
  return <div className='section__title'>{props.children}</div>;
};

export const SectionBody = (props: SectionProps) => {
  return <div className='section__body'>{props.children}</div>;
};

