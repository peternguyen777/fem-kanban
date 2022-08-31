import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAddBoardIsVisible,
  toggleAddBoardClose,
} from "../../store/uiSlice";

//reacthookform
import { useForm, useFieldArray } from "react-hook-form";
import ButtonSecondary from "../UI/ButtonSecondary";
import ButtonPrimary from "../UI/ButtonPrimary";

export default function AddBoard() {
  const [isBrowser, setIsBrowser] = useState(false);

  const dispatch = useDispatch();
  const addBoardOpen = useSelector(selectAddBoardIsVisible);

  const { register, control, handleSubmit, reset, formState } = useForm({
    mode: "all",
    defaultValues: {
      columns: [{ name: "" }, { name: "" }],
    },
  });

  const { errors } = formState;

  const {
    fields: colFields,
    append: colAppend,
    remove: colRemove,
  } = useFieldArray({ control, name: "columns" });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const toggleAddBoardHandler = () => {
    dispatch(toggleAddBoardClose());
  };

  const onSubmit = async (data) => {
    data.columns = data.columns.filter((str) => str.name.trim() !== "");
    reset();
    dispatch(toggleAddBoardClose());

    const response = await fetch("/api/board/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ createBoard: data }),
    });
    const resData = await response.json();
    return resData.createBoard;
  };

  const modalContent = (
    <AnimatePresence>
      {addBoardOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='absolute top-1/2 left-4 right-4 z-50 mx-auto max-w-[480px] -translate-y-1/2 rounded-md bg-white p-6 transition-colors ease-in-out dark:bg-grey_dark md:p-8'
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Add New Board</h2>
            <div className='mt-6'>
              <label htmlFor='name'>
                <p className='bodyM text-grey_medium'>Name</p>
              </label>
              <div className='relative'>
                <input
                  type='text'
                  {...register("name", { required: "Can't be empty" })}
                  className={`mt-2 ${
                    errors.name
                      ? `ring-red_main `
                      : `ring-grey_medium/25 focus:ring-purple_main`
                  }`}
                  placeholder='eg. Web Design'
                />
                {errors.name && (
                  <p className='bodyL absolute top-[17px] right-4 text-red_main'>
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className='relative mt-6 flex justify-between'>
                <label htmlFor='columns'>
                  <p className='bodyM text-grey_medium'>Columns</p>
                </label>
              </div>

              <div className='mb-3'>
                {colFields.map((item, index) => {
                  return (
                    <div key={item.id} className='mt-3 flex items-center'>
                      <input
                        {...register(`columns.${index}.name`)}
                        placeholder='eg. Todo'
                        className='mr-4 w-full ring-grey_medium/25'
                      />

                      <button type='button' onClick={() => colRemove(index)}>
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
                    </div>
                  );
                })}
              </div>

              {/* + Add new requirement Button  */}
              <ButtonSecondary
                onClick={(e) => {
                  e.preventDefault();
                  colAppend({ name: "" });
                }}
              >
                + Add New Column
              </ButtonSecondary>
            </div>

            <div className='mt-6'>
              <ButtonPrimary submit>Create New Board</ButtonPrimary>
            </div>
          </form>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  const underlayContent = (
    <AnimatePresence>
      {addBoardOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='absolute top-0 z-20 h-full w-full bg-[#000000] opacity-50'
          onClick={toggleAddBoardHandler}
        ></motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (isBrowser) {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          underlayContent,
          document.getElementById("addBoard-root")
        )}
        {ReactDOM.createPortal(
          modalContent,
          document.getElementById("addBoard-root")
        )}
      </React.Fragment>
    );
  } else {
    return null;
  }
}
