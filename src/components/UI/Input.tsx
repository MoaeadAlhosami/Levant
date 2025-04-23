import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className = '', ...props }) => (
  <input
    className={`
      w-full rounded-lg border border-gray-300 bg-white
      px-4 py-2.5 text-sm placeholder-gray-400
      shadow-sm focus:shadow-md
      transition-all duration-150
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      ${className}
    `}
    {...props}
  />
);

export default Input;
