import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "react-query";

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

const addBoard = async (boardData) => {
  const response = await fetch("/api/board/addBoard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ createBoard: boardData }),
  });
  const data = await response.json();

  return data;
};

const editBoard = async (boardData) => {
  const response = await fetch("/api/board/editBoard", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ editBoard: boardData }),
  });
  const data = await response.json();

  return data;
};

const deleteBoard = async (id) => {
  const response = await fetch("/api/board/deleteBoard", {
    method: "DELETE",
    body: JSON.stringify(id),
  });
  const data = await response.json();
  return data;
};

export const useFetchAllBoards = () => {
  return useQuery("allBoards", fetchAllBoards);
};

export const useCurrentBoard = (id) => {
  return useQuery(["currentBoard", id], fetchCurrentBoard);
};

export const useAddBoard = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(addBoard, {
    onSuccess: (newBoard) => {
      queryClient.invalidateQueries("allBoards");
      console.log("newBoard", newBoard);
      router.push(`/public/${newBoard.createBoard.insertedId}`);
    },
  });
};

export const useEditBoard = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(editBoard, {
    onSuccess: (newBoard) => {
      queryClient.invalidateQueries("allBoards");
      console.log("newBoard", newBoard);
      router.push(`/public/${newBoard.createBoard.insertedId}`);
    },
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("allBoards");
    },
  });
};
