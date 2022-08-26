import React from "react";

function ButtonSecondary({ disabled, submit, children, onClick }) {
  return (
    <button
      type={submit ? `submit` : `text`}
      onClick={onClick}
      disabled={disabled ? true : false}
      className='grid h-10 w-full cursor-pointer items-center justify-center rounded-full bg-purple_main/10 px-6 transition-colors duration-150 hover:bg-purple_hover/25 disabled:opacity-25 dark:bg-white dark:hover:bg-white'
    >
      <p className='bodyL text-purple_main'>{children}</p>
    </button>
  );
}

export default ButtonSecondary;
