import React from "react";
import { useDispatch } from "react-redux";
import { toggleAddTask } from "../../store/uiSlice";

function ButtonAddNewTaskMobile({ disabled }) {
  const dispatch = useDispatch();

  const addTaskHandler = () => {
    dispatch(toggleAddTask());
  };

  return (
    <button
      onClick={addTaskHandler}
      disabled={disabled ? true : false}
      className='grid h-8 w-12 cursor-pointer items-center justify-center rounded-full bg-purple_main disabled:opacity-25 md:hidden'
    >
      <svg width='12' height='12' xmlns='http://www.w3.org/2000/svg'>
        <path
          fill='#FFF'
          d='M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z'
        />
      </svg>
    </button>
  );
}

export default ButtonAddNewTaskMobile;
