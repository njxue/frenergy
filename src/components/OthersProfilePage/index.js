import { ref } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../layout/Loader";
import Profile from "../ProfilePage";

function UsersProfile() {
  const { username } = useParams();

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
    <Profile uid={uid} />
  );
}

export default UsersProfile;
