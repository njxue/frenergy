import { useAuth } from "../contexts/AuthContext.js";
export function useEditRights(owner) {
    const {currUser} = useAuth();
    return owner.uid == currUser.uid;
}