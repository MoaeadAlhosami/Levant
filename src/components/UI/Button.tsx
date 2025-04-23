import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  ...props
}) => (
  <button
    className={`
      inline-flex items-center justify-center gap-2
      rounded-md px-5 py-2.5 text-sm font-semibold
      bg-blue-600 hover:bg-blue-700 text-white
      shadow-sm hover:shadow-md active:scale-[0.97]
      transition-all duration-150 ease-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
      disabled:opacity-50 disabled:pointer-events-none
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export default Button;
