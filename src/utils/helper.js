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

export function usePin(post) {

  
  const { currUser } = useAuth();
  const pinsRef = ref.child("users").child(currUser.uid).child("pins");

  const [isPinned, setIsPinned] = useState();
  const [pins, setPins] = useState([]);

  useEffect(() => {
    if (!post) {
      //get all pins
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
      // check if pinned
      const postId = post.postId;
      pinsRef.child(postId).on("value", async (snapshot) => {
        if (!snapshot.exists()) {
          setIsPinned(false);
        } else {
          setIsPinned(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (post) {
      if (isPinned != undefined) {
        if (isPinned) {
          pinsRef.child(post.postId).set(post);
        } else {
          //user has unpinned
          pinsRef.child(post.postId).remove();
        }
      }
    }
  }, [isPinned]);

  function togglePin() {
    setIsPinned(!isPinned);
  }

  return { isPinned: isPinned, togglePin: togglePin, pins: pins };
}
