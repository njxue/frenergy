import { useAuth } from "../contexts/AuthContext.js";
import { ref } from "../config/firebase.js";
import { useEffect, useState } from "react";

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

export function usePin(threadId) {
  const { currUser } = useAuth();
  const pinsRef = ref.child("users").child(currUser.uid).child("pins");

  const [isPinned, setIsPinned] = useState();
  const [pins, setPins] = useState([]);

  useEffect(() => {
    if (!threadId) {
      pinsRef.on("value", async (snapshot) => {
        if (snapshot.exists()) {
          const tmp = [];
          const val = await snapshot.val();
          for (const k in val) {
            tmp.push(val[k]);
          }
          setPins(tmp);
        }
      });
    } else {
      pinsRef.child(threadId).on("value", async (snapshot) => {
        if (!snapshot.exists()) {
          setIsPinned(false);
        } else {
          setIsPinned(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (threadId) {
      const postRef = ref.child("threads").child(threadId).child("post");
      if (isPinned != undefined && threadId) {
        if (isPinned) {
          postRef.once("value", (snapshot) => {
            const post = snapshot.val();
            pinsRef.child(threadId).set(post);
          });
        } else {
          //user has unpinned
          pinsRef.child(threadId).remove();
        }
      }
    }
  }, [isPinned]);

  function togglePin() {
    setIsPinned(!isPinned);
  }

  return { isPinned: isPinned, togglePin: togglePin, pins: pins };
}
