import { HTMLAttributes } from 'react';

type ContainerProps = HTMLAttributes<HTMLDivElement>;

const Container = ({ children, className = '', ...others }: ContainerProps) => {
  return (
    <div
      className={`px-5 pb-20 pt-24 sm:px-8 lg:px-10 lg:py-16 ${className}`}
      {...others}
    >
      {children}
    </div>
  );
};

export default Container;
