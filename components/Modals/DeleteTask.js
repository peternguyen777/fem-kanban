//react/next
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";

//jsx
import ButtonSecondary from "../UI/ButtonSecondary";
import ButtonDestructive from "../UI/ButtonDestructive";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectDeleteTaskIsVisible,
  toggleDeleteTaskClose,
} from "../../store/uiSlice";

//react-query
import { useCurrentBoard } from "../../hooks/useQuery";
import { useDeleteTask } from "../../hooks/useMutationTask";
import Underlay from "./Underlay";

export default function EditBoard() {
  const router = useRouter();
  const [isBrowser, setIsBrowser] = useState(false);

  const dispatch = useDispatch();
  const deleteTaskOpen = useSelector(selectDeleteTaskIsVisible);

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
  const { mutate } = useDeleteTask();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const deleteTaskHandler = () => {
    const data = {
      boardId: router.query.board,
      colId: router.query.column,
      taskId: router.query.task,
    };

    mutate(data);
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
            Are you sure you want to delete the &apos;{taskData?.title}&apos;
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
        <Underlay onClick={toggleDeleteTaskCloseHandler} />
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
