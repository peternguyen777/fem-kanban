//Next JSX
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import BoardEmpty from "../../components/UI/BoardEmpty";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectMenuDesktopIsVisible,
  toggleViewTask,
  toggleEditBoard,
} from "../../store/uiSlice";
import { setCurrentTask } from "../../store/boardSlice";

//react-query

import { useCurrentBoard } from "../../hooks/useCurrentBoard";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const menuDesktopOpen = useSelector(selectMenuDesktopIsVisible);

  const {
    data: currentBoard,
    isLoading,
    error,
  } = useCurrentBoard(router.query.board);

  const viewTaskHandler = (taskTitle, columnName) => {
    const columnData = currentBoard?.columns.find(
      (column) => column.name === columnName
    );
    const taskData = columnData.tasks.find((task) => task.title === taskTitle);
    dispatch(setCurrentTask(taskData));
    dispatch(toggleViewTask());
  };

  const editBoardHandler = () => {
    dispatch(toggleEditBoard());
  };

  return (
    <div
      className={`absolute h-[calc(100vh-64px)] ${
        menuDesktopOpen && `md:w-[calc(100vw-261px)] lg:w-[calc(100vw-301px)]`
      } w-screen snap-x snap-mandatory scroll-pl-4 overflow-scroll px-4 pt-6 pb-[70px] md:h-[calc(100vh-81px)] md:scroll-pl-6 md:px-6 lg:h-[calc(100vh-97px)]`}
    >
      <Head>
        <title>Kanban</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/assets/logo-mobile.svg' />
      </Head>

      {currentBoard?.columns.length === 0 ? (
        <BoardEmpty />
      ) : (
        <div className='flex space-x-6 '>
          {currentBoard?.columns.map((item, i) => (
            <div key={i} className=' w-[280px] flex-none snap-start'>
              <div className='flex'>
                <div
                  className={`mr-3 h-[15px] w-[15px] rounded-full bg-[${item?.color}]`}
                />

                <h4 className='uppercase'>
                  {item.name} ({item.tasks?.length})
                </h4>
              </div>
              <ul className='mt-6 space-y-5'>
                {item.tasks?.map((task, j) => {
                  var completedTasks = 0;
                  task.subtasks.forEach((item) => {
                    if (item.isCompleted) {
                      completedTasks++;
                    }
                  });

                  return (
                    <div
                      key={j}
                      onClick={() => {
                        viewTaskHandler(task.title, item.name);
                      }}
                      className='cursor-pointer select-none rounded-lg bg-white px-4 py-6 shadow-md dark:bg-grey_dark'
                    >
                      <h3>{task.title}</h3>
                      <p className='bodyM mt-2 text-grey_medium'>
                        {completedTasks} of {task.subtasks.length} subtasks
                      </p>
                    </div>
                  );
                })}
              </ul>
            </div>
          ))}
          <div className='mt-[39px] h-auto w-[296px] flex-none snap-start md:w-[304px] '>
            <div
              className='grid h-full w-[280px] cursor-pointer items-center rounded-md bg-[#E9EFFA] text-center dark:bg-grey_dark'
              onClick={editBoardHandler}
            >
              <h1 className='select-none text-grey_medium hover:text-purple_main'>
                + New Column
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
