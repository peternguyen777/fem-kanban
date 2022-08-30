import React from "react";

function ButtonDestructive({ disabled, submit, children, onClick }) {
  return (
    <button
      type={submit ? `submit` : `button`}
      onClick={onClick}
      disabled={disabled ? true : false}
      className='grid h-10 w-full cursor-pointer items-center justify-center rounded-full bg-red_main px-6 transition-colors duration-150 hover:bg-red_hover'
    >
      <p className='bodyL text-white'>{children}</p>
    </button>
  );
}

export default ButtonDestructive;
