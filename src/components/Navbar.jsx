import { signOut } from "firebase/auth";
import { useContext } from "react";
import { auth } from "../services/firebaseConfig";
import UserAuthContext from "./Auth/UserAuthContext";

function Navbar() {
  const authContext = useContext(UserAuthContext);
  function logOut() {
    signOut(auth)
      .then(() => {
        authContext.clearAuthData();
      })
      .catch((err) => {});
  }

  return (
    <nav className="sticky top-0 z-30 w-full bg-slate-900/75 backdrop-blur-sm flex flex-col items-center justify-between shadow-sm shadow-black text-white">
      <div className="flex px-3 items-center w-full py-3 duration-1000">
        <div className="logo">
          <a href="https://logoipsum.com/" target="_blank">
            <img
              className="w-23"
              src="assets/placeholder/logoipsum-292.svg"
              alt=""
            />
          </a>
        </div>
        <div className="flex flex-col ml-auto items-center justify-center">
          <button
            aria-label="logout"
            className="active:bg-slate-500 hover:bg-slate-600 bg-slate-700 p-2 aspect-square w-8 flex items-center justify-center rounded-md"
            onClick={logOut}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
          <span>Logged as {authContext.username ?? "User"}</span>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-full h-[1px] bg-white/25"></div>
      </div>
    </nav>
  );
}

export default Navbar;
