import { useAuth } from "../contexts/AuthContext.js";
export function useEditRights(owner) {
  const { currUser } = useAuth();
  return owner.uid == currUser.uid;
}

export function useTime() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const hour = today.getHours();
  const min = today.getMinutes();

  return `${date}/${month}/${year}, ${hour}:${min}`;
}
