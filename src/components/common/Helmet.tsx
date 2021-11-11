import React from 'react';

export interface HelmetProps {
  title?: string;
  children?: any;
}
export const Helmet = (props: HelmetProps) => {
  document.title = 'Yolo - ' + props.title;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>{props.children}</div>;
};
