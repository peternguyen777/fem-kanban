import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectViewTaskIsVisible,
  toggleViewTaskClose,
} from "../../store/uiSlice";
import { selectCurrentTask } from "../../store/boardSlice";

export default function ViewTask() {
  const [isBrowser, setIsBrowser] = useState(false);
  const dispatch = useDispatch();
  const viewTaskOpen = useSelector(selectViewTaskIsVisible);
  const taskData = useSelector(selectCurrentTask);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const toggleViewTaskHandler = () => {
    dispatch(toggleViewTaskClose());
  };

  var completedTasks = 0;
  taskData.subtasks.filter((item) => {
    if (item.isCompleted) {
      completedTasks++;
    }
  });

  // console.log(taskData);
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
          className='absolute top-1/2 left-0 right-0 z-50 mx-4 -translate-y-1/2 rounded-md bg-white p-6 pb-8 transition-colors ease-in-out dark:bg-grey_dark'
        >
          <div>
            <h2>{taskData.title}</h2>
            <p className='bodyL mt-6 text-grey_medium'>
              {taskData.description}
            </p>
            <p className='bodyM mt-6'>
              Subtasks ({completedTasks} of {taskData.subtasks.length})
            </p>
            <ul className='mt-4 space-y-2'>
              {taskData.subtasks.map((task, i) => (
                <div
                  key={i}
                  className='rounded-[4px] py-4 pl-3 pr-2 dark:bg-grey_verydark'
                >
                  <p
                    className={`bodyM text-grey_medium ${
                      task.isCompleted && `line-through`
                    }`}
                  >
                    {task.title}
                  </p>
                </div>
              ))}
            </ul>
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
