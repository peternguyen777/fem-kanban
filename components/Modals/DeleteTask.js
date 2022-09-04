import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDeleteTaskIsVisible,
  toggleDeleteTaskClose,
} from "../../store/uiSlice";
import { selectCurrentTask } from "../../store/boardSlice";

import ButtonSecondary from "../UI/ButtonSecondary";
import ButtonDestructive from "../UI/ButtonDestructive";

import { useDeleteTask } from "../../hooks/useMutationTask";

export default function EditBoard() {
  const router = useRouter();
  const [isBrowser, setIsBrowser] = useState(false);

  const dispatch = useDispatch();
  const deleteTaskOpen = useSelector(selectDeleteTaskIsVisible);
  const currentTask = useSelector(selectCurrentTask);

  const { mutate } = useDeleteTask();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const deleteTaskHandler = () => {
    const taskData = {
      boardId: router.query.board,
      colId: router.query.column,
      taskId: router.query.task,
    };

    mutate(taskData);
    dispatch(toggleDeleteTaskClose());
  };

  const toggleDeleteTaskCloseHandler = () => {
    dispatch(toggleDeleteTaskClose());
  };

  const modalContent = (
    <AnimatePresence>
      {deleteTaskOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='absolute top-1/2 left-4 right-4 z-50 mx-auto max-w-[480px] -translate-y-1/2 rounded-md bg-white p-6 transition-colors ease-in-out dark:bg-grey_dark md:p-8'
        >
          <h2 className='text-red_main'>Delete this task?</h2>
          <p className='bodyL mt-6 text-grey_medium'>
            Are you sure you want to delete the &apos;{currentTask.title}&apos;
            task and its subtasks? This action cannot be reversed.
          </p>

          <div className='mt-6 space-y-4 md:flex md:space-x-4 md:space-y-0'>
            <ButtonDestructive onClick={deleteTaskHandler}>
              Delete
            </ButtonDestructive>
            <ButtonSecondary onClick={toggleDeleteTaskCloseHandler}>
              Cancel
            </ButtonSecondary>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  const underlayContent = (
    <AnimatePresence>
      {deleteTaskOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='absolute top-0 z-20 h-full w-full bg-[#000000] opacity-50'
          onClick={toggleDeleteTaskCloseHandler}
        ></motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (isBrowser) {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          underlayContent,
          document.getElementById("deleteTask-root")
        )}
        {ReactDOM.createPortal(
          modalContent,
          document.getElementById("deleteTask-root")
        )}
      </React.Fragment>
    );
  } else {
    return null;
  }
}
