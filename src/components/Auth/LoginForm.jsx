import React from "react";
import FloatingInput from "../UI/FloatingInput";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from "react";
import UserAuthContext from "./UserAuthContext";
import { auth } from "../../services/firebaseConfig";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(UserAuthContext);

  function loginExistingAccount(e) {
    e.preventDefault();
    if (email.trim().length <= 0 || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }
    if (password.trim().length <= 0) {
      alert("Password is required.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        authContext.setIsLoggedIn(true);
        authContext.setUsername(user.username);

        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errorCode = error.code;
        let emailNotFound = new RegExp("auth/user-not-found");
        let wrongPassword = new RegExp("auth/wrong-password");
        if (emailNotFound.test(errorCode))
          return alert("Not found a user with that email address");
        if (wrongPassword.test(errorCode))
          return alert("Password is incorrect.");
        alert(errorCode);
      });
  }

  return (
    <form
      className="w-[60%] h-full flex flex-col justify-center items-center mx-auto"
      onSubmit={loginExistingAccount}
    >
      <h1 className="text-white text-4xl mb-10">LOGIN</h1>
      <FloatingInput
        autofocus
        label="Email"
        type="email"
        className="rounded-sm bg-white w-full"
        id="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <FloatingInput
        label="Password"
        type="password"
        className="rounded-sm bg-white w-full"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="active:bg-slate-400 hover:bg-slate-500 bg-slate-600 px-4 py-2 rounded-sm text-white my-5 w-full"
      >
        Login
      </button>
      <small className="text-white hover:text-gray-400 active:text-gray-500">
        <a onClick={() => props.setHasAccount(false)} href="#">
          Create a new account
        </a>
      </small>
    </form>
  );
}

export default LoginForm;
