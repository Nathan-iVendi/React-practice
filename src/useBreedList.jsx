import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList.jsx";

export default function useBreedList(animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);
  return [results?.data?.breeds ?? [], results.status]; // Give the array or an empty array if no results
}
