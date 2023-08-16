import { APIResults, User } from "@/types";
const apiFetch = async ():Promise<User[]> => {
const response = await fetch('https://randomuser.me/api/?results=100')
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json() as APIResults;
  return data.results;
}

export default apiFetch;