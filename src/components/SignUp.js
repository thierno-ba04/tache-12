import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleButton from "react-google-button";
import { UserAuth } from "../context/AuthContext";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  const register = async (e) => {
    e.preventDefault();
    if (!fullname || !registerEmail || !registerPassword) {
      toast.error("Please fill in all fields");
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
      toast.error(error.message);
      console.log(error.message);
    }
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
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          required
          className="input"
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          required
          className="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button type="submit" onClick={register} className="login-button">
          Sign Up
        </button>
      </form>
      <div className="social-account-container">
        <span className="title">Or Sign up with</span>
        <div className="social-accounts">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
