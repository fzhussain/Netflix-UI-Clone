import React, { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [show, handleshow] = useState(false);

  // A snippet of code which runs based on specific condition
  useEffect(() => {
    //   We need the code to run once once the Navbar component loads
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        //   Trigger when we scrool 100px down the y-axis
        handleshow(true);
      } else handleshow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <img
        className="nav__avatar"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
        alt="Netflix Logo"
      />
    </div>
  );
}

export default Navbar;
