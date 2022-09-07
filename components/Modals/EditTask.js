//react/next
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

//JSX
import Dropdown from "../UI/Dropdown";
import ButtonSecondary from "../UI/ButtonSecondary";
import ButtonPrimary from "../UI/ButtonPrimary";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectEditTaskIsVisible,
  toggleEditTaskClose,
} from "../../store/uiSlice";

//reacthookform
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import taskValidation from "../../validation/taskValidation";

//react-query
import { useCurrentBoard } from "../../hooks/useQuery";
import { useEditTask, useStatusChange } from "../../hooks/useMutationTask";
import Underlay from "./Underlay";

export default function EditTask() {
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

  const { mutate: mutateEditTask } = useEditTask();
  const { mutate: mutateStatusChange } = useStatusChange();

  const [isBrowser, setIsBrowser] = useState(false);
  const [status, setStatus] = useState(columnData?.name);

  const editTaskOpen = useSelector(selectEditTaskIsVisible);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(taskValidation),
    mode: "all",
    defaultValues: {
      subtasks: [{ task: "" }, { task: "" }],
    },
  });

  const {
    fields: subtaskFields,
    append: subtaskAppend,
    remove: subtaskRemove,
    replace,
  } = useFieldArray({ control, name: "subtasks" });

  useEffect(() => {
    setIsBrowser(true);
    setStatus(columnData?.name);
  }, [columnData]);

  useEffect(() => {
    setValue("title", taskData?.title);
    setValue("description", taskData?.description);
    const subtaskArr = taskData?.subtasks.map((task) => ({ task: task.title }));
    replace(subtaskArr);
  }, [taskData, replace, setValue]);

  const toggleEditTaskCloseHandler = () => {
    //close the modal
    dispatch(toggleEditTaskClose());
  };

  const onSubmit = (data) => {
    //add status to the submitted data object (from Dropdown custom component)
    data.status = status;

    //append isCompleted form data by comparing with json data. any new subtasks are categorized as incomplete by default
    data.subtasks = data.subtasks.map((item) => {
      const subtaskArr = taskData.subtasks.map((task) => ({
        task: task.title,
        isCompleted: task.isCompleted,
      }));

      const existingTask = subtaskArr.find(
        (subtask) => subtask.task === item.task && subtask.isCompleted === true
      );

      if (existingTask) {
        return { title: item.task, isCompleted: true };
      } else {
        return { title: item.task, isCompleted: false };
      }
    });

    data.boardId = router.query.board;
    data.colId = router.query.column;
    data.taskId = router.query.task;

    //api requests
    mutateEditTask(data);
    if (status !== columnData.name) {
      const colTo = currentBoard?.columns.find(
        (column) => column.name === status
      );

      data.colToId = colTo._id;
      mutateStatusChange(data);
    }

    //close the modal
    dispatch(toggleEditTaskClose());
  };

  const modalContent = (
    <AnimatePresence>
      {editTaskOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='absolute top-1/2 left-4 right-4 z-50 mx-auto max-w-[480px] -translate-y-1/2 rounded-md bg-white p-6 pb-8 transition-colors ease-in-out dark:bg-grey_dark'
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Edit Task</h2>
            <div className='mt-6'>
              <label htmlFor='title'>
                <p className='bodyM text-grey_medium'>Title</p>
              </label>
              <div className='relative'>
                <input
                  type='text'
                  {...register("title")}
                  className={`mt-2 ${
                    errors.title
                      ? `ring-red_main `
                      : `ring-grey_medium/25 focus:ring-purple_main`
                  }`}
                  placeholder='eg. Take coffee break'
                />
                {errors.title && (
                  <p className='bodyL absolute top-[17px] right-4 text-red_main'>
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>
            <div className='mt-6'>
              <label htmlFor='description'>
                <p className='bodyM text-grey_medium'>Description</p>
              </label>
              <textarea
                type='text'
                {...register("description")}
                className='mt-2'
                rows={3}
                placeholder="e.g. It's always good to take a break. This 15 minute break will charge the batteries a little."
              />
            </div>

            <div>
              <div className='relative mt-6 flex justify-between'>
                <label htmlFor='subtasks'>
                  <p className='bodyM text-grey_medium'>Subtasks</p>
                </label>
                {errors.subtasks && (
                  <p className='bodyM font-normal text-red_main'>
                    {errors.subtasks.message}
                  </p>
                )}
              </div>

              <div className='mb-3'>
                {subtaskFields.map((item, index) => {
                  return (
                    <div key={item.id} className='mt-3 '>
                      <div className='relative flex items-center'>
                        <input
                          {...register(`subtasks.${index}.task`)}
                          placeholder='eg. Make coffee'
                          className={`mr-4 w-full ${
                            errors.subtasks?.[index]
                              ? `ring-red_main `
                              : `ring-grey_medium/25 focus:ring-purple_main`
                          }`}
                        />

                        <button
                          type='button'
                          onClick={() => subtaskRemove(index)}
                        >
                          <svg
                            width='15'
                            height='15'
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-[15px] w-[15px] cursor-pointer fill-current text-[#828FA3]'
                          >
                            <g fillRule='evenodd'>
                              <path d='m12.728 0 2.122 2.122L2.122 14.85 0 12.728z' />
                              <path d='M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z' />
                            </g>
                          </svg>
                        </button>
                        {errors.subtasks?.[index] && (
                          <p className='bodyL absolute right-[47px] text-red_main'>
                            {errors.subtasks?.[index].task.message}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* + Add new requirement Button  */}
              <ButtonSecondary
                onClick={() => {
                  subtaskAppend({ task: "" });
                }}
              >
                + Add New Subtask
              </ButtonSecondary>
            </div>

            <Dropdown
              boardData={currentBoard}
              setStatus={setStatus}
              status={status}
            />

            <div className='mt-6'>
              <ButtonPrimary submit>Save Changes</ButtonPrimary>
            </div>
          </form>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  const underlayContent = (
    <AnimatePresence>
      {editTaskOpen ? <Underlay onClick={toggleEditTaskCloseHandler} /> : null}
    </AnimatePresence>
  );

  if (isBrowser) {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          underlayContent,
          document.getElementById("editTask-root")
        )}
        {ReactDOM.createPortal(
          modalContent,
          document.getElementById("editTask-root")
        )}
      </React.Fragment>
    );
  } else {
    return null;
  }
}
