import React from "react";
import ButtonPrimary from "./ButtonPrimary";

function BoardEmpty() {
  return (
    <div className='absolute left-0 top-1/2 right-0 mx-4 flex -translate-y-1/2 select-none flex-col items-center'>
      <h2 className='mb-6 text-center text-grey_medium'>
        This board is empty. Create a new column to get started.
      </h2>
      <ButtonPrimary>+ Add New Column</ButtonPrimary>
    </div>
  );
}

export default BoardEmpty;
