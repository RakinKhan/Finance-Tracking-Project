import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props: any) => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <ul className={"container main-nav"}>
          <li className={"home"}><Link to="/">Home</Link></li>
          <li className={"about"}><Link to='about'>About</Link></li>
          <li className={"technologies"}><Link to='technologies'>Technologies</Link> </li>
          <div className={"site-access"}>
            <li className={"login"}><Link to='/login'>Log In</Link> </li>
            <li className={"signup"}><Link to='/signup'>Sign Up</Link></li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
