import {
  VStack,
  Text,
  Avatar,
  HStack,
  Flex,
  Box,
  Heading,
} from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../layout/Loader";
import UserAttributes from "../ProfilePage/UserAttributes";
import UserPosts from "../ProfilePage/UserPosts";
import UserModules from "../ProfilePage/UserModules";
import ProfilePage from "../ProfilePage";

function UsersProfile() {
  const { username } = useParams();
  console.log(username);
  const [userData, setUserData] = useState();
  const [uid, setUid] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    ref
      .child("usernames")
      .child(username)
      .once("value", async (snapshot) => {
        if (!snapshot.exists()) {
          navigate("/dne");
        }
        const data = await snapshot.val();
        setUid(data);
        ref
          .child("users")
          .child(data)
          .child("profile")
          .once("value", (snapshot) => {
            setUserData(snapshot.val());
          });
      });
  }, [username]);

  return userData == undefined || username == undefined ? (
    <Loader />
  ) : (
    <ProfilePage />
  );
}

export default UsersProfile;
