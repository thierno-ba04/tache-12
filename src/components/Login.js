import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const { googleSignIn } = UserAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const login = async (event) => {
    event.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      toast.success("Well Done");
      console.log(userCredential.user);
      navigate("/monsite");
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
      await signInWithPopup(auth, googleSignIn);
      toast.success("Google Sign-In Successful");
      navigate("/monsite");
    } catch (error) {
      toast.error("Error during Google Sign-In");
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/monsite");
    }
  }, [user, navigate]);

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
        <Link to="/signup">
          <span className="title">Or Sign in with</span>
        </Link>
        <div className="social-accounts">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  );
};

export default Login;
