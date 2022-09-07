import React from "react";
import ButtonPrimaryAddColumn from "./ButtonPrimaryAddColumn";
import { toggleAddBoard } from "../../store/uiSlice";
import { useDispatch } from "react-redux";

function BoardCreate() {
  const dispatch = useDispatch();

  return (
    <div className='relative top-1/2 mx-4 flex -translate-y-full select-none flex-col items-center'>
      <h2 className='mb-6 text-center text-grey_medium'>
        There are no Kanban Boards. Create a new board to get started.
      </h2>
      <ButtonPrimaryAddColumn onClick={() => dispatch(toggleAddBoard())}>
        + Create New Board
      </ButtonPrimaryAddColumn>
    </div>
  );
}

export default BoardCreate;
