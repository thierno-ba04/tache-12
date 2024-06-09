import { useState, useEffect } from "react";
import FacebookLogin from 'react-facebook-login';

import {
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { UserAuth } from "../context/AuthContext";

const SignUp = () => {
  const [users, setUser] = useState({});
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  // se connecter avec google
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success("Google Sign-In Successful");
      navigate("/monsite");
    } catch (error) {
      toast.error("Error during Google Sign-In");
      console.log(error);
    }
  };

  // fin de se connecter avec google

  // se connecter avec facebook

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithRedirect(auth, provider);
      console.log("Facebook sign in result:", result.user);
      
      navigate("/monsite");
    } catch (error) {
      console.error("Error during Facebook sign in:", error.message);
    }
  };
  // fin se connecter avec facebook

  // authentification simple
  const register = async (e) => {
    e.preventDefault();
    if (!users || !registerEmail || !registerPassword) {
      toast.error("creez un compte svp");
      return;
    }
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      toast.success("Account created successfully", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate("/login"),
      });
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        autoClose: 3000, // Durée de la notification en millisecondes
      });
      console.log(error.message);
    }
    // fin authentification simple
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="heading">Sign Up</div>
      <form className="form">
        <input
          required
          className="input"
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Full name"
        />
        <input
          required
          className="input"
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          required
          className="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <button type="submit" onClick={register} className="login-button">
          Sign Up
        </button>
      </form>
      <div className="social-account-container">
        <span className="title">Or Sign in with</span>
        <div className="social-accounts">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
        <div className="social-accounts">
          <FacebookLogin onClick={handleFacebookSignIn} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
