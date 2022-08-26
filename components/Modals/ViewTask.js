import React, { useState, useEffect } from "react";
import kanbanData from "../../public/data.json";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectViewTaskIsVisible,
  toggleViewTaskClose,
} from "../../store/uiSlice";
import { selectCurrentBoard, selectCurrentTask } from "../../store/boardSlice";
import Dropdown from "../UI/Dropdown";

export default function ViewTask() {
  const [isBrowser, setIsBrowser] = useState(false);

  const dispatch = useDispatch();
  const viewTaskOpen = useSelector(selectViewTaskIsVisible);
  const taskData = useSelector(selectCurrentTask);
  const currentBoardId = useSelector(selectCurrentBoard);
  const boardData = kanbanData.boards.find(
    (board) => board.id === currentBoardId
  );

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const toggleViewTaskHandler = () => {
    dispatch(toggleViewTaskClose());
  };

  const setSubtaskCompleteHandler = () => {
    //change subtask complete
  };

  var completedTasks = 0;
  taskData.subtasks.forEach((item) => {
    if (item.isCompleted) {
      completedTasks++;
    }
  });

  const modalContent = (
    <AnimatePresence>
      {viewTaskOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='absolute top-1/2 left-4 right-4 z-50 mx-auto max-w-[480px] -translate-y-1/2 rounded-md bg-white p-6 pb-8 transition-colors ease-in-out dark:bg-grey_dark md:p-8'
        >
          <div>
            <div className='flex items-center justify-between'>
              <h2>{taskData.title}</h2>
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
            <p className='bodyL mt-6 text-grey_medium'>
              {taskData.description}
            </p>
            <p className='bodyM mt-6 text-grey_medium dark:text-white'>
              Subtasks ({completedTasks} of {taskData.subtasks.length})
            </p>
            <ul className='mt-4 space-y-2'>
              {taskData.subtasks.map((task, i) => (
                <div
                  key={i}
                  className='flex cursor-pointer rounded-[4px] bg-grey_light py-4 pl-3 pr-2 hover:bg-purple_main/25 dark:bg-grey_verydark'
                >
                  <div
                    className={`mr-4 grid h-4 w-4 flex-none items-center justify-center rounded-[2px] border ${
                      task.isCompleted
                        ? `border-purple_main bg-purple_main`
                        : `border-lines_light bg-white dark:border-lines_dark dark:bg-grey_dark `
                    }`}
                    onClick={setSubtaskCompleteHandler}
                  >
                    {task.isCompleted && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-2 w-[10px] stroke-white stroke-2'
                      >
                        <path fill='none' d='m1.276 3.066 2.756 2.756 5-5' />
                      </svg>
                    )}
                  </div>
                  <p
                    className={`bodyM  ${
                      task.isCompleted
                        ? `text-grey_medium line-through`
                        : `text-black dark:text-white`
                    }`}
                  >
                    {task.title}
                  </p>
                </div>
              ))}
            </ul>
            <Dropdown taskData={taskData} boardData={boardData} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  const underlayContent = (
    <AnimatePresence>
      {viewTaskOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='absolute top-0 z-20 h-full w-full bg-[#000000] opacity-50'
          onClick={toggleViewTaskHandler}
        ></motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (isBrowser) {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          underlayContent,
          document.getElementById("viewTask-root")
        )}
        {ReactDOM.createPortal(
          modalContent,
          document.getElementById("viewTask-root")
        )}
      </React.Fragment>
    );
  } else {
    return null;
  }
}
