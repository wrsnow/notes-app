import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../services/firebaseConfig";

const UserAuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  username: "",
  setUsername: () => {},
  userUID: "",
  setUserUID: () => {},
  clearAuthData: () => {},
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userUID, setUserUID] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUsername(user.displayName);
        setUserUID(user.uid);
      } else {
        clearAuthData();
      }
    });
  }, [isLoggedIn]);
  function clearAuthData() {
    setIsLoggedIn(false);
    setUsername("");
    setUserUID("");
    localStorage.removeItem("notes");
  }

  return (
    <>
      <UserAuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          setIsLoggedIn: setIsLoggedIn,
          username: username,
          setUsername: setUsername,
          userUID: userUID,
          setUserUID: setUserUID,
          clearAuthData: clearAuthData,
        }}
      >
        {props.children}
      </UserAuthContext.Provider>
    </>
  );
}
export default UserAuthContext;
