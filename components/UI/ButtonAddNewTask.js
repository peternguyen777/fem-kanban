import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddTask, selectAddTaskIsVisible } from "../../store/uiSlice";

function ButtonAddNewTask({ disabled }) {
  const dispatch = useDispatch();

  const addTaskHandler = () => {
    dispatch(toggleAddTask());
  };

  return (
    <button
      onClick={addTaskHandler}
      disabled={disabled ? true : false}
      className='hidden h-12 cursor-pointer items-center justify-center rounded-full bg-purple_main px-6 disabled:opacity-25 md:grid'
    >
      <h3 className='text-white'>+ Add New Task</h3>
    </button>
  );
}

export default ButtonAddNewTask;
