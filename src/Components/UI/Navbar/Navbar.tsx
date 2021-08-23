import React from "react";
import "./Navbar.css";

const Navbar = (props: any) => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <ul className={"container main-nav"}>
          <li className={"home"}>Home</li>
          <li className={"about"}>About</li>
          <li className={"technologies"}>Technologies</li>
          <div className={"site-access"}>
            <li className={"login"}>Login</li>
            <li className={"signup"}>Sign Up</li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
