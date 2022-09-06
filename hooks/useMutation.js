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
    onMutate: (newData) => {
      queryClient.cancelQueries("allBoards");
      const current = queryClient.getQueryData("allBoards");
      queryClient.setQueryData("allBoards", (prev) => [
        ...prev,
        { name: newData.name, _id: new Date().toISOString() },
      ]);

      return current;
    },
    onError: (error, newData, rollback) => rollback(),
    onSettled: (newBoard) => {
      queryClient.invalidateQueries("allBoards");
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
    // onSuccess: () => {
    //   queryClient.invalidateQueries("allBoards");
    // },
    onMutate: (newData) => {
      queryClient.cancelQueries("allBoards");
      const current = queryClient.getQueryData("allBoards");
      queryClient.setQueryData("allBoards", (prev) =>
        prev.filter((item) => item._id !== newData)
      );

      return current;
    },
    onError: (error, newData, rollback) => rollback(),
    onSettled: () => {
      queryClient.invalidateQueries("allBoards");
    },
  });
};
