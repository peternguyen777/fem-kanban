import React, { useState, useEffect } from "react";
import kanbanData from "../../public/data.json";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAddTaskIsVisible,
  toggleAddTaskClose,
} from "../../store/uiSlice";
import { selectCurrentBoard, selectCurrentTask } from "../../store/boardSlice";
import Dropdown from "../UI/Dropdown";

export default function AddTask() {
  const [isBrowser, setIsBrowser] = useState(false);

  const dispatch = useDispatch();
  const addTaskOpen = useSelector(selectAddTaskIsVisible);

  const taskData = useSelector(selectCurrentTask);
  const currentBoardId = useSelector(selectCurrentBoard);
  const boardData = kanbanData.boards.find(
    (board) => board.id === currentBoardId
  );

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const toggleAddTaskHandler = () => {
    dispatch(toggleAddTaskClose());
  };

  const setSubtaskCompleteHandler = () => {
    //change subtask complete
  };

  var completedTasks = 0;
  taskData.subtasks.filter((item) => {
    if (item.isCompleted) {
      completedTasks++;
    }
  });

  const modalContent = (
    <AnimatePresence>
      {addTaskOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='absolute top-1/2 left-4 right-4 z-50 mx-auto max-w-[480px] -translate-y-1/2 rounded-md bg-white p-6 pb-8 transition-colors ease-in-out dark:bg-grey_dark'
        >
          <form>
            <h2>Add New Task</h2>

            <label htmlFor='title' className='bodyM mt-6 text-grey_medium'>
              Title
            </label>
            <input
              type='text'
              name='title'
              placeholder='eg. Take coffee break'
            />

            <Dropdown taskData={taskData} boardData={boardData} />
          </form>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  const underlayContent = (
    <AnimatePresence>
      {addTaskOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='absolute top-0 z-20 h-full w-full bg-[#000000] opacity-50'
          onClick={toggleAddTaskHandler}
        ></motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (isBrowser) {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          underlayContent,
          document.getElementById("addTask-root")
        )}
        {ReactDOM.createPortal(
          modalContent,
          document.getElementById("addTask-root")
        )}
      </React.Fragment>
    );
  } else {
    return null;
  }
}
