import React, { useState, useEffect } from "react";
import kanbanData from "../../public/data.json";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDeleteBoardIsVisible,
  toggleDeleteBoardClose,
} from "../../store/uiSlice";
import { selectCurrentBoard } from "../../store/boardSlice";

//reacthookform

import ButtonSecondary from "../UI/ButtonSecondary";
import ButtonDestructive from "../UI/ButtonDestructive";

export default function EditBoard() {
  const [isBrowser, setIsBrowser] = useState(false);

  const dispatch = useDispatch();
  const deleteBoardOpen = useSelector(selectDeleteBoardIsVisible);
  const currentBoardId = useSelector(selectCurrentBoard);
  const boardData = kanbanData.boards.find(
    (board) => board.id === currentBoardId
  );

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const toggleDeleteBoardCloseHandler = () => {
    dispatch(toggleDeleteBoardClose());
  };

  const modalContent = (
    <AnimatePresence>
      {deleteBoardOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='absolute top-1/2 left-4 right-4 z-50 mx-auto max-w-[480px] -translate-y-1/2 rounded-md bg-white p-6 transition-colors ease-in-out dark:bg-grey_dark md:p-8'
        >
          <h2 className='text-red_main'>Delete this board?</h2>
          <p className='bodyL mt-6 text-grey_medium'>
            Are you sure you want to delete the &apos;{boardData.name}&apos;
            board? This action will remove all columns and tasks and cannot be
            reversed.
          </p>

          <div className='mt-6 space-y-4 md:flex md:space-x-4 md:space-y-0'>
            <ButtonDestructive>Delete</ButtonDestructive>
            <ButtonSecondary onClick={toggleDeleteBoardCloseHandler}>
              Cancel
            </ButtonSecondary>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  const underlayContent = (
    <AnimatePresence>
      {deleteBoardOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='absolute top-0 z-20 h-full w-full bg-[#000000] opacity-50'
          onClick={toggleDeleteBoardCloseHandler}
        ></motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (isBrowser) {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          underlayContent,
          document.getElementById("deleteBoard-root")
        )}
        {ReactDOM.createPortal(
          modalContent,
          document.getElementById("deleteBoard-root")
        )}
      </React.Fragment>
    );
  } else {
    return null;
  }
}
