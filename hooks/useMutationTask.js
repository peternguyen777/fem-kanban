import { useMutation, useQueryClient } from "react-query";

const addTask = async (taskData) => {
  const response = await fetch("/api/task/addTask", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();
  return data;
};

const deleteTask = async (id) => {
  const response = await fetch("/api/task/deleteTask", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
  const data = await response.json();
  return data;
};

const editTask = async (editTaskData) => {
  const response = await fetch("/api/task/editTask", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editTaskData),
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

const statusChange = async (statusChangeData) => {
  const response = await fetch("/api/task/statusChange", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(statusChangeData),
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

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentBoard");
    },
  });
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation(editTask, {
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

export const useStatusChange = () => {
  const queryClient = useQueryClient();

  return useMutation(statusChange, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentBoard");
    },
  });
};
