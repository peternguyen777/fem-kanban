import React, { useState, useEffect } from "react";
import kanbanData from "../../public/data.json";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectEditTaskIsVisible,
  toggleEditTaskClose,
} from "../../store/uiSlice";
import { selectCurrentBoard, selectCurrentTask } from "../../store/boardSlice";
import Dropdown from "../UI/Dropdown";

//reacthookform
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import taskValidation from "../../validation/taskValidation";
import ButtonSecondary from "../UI/ButtonSecondary";
import ButtonPrimary from "../UI/ButtonPrimary";

export default function EditTask() {
  const currentBoardId = useSelector(selectCurrentBoard);
  const boardData = kanbanData.boards.find(
    (board) => board.id === currentBoardId
  );
  const taskData = useSelector(selectCurrentTask);

  const [isBrowser, setIsBrowser] = useState(false);
  const [status, setStatus] = useState(taskData?.status);

  const dispatch = useDispatch();
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
  }, []);

  useEffect(() => {
    setValue("title", taskData.title);
    setValue("description", taskData.description);
    setStatus(taskData.status);
    const subtaskArr = taskData.subtasks?.map((task) => ({ task: task.title }));
    replace(subtaskArr);
  }, [taskData]);

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
        return { task: item.task, isCompleted: true };
      } else {
        return { task: item.task, isCompleted: false };
      }
    });

    //close the modal
    dispatch(toggleEditTaskClose());

    console.log(data);
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
              boardData={boardData}
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
      {editTaskOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='absolute top-0 z-20 h-full w-full bg-[#000000] opacity-50'
          onClick={toggleEditTaskCloseHandler}
        ></motion.div>
      ) : null}
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
