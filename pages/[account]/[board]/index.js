//Next/React
import Head from "next/head";
import { useRouter } from "next/router";

//JSX
import BoardEmpty from "../../../components/UI/BoardEmpty";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectMenuDesktopIsVisible,
  toggleViewTask,
  toggleEditBoard,
} from "../../../store/uiSlice";

//react-query
import { useCurrentBoard } from "../../../hooks/useQuery";
import { useDndBoard } from "../../../hooks/useMutation";

//react beautiful dnd
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { setColumns, selectColumns } from "../../../store/boardSlice";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const menuDesktopOpen = useSelector(selectMenuDesktopIsVisible);
  const columns = useSelector(selectColumns);

  const {
    data: currentBoard,
    isLoading,
    error,
  } = useCurrentBoard(router.query.board);

  const { mutate } = useDndBoard();

  useEffect(() => {
    dispatch(setColumns(currentBoard?.columns));
  }, [currentBoard, dispatch]);

  useEffect(() => {
    let newBoard = { ...currentBoard };
    newBoard.columns = columns;

    mutate(newBoard);
  }, [columns, mutate]);

  const editBoardHandler = () => {
    dispatch(toggleEditBoard());
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const newColumns = [...columns];
      const sourceColumn = newColumns.find(
        (column) => column._id === source.droppableId
      );
      const destColumn = newColumns.find(
        (column) => column._id === destination.droppableId
      );
      const sourceTasks = [...sourceColumn.tasks];
      const destTasks = [...destColumn.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      const updatedSourceColumn = { ...sourceColumn };
      const updatedDestColumn = { ...destColumn };

      updatedSourceColumn.tasks = sourceTasks;
      updatedDestColumn.tasks = destTasks;

      const sourceIndex = newColumns.findIndex(
        (column) => column._id === source.droppableId
      );
      const destIndex = newColumns.findIndex(
        (column) => column._id === destination.droppableId
      );
      newColumns[sourceIndex] = updatedSourceColumn;
      newColumns[destIndex] = updatedDestColumn;

      dispatch(setColumns(newColumns));
    } else {
      const newColumns = [...columns];
      const column = newColumns.find(
        (column) => column._id === source.droppableId
      );

      const copiedTasks = [...column.tasks];
      const [removed] = copiedTasks.splice(source.index, 1);
      copiedTasks.splice(destination.index, 0, removed);

      const updatedColumn = { ...column };
      updatedColumn.tasks = copiedTasks;
      const indexToUpdate = newColumns.findIndex(
        (column) => column._id === source.droppableId
      );

      newColumns[indexToUpdate] = updatedColumn;
      dispatch(setColumns(newColumns));
    }
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
      {isLoading ? (
        <div className='mt-[106px] flex justify-center md:mt-[84px] lg:mt-[84px]'>
          <LoadingSpinner />
        </div>
      ) : currentBoard?.columns?.length === 0 ? (
        <BoardEmpty />
      ) : (
        <div className='flex space-x-6 '>
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {columns?.map((column) => (
              <div key={column._id} className=' w-[280px] flex-none snap-start'>
                <div className='flex'>
                  <div
                    className={`mr-3 h-[15px] w-[15px] rounded-full`}
                    style={{ backgroundColor: column?.color }}
                  />

                  <h4 className='uppercase'>
                    {column.name} ({column.tasks?.length || 0})
                  </h4>
                </div>
                <Droppable droppableId={column._id} key={column._id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='mt-6'
                      >
                        {column.tasks.map((task, index) => {
                          var completedTasks = 0;
                          task?.subtasks.forEach((item) => {
                            if (item.isCompleted) {
                              completedTasks++;
                            }
                          });

                          return (
                            <Draggable
                              key={task._id}
                              draggableId={task._id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      margin: "0 0 20px 0",
                                      ...provided.draggableProps.style,
                                    }}
                                    className={`${
                                      snapshot.isDragging &&
                                      `ring-2 ring-purple_main`
                                    } cursor-pointer select-none rounded-lg bg-white px-4 py-6 shadow-md dark:bg-grey_dark`}
                                    onClick={() => {
                                      dispatch(toggleViewTask());
                                      router.push(
                                        `/public/${currentBoard._id}/?column=${column._id}&task=${task._id}`
                                      );
                                    }}
                                  >
                                    <h3>{task.title}</h3>
                                    <p className='bodyM mt-2 text-grey_medium'>
                                      {completedTasks} of {task.subtasks.length}{" "}
                                      subtasks
                                    </p>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            ))}
          </DragDropContext>
          <div className='mt-[39px] h-auto w-[296px] flex-none snap-start md:w-[304px] '>
            <div
              className='grid h-[calc(100%-20px)] min-h-[300px] w-[280px] cursor-pointer items-center rounded-md bg-[#E9EFFA] text-center dark:bg-grey_dark'
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
