import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import ToggleLightDark from "../UI/ToggleLightDark";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectMenuMobileIsVisible,
  toggleMenuMobileClose,
  toggleAddBoard,
} from "../../store/uiSlice";
import { selectBoardData, selectAllBoardData } from "../../store/boardSlice";

export default function MobileMenu() {
  const [isBrowser, setIsBrowser] = useState(false);
  const dispatch = useDispatch();
  const allBoards = useSelector(selectAllBoardData);
  const boardData = useSelector(selectBoardData);
  const menuOpen = useSelector(selectMenuMobileIsVisible);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const toggleMenuHandler = () => {
    dispatch(toggleMenuMobileClose());
  };

  const toggleAddBoardHandler = () => {
    dispatch(toggleAddBoard());
  };

  const modalContent = (
    <AnimatePresence>
      {menuOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='fixed top-16 left-0 right-0 z-50 mx-14 mt-4 select-none rounded-[8px] bg-white pb-4 transition-colors ease-in-out dark:bg-grey_dark md:hidden'
        >
          <div className='mt-4'>
            <h4 className='ml-6 mb-[19px]'>ALL BOARDS ({allBoards.length})</h4>
            <ul>
              {allBoards.map((item, i) => (
                <Link href={`${item.slug}`} key={item._id}>
                  <li
                    className={`group grid h-12 w-[240px] cursor-pointer items-center rounded-r-full transition duration-150 ${
                      boardData.name === item.name
                        ? `bg-purple_main`
                        : `hover:bg-purple_main/10 hover:dark:bg-white`
                    }`}
                  >
                    <div className='ml-8 flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className={`mr-3 h-4 w-4 fill-current ${
                          boardData.name === item.name
                            ? `text-white group-hover:text-white`
                            : `text-grey_medium group-hover:text-purple_main `
                        }`}
                      >
                        <path d='M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z' />
                      </svg>
                      <h3
                        className={`-translate-y-[1px] ${
                          boardData.name === item.name
                            ? `text-white group-hover:text-white`
                            : `text-grey_medium group-hover:text-purple_main `
                        }`}
                      >
                        {item.name}
                      </h3>
                    </div>
                  </li>
                </Link>
              ))}
              <li
                className='group mb-4 grid h-12 w-fit cursor-pointer'
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
            </ul>
            <ToggleLightDark />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  const underlayContent = (
    <AnimatePresence>
      {menuOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='fixed top-16 z-20 h-full w-full bg-[#000000] opacity-50 md:hidden'
          onClick={toggleMenuHandler}
        ></motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (isBrowser) {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          underlayContent,
          document.getElementById("mobMenu-root")
        )}
        {ReactDOM.createPortal(
          modalContent,
          document.getElementById("mobMenu-root")
        )}
      </React.Fragment>
    );
  } else {
    return null;
  }
}
