import { useAuth } from "../contexts/AuthContext.js";
import { ref } from "../config/firebase.js";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export function useEditRights(uid) {
  const { currUser } = useAuth();
  return uid === currUser.uid;
}

export function useTime() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const hour = today.getHours();
  const min = String(today.getMinutes()).padStart(2, "0");

  return `${date}/${month}/${year}, ${hour}:${min}`;
}

export function formatDate(rawDate, verbose = false, withTime = false) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Decs",
  ];
  const date = rawDate.getDate();
  const month = rawDate.getMonth();
  const year = rawDate.getFullYear();
  const day = rawDate.getDay();

  const hour = String(rawDate.getHours()).padStart(2, "0");
  const minute = String(rawDate.getMinutes()).padStart(2, "0");

  var formattedDate = "";
  var formattedTime = "";

  if (verbose) {
    formattedDate = `${days[day]}, ${date}/${months[month]}/${year}`;
  } else {
    formattedDate = `${date}/${month + 1}/${year}`;
  }

  if (withTime) {
    formattedTime = `${hour}:${minute}`;
    return `${formattedDate}, ${formattedTime}`;
  } else {
    return formattedDate;
  }

  return;
}

export function usePin(postId) {
  const { currUser } = useAuth();
  const pinsRef = ref.child("users").child(currUser.uid).child("pins");

  const [isPinned, setIsPinned] = useState();
  const [pins, setPins] = useState([]);

  useEffect(() => {
    if (!postId) {
      //get all pins, which is an array of post Ids
      pinsRef.on("value", async (snapshot) => {
        if (snapshot.exists()) {
          const tmp = Object.keys(await snapshot.val());
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
  });

  return {
    username: username,
    bio: bio,
    major: major,
    photoURL: photoURL,
  };
}

export function useSuccess() {
  const [success, setSuccess] = useState("");
  const toast = useToast();

  if (success) {
    toast({
      description: success,
      status: "success",
      duration: 10000,
      isClosable: true,
    });
    setSuccess("");
  }

  return { setSuccess: setSuccess };
}

export function useError() {
  const [error, setError] = useState("");
  const toast = useToast();
  if (error) {
    toast({
      description: error,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    setError("");
  }

  return { setError: setError };
}

export function useSuccessToast(message) {
  const toast = useToast();
  return toast({
    description: message,
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top",
  });
}

export function useUserModules(uid) {
  const userModulesRef = ref.child(`users/${uid}/modules`);

  const [modules, setModules] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    userModulesRef.on("value", (snapshot) => {
      const tmp = [];
      const data = snapshot.val();
      for (const k in data) {
        tmp.push({ moduleCode: k, title: data[k] });
      }
      setModules(tmp);
    });
  }, []);

  function addModule(module) {
    if (modules.includes(module.moduleCode)) {
      setError("Module already exists!");
    } else {
      userModulesRef.child(module.moduleCode).set(module.title);
    }
  }

  function removeModule(moduleCode) {
    userModulesRef.child(moduleCode).remove();
  }

  return {
    modules: modules,
    addModule: addModule,
    removeModule: removeModule,
    error: error,
  };
}

export function useMembership(groupId) {
  const { currUser } = useAuth();
  const userGroupRef = ref.child(`users/${currUser.uid}/groups/${groupId}`);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    userGroupRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        setIsMember(true);
      } else {
        setIsMember(false);
      }
    });
  }, [groupId]);

  return isMember;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
