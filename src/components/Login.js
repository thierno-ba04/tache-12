import { signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate("/monsite");
  //   }
  // }, [user, navigate]);

  const login = async (event) => {
    event.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate("/monsite"),
      });
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error(error.message);
      }
      console.log(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success("Google Sign-In Successful");
    } catch (error) {
      toast.error("Error during Google Sign-In");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="heading">Login</div>
      <form onSubmit={login} className="form">
        <input
          required
          className="input"
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          onChange={(event) => setLoginEmail(event.target.value)}
        />
        <input
          required
          className="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(event) => setLoginPassword(event.target.value)}
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="social-account-container">
        <span className="title">Or Sign in with</span>
        <div className="social-accounts">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
      <Link to="/signup">
        <span>Don't have an account? Sign up here</span>
      </Link>
    </div>
  );
};

export default Login;
