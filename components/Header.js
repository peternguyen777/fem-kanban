import React, { useEffect, useState } from "react";
import ButtonAddNewTaskMobile from "./UI/ButtonAddNewTaskMobile";
import ButtonAddNewTask from "./UI/ButtonAddNewTask";
import HeaderLogos from "./UI/HeaderLogos";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMenuDesktopIsVisible,
  selectMenuMobileIsVisible,
  selectToggleable,
  toggleMenuMobile,
  toggleMenuDesktopClose,
  toggleableTrue,
  toggleableFalse,
  toggleEditBoard,
  toggleDeleteBoard,
} from "../store/uiSlice";
import { selectCurrentBoard } from "../store/boardSlice";
import kanbanData from "../public/data.json";

function Header() {
  const [isDotsOpen, setIsDotsOpen] = useState(false);
  const dispatch = useDispatch();
  const menuDesktopOpen = useSelector(selectMenuDesktopIsVisible);
  const menuMobileOpen = useSelector(selectMenuMobileIsVisible);
  const sidebarOn = useSelector(selectToggleable);
  const currentBoardId = useSelector(selectCurrentBoard);
  const boardData = kanbanData.boards.find(
    (board) => board.id === currentBoardId
  );

  const menuMobileToggleHandler = () => {
    if (sidebarOn) dispatch(toggleMenuMobile());
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerHeight < 500) {
        dispatch(toggleableFalse());
        dispatch(toggleMenuDesktopClose());
      } else if (window.innerHeight >= 500) {
        dispatch(toggleableTrue());
      }
    }
    window.addEventListener("resize", handleResize);
  });

  const editClickHandler = () => {
    setIsDotsOpen(false);
    dispatch(toggleEditBoard());
  };

  const deleteClickHandler = () => {
    setIsDotsOpen(false);
    dispatch(toggleDeleteBoard());
  };

  return (
    <header className='sticky z-10 flex h-16 select-none items-center justify-between bg-white px-4 transition-colors dark:bg-grey_dark md:h-[80px] md:border-b md:border-lines_light md:px-6 md:dark:border-lines_dark lg:h-[96px]'>
      <div className='flex h-full items-center'>
        {menuDesktopOpen ? (
          <div className='md:hidden'>
            <HeaderLogos />
          </div>
        ) : (
          <div>
            <HeaderLogos />
          </div>
        )}

        <div
          onClick={menuMobileToggleHandler}
          className={`flex h-full cursor-pointer items-center md:cursor-auto ${
            menuDesktopOpen
              ? `md:ml-0 `
              : `md:ml-6 md:border-l md:border-lines_light md:dark:border-lines_dark`
          } `}
        >
          <h2
            className={`ml-4 mr-2 text-black dark:text-white ${
              menuDesktopOpen ? `md:ml-0` : `md:ml-6`
            } md:text-[20px] md:leading-[25px]`}
          >
            {boardData.name}
          </h2>
          {menuMobileOpen ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-[7px] w-[10px] stroke-[#635FC7] stroke-2 md:hidden'
            >
              <path fill='none' d='M9 6 5 2 1 6' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-[7px] w-[10px] stroke-[#635FC7] stroke-2 md:hidden'
            >
              <path fill='none' d='m1 1 4 4 4-4' />
            </svg>
          )}
        </div>
      </div>
      <div className='relative flex items-center '>
        <ButtonAddNewTaskMobile
          disabled={boardData.columns.length === 0 && `disabled`}
        />
        <ButtonAddNewTask
          disabled={boardData.columns.length === 0 && `disabled`}
        >
          + Add New Task
        </ButtonAddNewTask>
        <div
          className='grid h-10 w-5 cursor-pointer items-center justify-end md:w-7'
          onClick={() => setIsDotsOpen(!isDotsOpen)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-[5px] fill-current text-[#828FA3]'
          >
            <g fillRule='evenodd'>
              <circle cx='2.308' cy='2.308' r='2.308' />
              <circle cx='2.308' cy='10' r='2.308' />
              <circle cx='2.308' cy='17.692' r='2.308' />
            </g>
          </svg>
        </div>
        {isDotsOpen && (
          <div className='absolute top-[calc(100%+8px)] right-0 w-[192px] select-none rounded-lg border border-lines_light bg-white shadow-lg dark:border-lines_dark dark:bg-grey_verydark'>
            <p
              className='bodyL cursor-pointer px-4 pt-4 pb-2 text-grey_medium'
              onClick={editClickHandler}
            >
              Edit Board
            </p>
            <p
              className='bodyL cursor-pointer px-4 pb-4 pt-2 text-red_main'
              onClick={deleteClickHandler}
            >
              Delete Board
            </p>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
