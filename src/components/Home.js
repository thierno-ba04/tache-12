import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="container">
      <div className="heading">Evon</div>
      <p>
        Discover upcoming events <br /> near you
      </p> <br />
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
    // <form action="" className="form_main">
    //   <div className="icone">
    //     <i class="fa fa-map-marker" aria-hidden="true"></i>
    //     <i class="fa fa-map-marker" aria-hidden="true"></i>
    //   </div>
    //   <h2>Evon</h2>
    //   <div className="ev">
    //     <p>
    //       Discover upcoming events <br /> near you
    //     </p>
    //   </div>
    //   <div className="bottom">
    //     <Link to="/signup">
    //       <button id="button">Sign in</button>
    //     </Link>
    //     <Link to="/login">
    //       <button id="button">Login</button>
    //     </Link>
    //     <a class="forgotLink" href="#">
    //       Skip for now
    //     </a>
    //   </div>
    // </form>
  );
};

export default Home;
