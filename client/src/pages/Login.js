import { React, useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

import "./Login.css";

const Login = ({ onLogin }) => {
  let seed = Math.floor(Math.random() * 1000) + 1;
  const [showLogin, setShowLogin] = useState(true);
  //   logout

  const signUpSound = () => {
    let signUpAudio = new Audio("/sounds/signup-sound.mp3");
    signUpAudio.play();
  };

  const loginSound = () => {
    let loginAudio = new Audio("/sounds/signin-sound.mp3");
    loginAudio.play();
  };

  const errorSound = () => {
    let errorAudio = new Audio("/sounds/error-sound.mp3");
    errorAudio.play();
  };

  return (
    <div>
      <div className="split left">
        <div className="centered">
          <h1 className="login-title">BOT_IO</h1>
          {showLogin ? (
            <>
              <LoginForm
                onLogin={onLogin}
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                loginSound={loginSound}
                errorSound={errorSound}
                signUpSound={signUpSound}
              />
            </>
          ) : (
            <>
              <SignUpForm
                onLogin={onLogin}
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                loginSound={loginSound}
                errorSound={errorSound}
                signUpSound={signUpSound}
              />
            </>
          )}
        </div>
      </div>
      <div className="split right">
        <div className="centered">
          <img
            className="login-img floating"
            src={
              showLogin
                ? `https://avatars.dicebear.com/api/bottts/yellow.svg`
                : `https://avatars.dicebear.com/api/bottts/${seed}.svg`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
