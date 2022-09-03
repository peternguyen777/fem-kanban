import { useMutation, useQueryClient } from "react-query";

const addTask = async (taskData) => {
  const response = await fetch("/api/task/addTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();
  return data;
};

const subtaskClick = async (subtaskData) => {
  const response = await fetch("/api/task/subtaskClick", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subtaskData),
  });

  const data = await response.json();
  return data;
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentBoard");
    },
  });
};

export const useSubtaskClick = () => {
  const queryClient = useQueryClient();

  return useMutation(subtaskClick, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentBoard");
    },
  });
};
