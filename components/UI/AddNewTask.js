import React from "react";

function AddNewTask({ disabled }) {
  return (
    <button
      disabled={disabled ? true : false}
      className='hidden h-12 cursor-pointer items-center justify-center rounded-full bg-purple_main px-6 disabled:opacity-25 md:grid'
    >
      <h3 className='text-white'>+ Add New Task</h3>
    </button>
  );
}

export default AddNewTask;
