//react/next
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { useRouter } from "next/router";

//jsx
import Dropdown from "../UI/Dropdown";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectViewTaskIsVisible,
  toggleViewTaskClose,
  toggleEditTask,
  toggleDeleteTask,
} from "../../store/uiSlice";

//react-query
import { useCurrentBoard } from "../../hooks/useQuery";
import { useSubtaskClick, useStatusChange } from "../../hooks/useMutationTask";

export default function ViewTask(taskId, colId, boardId) {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    data: currentBoard,
    isLoading,
    error,
  } = useCurrentBoard(router.query.board);

  const columnData = currentBoard?.columns.find(
    (column) => column._id === router.query.column
  );

  const taskData = columnData?.tasks.find(
    (task) => task._id === router.query.task
  );

  const [isBrowser, setIsBrowser] = useState(false);
  const [isDotsOpen, setIsDotsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const viewTaskOpen = useSelector(selectViewTaskIsVisible);

  const { mutate: mutateSubtask } = useSubtaskClick();
  const { mutate: mutateStatus } = useStatusChange();

  useEffect(() => {
    setIsBrowser(true);
    setStatus(columnData?.name);
  }, [columnData]);

  const toggleViewTaskCloseHandler = () => {
    dispatch(toggleViewTaskClose());
    setIsDotsOpen(false);
    setTimeout(router.back, 200);
  };

  const setSubtaskCompleteHandler = (subtask) => {
    //change subtask complete
    subtask.boardId = router.query.board;
    subtask.colId = router.query.column;
    subtask.taskId = router.query.task;
    mutateSubtask(subtask);
  };

  useEffect(() => {
    const colTo = currentBoard?.columns.find(
      (column) => column.name === status
    );

    if (colTo?._id === router.query.column || !colTo) {
      return;
    }

    const statusChangeData = {
      boardId: router.query.board,
      colId: router.query.column,
      taskId: router.query.task,
      colToId: colTo._id,
    };
    mutateStatus(statusChangeData);
    dispatch(toggleViewTaskClose());
  }, [status]);

  const editClickHandler = () => {
    //set current Task,
    //set Edit Task open
    dispatch(toggleViewTaskClose());
    dispatch(toggleEditTask());
    setIsDotsOpen(false);
  };

  const deleteClickHandler = () => {
    //delete current Task
    dispatch(toggleDeleteTask());
    dispatch(toggleViewTaskClose());
    setIsDotsOpen(false);
  };

  var completedTasks = 0;
  taskData?.subtasks?.forEach((item) => {
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
            <div className='relative flex items-center justify-between '>
              <h2>{taskData?.title}</h2>
              <div
                className='ml-4 grid h-10 w-5 cursor-pointer items-center justify-end'
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
                    Edit Task
                  </p>
                  <p
                    className='bodyL cursor-pointer px-4 pb-4 pt-2 text-red_main'
                    onClick={deleteClickHandler}
                  >
                    Delete Task
                  </p>
                </div>
              )}
            </div>
            <p className='bodyL mt-6 text-grey_medium'>
              {taskData?.description}
            </p>
            <p className='bodyM mt-6 text-grey_medium dark:text-white'>
              Subtasks ({completedTasks} of {taskData?.subtasks.length})
            </p>
            <ul className='mt-4 space-y-2'>
              {taskData?.subtasks.map((task, i) => (
                <div
                  key={i}
                  onClick={() => setSubtaskCompleteHandler(task)}
                  className='flex cursor-pointer rounded-[4px] bg-grey_light py-4 pl-3 pr-2 hover:bg-purple_main/25 dark:bg-grey_verydark'
                >
                  <div
                    className={`mr-4 grid h-4 w-4 flex-none items-center justify-center rounded-[2px] border ${
                      task.isCompleted
                        ? `border-purple_main bg-purple_main`
                        : `border-lines_light bg-white dark:border-lines_dark dark:bg-grey_dark `
                    }`}
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
            <Dropdown
              boardData={currentBoard}
              setStatus={setStatus}
              status={status}
            />
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
          onClick={toggleViewTaskCloseHandler}
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
