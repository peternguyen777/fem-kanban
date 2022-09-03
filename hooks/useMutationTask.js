import { useMutation, useQueryClient } from "react-query";

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

export const useSubtaskClick = () => {
  const queryClient = useQueryClient();

  return useMutation(subtaskClick, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentBoard");
    },
  });
};
