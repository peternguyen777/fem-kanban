import React from "react";

function ButtonPrimary({ disabled, children }) {
  return (
    <button
      disabled={disabled ? true : false}
      className='grid h-12 cursor-pointer items-center justify-center rounded-full bg-purple_main px-6 transition-colors duration-150 hover:bg-purple_hover disabled:opacity-25'
    >
      <h3 className='text-white'>{children}</h3>
    </button>
  );
}

export default ButtonPrimary;
