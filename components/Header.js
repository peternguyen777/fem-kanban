import React, { useEffect } from "react";
import AddNewTaskMobile from "./UI/AddNewTaskMobile";
import AddNewTask from "./UI/AddNewTask";
import HeaderLogos from "./UI/HeaderLogos";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMenuIsVisible,
  toggleMenu,
  toggleMenuClose,
} from "../store/uiSlice";
import MenuMobile from "./UI/MenuMobile";

function Header() {
  const dispatch = useDispatch();
  const menuOpen = useSelector(selectMenuIsVisible);

  const menuToggleHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div
      className={`${
        menuOpen
          ? `translate-x-0`
          : `sm:w-[calc(100%_+_260px)] sm:-translate-x-[260px] lg:w-[calc(100%_+_300px)] lg:-translate-x-[300px]`
      } absolute z-10 w-full select-none`}
    >
      <header className='flex h-16 items-center justify-between bg-white px-4 transition-colors dark:bg-grey_dark sm:h-[80px] sm:border-b  sm:border-lines_light sm:px-6 sm:dark:border-lines_dark'>
        <div className='flex h-full items-center'>
          {menuOpen ? (
            <div className='sm:hidden'>
              <HeaderLogos />
            </div>
          ) : (
            <div>
              <HeaderLogos />
            </div>
          )}

          <div
            onClick={menuToggleHandler}
            className={`flex h-full cursor-pointer items-center ${
              menuOpen
                ? `sm:ml-0 `
                : `sm:ml-6 sm:border-l sm:border-lines_light sm:dark:border-lines_dark`
            } `}
          >
            <h2
              className={`ml-4 mr-2 text-black dark:text-white ${
                menuOpen ? `sm:ml-0` : `sm:ml-6`
              } sm:text-[20px] sm:leading-[25px]`}
            >
              Platform Launch
            </h2>
            {menuOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-[7px] w-[10px] stroke-[#635FC7] stroke-2 sm:hidden'
              >
                <path fill='none' d='M9 6 5 2 1 6' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-[7px] w-[10px] stroke-[#635FC7] stroke-2 sm:hidden'
              >
                <path fill='none' d='m1 1 4 4 4-4' />
              </svg>
            )}
          </div>
        </div>
        <div className='flex items-center'>
          <AddNewTaskMobile />
          <AddNewTask>+ Add New Task</AddNewTask>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='ml-4 h-5 w-[5px] cursor-pointer fill-current text-[#828FA3] sm:ml-6'
          >
            <g fillRule='evenodd'>
              <circle cx='2.308' cy='2.308' r='2.308' />
              <circle cx='2.308' cy='10' r='2.308' />
              <circle cx='2.308' cy='17.692' r='2.308' />
            </g>
          </svg>
        </div>
      </header>
    </div>
  );
}

export default Header;
