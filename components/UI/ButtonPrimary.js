import React from "react";

function ButtonPrimary({ disabled, submit, children, onClick }) {
  return (
    <button
      type={submit ? `submit` : `button`}
      disabled={disabled ? true : false}
      onClick={onClick}
      className='grid h-10 w-full cursor-pointer items-center justify-center rounded-full bg-purple_main px-6 transition-colors duration-150 hover:bg-purple_hover disabled:opacity-25'
    >
      <p className='bodyL text-white'>{children}</p>
    </button>
  );
}

export default ButtonPrimary;
