import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      className='spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 text-purple_main'
      role='status'
    >
      <span className='visually-hidden'>Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
