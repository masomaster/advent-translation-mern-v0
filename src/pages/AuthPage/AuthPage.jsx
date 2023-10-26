import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useState } from "react";

export default function AuthPage({ setProfile }) {
  const [login, setLogin] = useState(true);

  function handleToggle() {
    setLogin(!login);
  }

  return (
    <main>
      {login ? (
        <>
          <h1>Log In</h1>
          <LoginForm setProfile={setProfile} handleToggle={handleToggle} />
        </>
      ) : (
        <>
          <h1>Sign Up</h1>
          <SignUpForm setProfile={setProfile} handleToggle={handleToggle} />
        </>
      )}
    </main>
  );
}
