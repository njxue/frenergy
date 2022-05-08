import { getMetadata } from "firebase/storage";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import Loader from "../components/layout/Loader";

const UserInfoContext = createContext();
const db = "https://study-e0762-default-rtdb.firebaseio.com";

export function useUserInfoContext(props) {
  return useContext(UserInfoContext);
}

function UserInfoProvider(props) {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currUser } = useAuth();
  const path = db + "/modules/" + currUser.uid + ".json";

 useEffect(() => {
    fetch(path)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setModules(data);
        }
        setIsLoading(false);
 
      });
  }, []);

  async function removeModule(module) {
    setIsLoading(true);
    const filtered = modules.filter((m) => m !== module);
    await fetch(path, {
      method: "PUT",
      body: JSON.stringify(filtered),
    }).then(() => {
      setModules(filtered);
      setIsLoading(false);
    });
  }

  async function addModule(module) {
    if (!modules.includes(module)) {
      setIsLoading(true);
      const newModules = modules.map(x => x);
      newModules.push(module);
      await fetch(path, {
        method: "PUT",
        body: JSON.stringify(newModules)
      }).then(() => {
        setModules(newModules);
        setIsLoading(false);
      });
    }
  }

  function isSubscribedTo(module) {
    return modules.includes(module);
  }

  const value = {
    modules,
    removeModule,
    addModule,
    isSubscribedTo
  };

  return (
    <UserInfoContext.Provider value={value}>
      {isLoading ? <Loader /> : props.children}
    </UserInfoContext.Provider>
  );
}

export default UserInfoProvider;
