import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import Loader from "../components/layout/Loader";
import { ref } from "../config/firebase";

const UserInfoContext = createContext();

export function useUserInfoContext(props) {
  return useContext(UserInfoContext);
}

function UserInfoProvider(props) {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currUser } = useAuth();

  const userModulesRef = ref
    .child("users")
    .child(currUser.uid)
    .child("modules");

  useEffect(() => {
    setIsLoading(true);
    userModulesRef.on("value", (snapshot) => {
      const tmp = [];
      for (const key in snapshot.val()) {
        tmp.push(snapshot.val()[key]);
      }
      setModules(tmp);
      setIsLoading(false);
    });
  }, []);

  function addModule(module) {
    setIsLoading(true);
    if (!modules.some(m => m.moduleCode == module.moduleCode)) {

      modules.push(module);
      userModulesRef.set(modules);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      throw "Module already exists!";
    }
  }

  function removeModule(module) {
    setIsLoading(true);
    const newModules = modules.filter((m) => m != module);
    console.log(newModules);
    userModulesRef.set(newModules, (error) => {
      setIsLoading(false);
      if (error) {
        console.log("error");
      } else {
        console.log("success");
      }
    });
  }

  const value = {
    modules,
    addModule,
    removeModule,
  };

  return (
    <UserInfoContext.Provider value={value}>
      {isLoading ? <Loader /> : props.children}
    </UserInfoContext.Provider>
  );
}

export default UserInfoProvider;
