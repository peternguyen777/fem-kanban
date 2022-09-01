import { useQuery } from "react-query";

const fetchCurrentBoard = async (key) => {
  const slug = await key.queryKey[1];
  const response = await fetch(`/api/board/${slug}`);
  const { currentBoard } = await response.json();
  return currentBoard;
};

export const useCurrentBoard = (slug) => {
  return useQuery(["currentBoard", slug], fetchCurrentBoard);
};
