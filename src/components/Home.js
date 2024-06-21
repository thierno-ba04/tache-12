import { Link } from "react-router-dom";
import img1 from"../assets/img/discord-logo.png";


const Home = () => {
  return (
    <div className="container">
      <img src={img1} style={{width:"70%", marginLeft: "40px"}} />
      <div className="heading">Evon</div>
      {/* <p>
        Discover upcoming events <br /> near you
      </p> <br /> */}
      <form action="" className="form">
        <Link to="/signup">
          <input className="login-button" type="submit" value="Sign In" />
        </Link>

        <Link to="/login">
          <input className="login-button" type="submit" value="Login" />
        </Link>
      </form>
      <div className="social-account-container">
        <span className="title">Skip for now</span>
      </div>
    </div>
    
  );
};

export default Home;
