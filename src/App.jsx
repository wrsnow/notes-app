import { lazy, Suspense, useContext } from "react";
import UserAuthContext from "./components/Auth/UserAuthContext";
import MainBody from "./components/MainBody";
import Spinner from "./components/Spinner";

function App() {
  const LoginPage = lazy(() => import("./components/Auth/LoginPage"));
  const authContext = useContext(UserAuthContext);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        {!authContext.isLoggedIn ? <LoginPage /> : <MainBody />}
      </Suspense>
    </>
  );
}

export default App;
