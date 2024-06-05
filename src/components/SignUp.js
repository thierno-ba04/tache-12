import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";

const SignUp = () => {
  const [user, setUser] = useState({});
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { googleSignIn } = UserAuth();

  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const register = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      toast.success("Creation du compte reussi!", {
        autoClose: 3000 // Durée de la notification en millisecondes
      });
      console.log(userCredential);
      setTimeout(() => navigate('/login'), 3000); // Rediriger vers la page de connexion après 3 secondes
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        autoClose: 3000 // Durée de la notification en millisecondes
      });
      console.log(error.message);
    }

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
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="heading">Sign In</div>
      <form className="form" onSubmit={register}>
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
        <span className="forgot-password">
          <a href="#">Forgot Password ?</a>
        </span>
        <button className="login-button" type="submit">Creer</button>
      </form>
      <div className="social-account-container">
        <span className="title">Or Sign in with</span>
        <div className="social-accounts">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>     
         </div>
    </div>
  );
};

export default SignUp;
