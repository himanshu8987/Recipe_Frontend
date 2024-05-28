import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import "./navbar.css"
import logo from "../components/logo1.png"

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const Logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt='Logo' style={{ height: "50px", width: "210px", margin: "10px" }} />
      </div>
      <div className='navbar-right'>
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create Recipe</Link>
        {!cookies.access_token ? (
          <Link to="/login">Login/Register</Link>
        ) : (
          <div className='button'>
            <Link to="/saved-recipe">Saved Recipe</Link>
            <button onClick={Logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
