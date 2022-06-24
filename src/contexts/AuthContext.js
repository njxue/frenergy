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
  const [currUser, setCurrUser] = useState();
  const [loggedIn, setLoggedIn] = useState();

  function register(email, password, username) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
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
      })
      .catch((error) => {
        const errorCodeAlerts = {
          "auth/email-already-in-use":
            "An account with this email is already in use",
          "auth/invalid-email": "Email format is invalid",
        };
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCodeAlerts[errorCode]) {
          setError(errorCodeAlerts[errorCode]);
        } else {
          setError("Unable to register");
        }
      });
  }

  async function login(email, passsword) {
    const errorCodeAlerts = {
      "auth/invalid-email": "Email format is invalid",
      "auth/wrong-password": "Wrong password",
      "auth/user-not-found": "Account with this email does not exist",
    };
    return auth.signInWithEmailAndPassword(email, passsword).catch((error) => {
      const errorCode = error.code;
      if (errorCodeAlerts[errorCode]) {
        setError(errorCodeAlerts[errorCode]);
      } else {
        setError("Failed to login");
      }
    });
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          setCurrUser(user);
          setLoggedIn(true);
        } else {
          navigate("/login");
          setError("Please verify your email before logging in");
        }
      } else {
        //logout or no such user
        navigate("/login");
        setCurrUser();
        setLoggedIn(false);
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
    loggedIn,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
