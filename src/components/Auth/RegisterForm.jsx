import { useState, useEffect, useReducer, useContext } from "react";
import FloatingInput from "../UI/FloatingInput";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import { updateProfile } from "firebase/auth";
import UserAuthContext from "./UserAuthContext";
import passwordReducer from "./PasswordReducer";

function RegisterForm(props) {
  const authContext = useContext(UserAuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    password: "",
    repeatPassword: "",
    isPasswordValid: null,
    passwordStatus: ["", ""],
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkValidity();
    }, 200);
    return () => clearTimeout(timeout);
  }, [passwordState.password, passwordState.repeatPassword]);

  //
  console.clear();

  function handlePassword(e) {
    const { name, value } = e.target;
    if (name === "password") {
      passwordDispatch({ type: "password", value: value });
      return;
    }
    if (name === "repeatPassword") {
      passwordDispatch({ type: "repeatPassword", value: value });
      return;
    }
  }

  function checkAllField() {
    let isUsernameValid = username.trim().length > 0;
    let isEmailValid = email.trim().length > 0 && email.includes("@");
    let isPasswordValid = passwordState.isPasswordValid;

    return isUsernameValid && isEmailValid && isPasswordValid;
  }

  function createNewAccount(e) {
    e.preventDefault();
    if (!passwordState.isPasswordValid) {
      alert("Please check your credentials.");
      return;
    }
    if (!checkAllField()) {
      alert("Please fullfil all fields.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, passwordState.password)
      .then((userCredential) => {
        // Signed in
        alert("Account created successfully.");
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username,
        });
        authContext.setUsername(user.displayName);
        props.setHasAccount(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let emailInUse = new RegExp("auth/email-already-in-use");
        if (emailInUse.test(errorCode)) {
          alert("Email already in use");
        }

        // ..
      });
  }

  function checkValidity() {
    const { password, repeatPassword } = passwordState;
    if (password.trim().length <= 7) {
      passwordDispatch({
        type: "passwordLength",
        value: "Password is too short.",
      });
      return;
    } else {
      passwordDispatch({
        type: "passwordLength",
        value: "",
      });
    }
    if (repeatPassword !== password) {
      passwordDispatch({
        type: "repeatPasswordVal",
        value: "Password does not match",
      });
      return;
    } else {
      passwordDispatch({
        type: "repeatPasswordVal",
        value: "",
      });
    }
    passwordDispatch({ type: "passwordValidity" });
  }
  return (
    <form
      className="w-[60%] h-full flex flex-col justify-center items-center mx-auto"
      onSubmit={createNewAccount}
    >
      <h1 className="text-white text-4xl mb-10">REGISTER</h1>
      <FloatingInput
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        type="type"
        className="rounded-sm bg-white w-full my-1"
        id="username"
        name="username"
      />
      <FloatingInput
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        type="email"
        className="rounded-sm bg-white w-full my-1"
        id="email"
        name="email"
      />
      <FloatingInput
        onChange={handlePassword}
        label="Password"
        type="password"
        className="rounded-sm bg-white w-full my-1"
        name="password"
        id="password"
        value={passwordState.password}
      />
      {passwordState.password && (
        <small className="my-0 text-red-600 text-start w-full">
          {passwordState.passwordStatus[0]}
        </small>
      )}
      <FloatingInput
        onChange={handlePassword}
        label="Repeat Password"
        type="password"
        className="rounded-sm bg-white w-full my-1"
        name="repeatPassword"
        id="repeatPassword"
        value={passwordState.repeatPassword}
      />
      {passwordState.repeatPassword && (
        <small className="my-0 text-red-600 text-start w-full">
          {passwordState.passwordStatus[1]}
        </small>
      )}
      <button
        type="submit"
        className="active:bg-slate-400 hover:bg-slate-500 bg-slate-600 px-4 py-2 rounded-sm text-white mt-4 mb-3 w-full"
      >
        Create
      </button>
      <small className="text-white hover:text-gray-400 active:text-gray-500">
        <a onClick={() => props.setHasAccount(true)} href="#">
          Login instead
        </a>
      </small>
    </form>
  );
}

export default RegisterForm;
