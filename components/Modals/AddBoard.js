import React, { useState, useEffect } from "react";
import kanbanData from "../../public/data.json";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAddBoardIsVisible,
  toggleAddBoardClose,
} from "../../store/uiSlice";
import { selectCurrentBoard, selectCurrentTask } from "../../store/boardSlice";
import Dropdown from "../UI/Dropdown";

//reacthookform
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonSecondary from "../UI/ButtonSecondary";
import ButtonPrimary from "../UI/ButtonPrimary";

export default function AddBoard() {
  const [isBrowser, setIsBrowser] = useState(false);

  const dispatch = useDispatch();
  const addBoardOpen = useSelector(selectAddBoardIsVisible);

  const { register, control, handleSubmit, reset, getValues, formState } =
    useForm({
      // resolver: yupResolver(PostJobValidation),
      mode: "all",
      defaultValues: {
        reqItems: [{ items: "" }, { items: "" }],
      },
    });

  const { errors, isValid } = formState;

  const {
    fields: reqFields,
    append: reqAppend,
    remove: reqRemove,
  } = useFieldArray({ control, name: "reqItems" });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const toggleAddBoardHandler = () => {
    dispatch(toggleAddBoardClose());
  };

  const setSubtaskCompleteHandler = () => {
    //change subtask complete
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
          className='absolute top-1/2 left-4 right-4 z-50 mx-auto max-w-[480px] -translate-y-1/2 rounded-md bg-white p-6 pb-8 transition-colors ease-in-out dark:bg-grey_dark'
        >
          <form>
            <h2>Add New Board</h2>
            <div className='mt-6'>
              <label htmlFor='name'>
                <p className='bodyM text-grey_medium'>Name</p>
              </label>
              <input
                type='text'
                name='name'
                className='mt-2'
                placeholder='eg. Web Design'
              />
            </div>

            <div>
              <div className='relative mt-6 flex justify-between'>
                <label htmlFor='columns'>
                  <p className='bodyM text-grey_medium'>Columns</p>
                </label>
                {errors.reqItems && (
                  <h6 className='hidden sm:inline-block '>
                    {errors.reqItems.message}
                  </h6>
                )}
              </div>

              <div className='mb-3'>
                {reqFields.map((item, index) => {
                  return (
                    <div key={item.id} className='mt-3 flex items-center'>
                      <input
                        {...register(`reqItems.${index}.items`)}
                        placeholder='eg. Todo'
                        className='mr-4 w-full'
                      />

                      <button type='button' onClick={() => reqRemove(index)}>
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
                  reqAppend({ items: "" });
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