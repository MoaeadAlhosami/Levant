import React from 'react';

const Spinner: React.FC = () => (
  <div className="flex items-center justify-center py-10">
    <div
      className="
        h-14 w-14 animate-spin rounded-full
        border-[5px] border-t-transparent border-blue-600
      "
    />
  </div>
);

export default Spinner;
