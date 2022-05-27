import { useAuth } from "../contexts/AuthContext.js";
import { ref } from "../config/firebase.js";
import { useEffect, useState } from "react";
import { storageRef } from "../config/firebase.js";

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

export function useProfile(user) {
  const uid = user.uid;
  const userRef = ref.child(`users/${uid}/profile`);
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const [major, setMajor] = useState();
  const [photoURL, setPhotoURL] = useState();
  const [photo, setPhoto] = useState();
  const [photoUpdated, setPhotoUpdated] = useState(false);

  useEffect(() => {
    userRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setUsername(data.username);
      setBio(data.bio);
      setMajor(data.major);
      setPhotoURL(data.photoURL);
    });
  }, []);

  useEffect(() => {
    if (photo != undefined) {
      const imgURL = URL.createObjectURL(photo);
      setPhotoURL(imgURL);
      setPhotoUpdated(true);
    }
  }, [photo]);

  async function saveEdits() {
    console.log(photoURL);
    await userRef.update({
      username: username,
      bio: bio,
      major: major,
    });

    if (photoUpdated) {
      await storageRef
        .child(`${user.uid}/profile`)
        .put(photo)
        .then((snapshot) => {
          storageRef
            .child(`${user.uid}/profile`)
            .getDownloadURL()
            .then((url) => {
              user.updateProfile({
                displayName: username,
                photoURL: url,
              });
              setPhotoUpdated(false);
            });
        });
    }
  }
  const userAttributes = {
    username: username,
    bio: bio,
    major: major,
    photoURL: photoURL,
    setUsername: setUsername,
    setBio: setBio,
    setMajor: setMajor,
    setPhotoURL: setPhotoURL,
    setPhoto: setPhoto,
    saveEdits: saveEdits,
  };

  return userAttributes;
}
