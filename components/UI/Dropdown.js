import React, { useState } from "react";

function Dropdown({ taskData, boardData }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const setAssignedToHandler = (statusName) => {
    //change status state
    setIsDropdownOpen(false);
    console.log(statusName);
  };

  return (
    <div className='mt-6'>
      <label
        id='listbox-label'
        className='bodyM block font-jakarta text-grey_medium'
      >
        Assigned to
      </label>
      <div className='relative mt-2'>
        <button
          type='button'
          className='focus:ring-purple_medium relative h-10 w-full cursor-pointer rounded-md border border-purple_main/25 bg-white pl-4 pr-10 text-left shadow-sm focus:border-purple_main focus:outline-none focus:ring-1 '
          ariaHaspopup='listbox'
          ariaExpanded='true'
          ariaLabelledby='listbox-label'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span class='flex items-center'>
            <p className='bodyL truncate'>{taskData.status}</p>
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-4'>
            {isDropdownOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-[7px] w-[10px] stroke-[#635FC7] stroke-2'
              >
                <path fill='none' d='M9 6 5 2 1 6' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-[7px] w-[10px] stroke-[#635FC7] stroke-2'
              >
                <path fill='none' d='m1 1 4 4 4-4' />
              </svg>
            )}
          </span>
        </button>

        {isDropdownOpen && (
          <ul
            className='absolute z-10 mt-2 max-h-56 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            tabindex='-1'
            role='listbox'
            ariaLabelledby='listbox-label'
            ariaActivedescendant='listbox-option-3'
          >
            {boardData.columns.map((status) => (
              <li
                className='relative cursor-pointer select-none py-2 pl-4'
                id='listbox-option-0'
                role='option'
                onClick={() => setAssignedToHandler(status.name)}
              >
                <p className='bodyL truncate text-grey_medium'>{status.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
