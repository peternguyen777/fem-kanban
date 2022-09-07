import React from "react";

function MenuDesktopPrivate({ toggleAddBoardHandler }) {
  return (
    <div>
      <hr className='my-6' />
      <h4 className='ml-6 mb-[19px]'>PRIVATE BOARDS (0)</h4>
      <li
        className='group grid h-12 w-fit cursor-pointer'
        onClick={toggleAddBoardHandler}
      >
        <div className='ml-8 flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='mr-3 h-4 w-4 fill-current text-purple_main group-hover:text-purple_hover'
          >
            <path d='M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z' />
          </svg>
          <h3 className='-translate-y-[1px] text-purple_main group-hover:text-purple_hover'>
            + Create New Board
          </h3>
        </div>
      </li>
    </div>
  );
}

export default MenuDesktopPrivate;
