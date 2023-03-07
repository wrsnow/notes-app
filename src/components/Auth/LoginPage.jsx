import { useState, lazy, Suspense } from "react";
import Spinner from "../Spinner";

function LoginPage() {
  const LoginForm = lazy(() => {
    return wait().then(() => import("./LoginForm"));
  });
  const RegisterForm = lazy(() => {
    return wait().then(() => import("./RegisterForm"));
  });
  const [hasAccount, setHasAccount] = useState(true);

  const wait = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  };

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gradient-to-b from-slate-700 to-slate-400 overflow-hidden">
      <div className="w-[400px] h-[500px] mx-auto bg-slate-800 rounded-md border-2 border-slate-200/25">
        <Suspense fallback={<Spinner />}>
          {hasAccount ? (
            <LoginForm setHasAccount={setHasAccount} />
          ) : (
            <RegisterForm setHasAccount={setHasAccount} />
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default LoginPage;
