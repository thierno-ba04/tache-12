import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleButton from "react-google-button";
import { UserAuth } from "../context/AuthContext";
// import { FacebookAuthProvider } from "firebase/auth/web-extension";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // connection avec google
  const { googleSignIn, authUser } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // fin code google

  // connection avec facebook
  // const handleFacebookSignIn = async () => {
  //   const provider = new FacebookAuthProvider();
  //   try {
  //     const result = await signInWithRedirect(auth, provider);
  //     console.log("Facebook sign in result:", result.user);
  //     navigate("/connect");
  //   } catch (error) {
  //     console.error("Error during Facebook sign in:", error.message);
  //   }
  // };

  // fin connection avec facebook

  const register = async (event) => {
    event.preventDefault();
    if (!fullname || !registerEmail || !registerPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      toast.success("CREER avec succès");
      console.log(userCredential.user);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="heading">Sign Up</div>
      <form className="form" onSubmit={register}>
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
        <button type="submit" className="login-button">
          Sign Up
        </button>
      </form>
      <div className="social-account-container">
        <span className="title">Or Sign up with</span>
        <div className="social-accounts">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
        {/* <div className="social-accounts">
          <FacebookLoginButton onClick={handleFacebookSignIn} />
        </div> */}

      </div>
    </div>
  );
};

export default SignUp;
