import { createContext, useContext, useState, useEffect } from "react";
import { auth, ref } from "../config/firebase";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useError } from "../utils/helper";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider(props) {
  const navigate = useNavigate();
  const { setError } = useError();
  const [currUser, setCurrUser] = useState(null);

  function register(email, password, username) {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      ref.child(`users/${auth.currentUser.uid}/profile`).set({
        username: username,
        bio: "",
        flair: "",
        major: "",
        photoURL: "",
      });
      ref.child("usernames").child(username).set(auth.currentUser.uid);
      cred.user.sendEmailVerification().then(() => console.log("email sent"));
      updateProfile(auth.currentUser, {
        displayName: username,
      });
      navigate("/login", { state: { fromRegistration: true } });
      return auth.signOut();
    });
  }

  function login(email, passsword) {
    return auth.signInWithEmailAndPassword(email, passsword);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        if (user.emailVerified) {
          setCurrUser(user);
          navigate("/");
        } else {
          navigate("/login");
          setError("Please verify your email before logging in");
        }
      } else {
        //logout or no such user
        navigate("/login");
        setCurrUser();
      }
    });
    return () => unsubscribe;
  }, []);

  const value = {
    currUser,
    register,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
