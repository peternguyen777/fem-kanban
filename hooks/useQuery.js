import { useQuery } from "react-query";

const fetchAllBoards = async () => {
  const response = await fetch("/api/board/allBoards");
  const { allBoards } = await response.json();
  return allBoards;
};

const fetchCurrentBoard = async (key) => {
  const id = await key.queryKey[1];
  const response = await fetch(`/api/board/${id}`);
  const { currentBoard } = await response.json();
  return currentBoard;
};

export const useFetchAllBoards = () => {
  return useQuery("allBoards", fetchAllBoards, {
    // refetchOnWindowFocus: false,
  });
};

export const useCurrentBoard = (id) => {
  return useQuery(["currentBoard", id], fetchCurrentBoard, {
    // refetchOnWindowFocus: false,
  });
};
