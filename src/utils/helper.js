import { useAuth } from "../contexts/AuthContext.js";
import { ref } from "../config/firebase.js";
import { useEffect, useState } from "react";
import { storageRef } from "../config/firebase.js";

export function useEditRights(uid) {
  const { currUser } = useAuth();
  return uid == currUser.uid;
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

export function usePin(postId) {
  const { currUser } = useAuth();
  const pinsRef = ref.child("users").child(currUser.uid).child("pins");

  const [isPinned, setIsPinned] = useState();
  const [pins, setPins] = useState([]);

  useEffect(() => {
    if (!postId) {
      //get all pins, which is an array of post Ids
      pinsRef.orderByKey().on("value", async (snapshot) => {
        if (snapshot.exists()) {
          const tmp = Object.keys(await snapshot.val())
          tmp.reverse();
          setPins(tmp);
        }
      });
    } else {
      // check if pinned
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
    if (postId) {
      if (isPinned != undefined) {
        if (isPinned) {
          pinsRef.child(postId).set(true);
        } else {
          //user has unpinned
          pinsRef.child(postId).remove();
        }
      }
    }
  }, [isPinned]);

  function togglePin() {
    setIsPinned(!isPinned);
  }

  return { isPinned: isPinned, togglePin: togglePin, pins: pins };
}

export function useProfile(uid) {
  const userRef = ref.child(`users/${uid}/profile`);
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const [major, setMajor] = useState();
  const [photoURL, setPhotoURL] = useState();
 
  useEffect(() => {
    userRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setUsername(data.username);
      setBio(data.bio);
      setMajor(data.major);
      setPhotoURL(data.photoURL);
    });
  }, []);

  const userAttributes = {
    username: username,
    bio: bio,
    major: major,
    photoURL: photoURL,
  };

  return userAttributes;
}
