import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
  const data = await response.json();
  return data;
};

export const useAddBoard = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(addBoard, {
    onSuccess: (newBoard) => {
      queryClient.invalidateQueries();
      router.push(`/public/${newBoard.createBoard.insertedId}`);
    },
  });
};

export const useEditBoard = () => {
  const queryClient = useQueryClient();

  return useMutation(editBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries();
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
