import Head from "next/head";
import BoardEmpty from "../components/UI/BoardEmpty";
import kanbanData from "../public/data.json";
import { useSelector } from "react-redux";
import { selectMenuIsVisible } from "../store/uiSlice";
import { selectCurrentBoard } from "../store/boardSlice";

export default function Home() {
  const menuOpen = useSelector(selectMenuIsVisible);
  const currentBoardId = useSelector(selectCurrentBoard);
  const boardData = kanbanData.boards.find(
    (board) => board.id === currentBoardId
  );

  console.log(boardData.columns);
  return (
    <div
      className={`${
        menuOpen
          ? `translate-x-0`
          : `sm:w-[calc(100%_+_260px)] sm:-translate-x-[260px] lg:w-[calc(100%_+_300px)] lg:-translate-x-[300px]`
      }   h-screen transition duration-100`}
    >
      <Head>
        <title>Kanban</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/assets/logo-mobile.svg' />
      </Head>
      {/* fix overflow scroll and screen size */}
      <main className='h-screen overflow-x-scroll overflow-y-scroll'>
        {kanbanData.boards.length === 0 && <BoardEmpty />}

        <div className='mt-[88px] ml-4 flex space-x-6 sm:mt-[104px] sm:ml-6'>
          {boardData.columns.map((item, i) => (
            <div key={i} className='w-[280px] flex-none'>
              <div className='flex'>
                <div className='mr-3 h-[15px] w-[15px] rounded-full bg-[#49C4E5]' />
                <h4 className='uppercase'>
                  {item.name} ({item.tasks.length})
                </h4>
              </div>
              <ul className='mt-6 space-y-5'>
                {item.tasks.map((task, j) => {
                  var completedTasks = 0;
                  task.subtasks.filter((item) => {
                    if (item.isCompleted) {
                      completedTasks++;
                    }
                  });

                  return (
                    <div
                      key={j}
                      className='rounded-lg bg-white px-4 py-6 shadow-md dark:bg-grey_dark'
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
        </div>
      </main>
    </div>
  );
}
