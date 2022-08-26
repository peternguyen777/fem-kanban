import React, { useEffect } from "react";
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
} from "../store/uiSlice";
import { selectCurrentBoard } from "../store/boardSlice";
import kanbanData from "../public/data.json";

function Header() {
  const dispatch = useDispatch();
  const menuDesktopOpen = useSelector(selectMenuDesktopIsVisible);
  const menuMobileOpen = useSelector(selectMenuMobileIsVisible);
  const sidebarOn = useSelector(selectToggleable);
  const currentBoardId = useSelector(selectCurrentBoard);
  const boardData = kanbanData.boards.find(
    (board) => board.id === currentBoardId
  );
  console.log(boardData.columns);

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
      <div className='flex items-center'>
        <ButtonAddNewTaskMobile
          disabled={boardData.columns.length === 0 && `disabled`}
        />
        <ButtonAddNewTask
          disabled={boardData.columns.length === 0 && `disabled`}
        >
          + Add New Task
        </ButtonAddNewTask>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='ml-4 h-5 w-[5px] cursor-pointer fill-current text-[#828FA3] md:ml-6'
        >
          <g fillRule='evenodd'>
            <circle cx='2.308' cy='2.308' r='2.308' />
            <circle cx='2.308' cy='10' r='2.308' />
            <circle cx='2.308' cy='17.692' r='2.308' />
          </g>
        </svg>
      </div>
    </header>
  );
}

export default Header;
