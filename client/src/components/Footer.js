import React from "react";
import {Link} from "react-router-dom"; 

function Footer() {
  return (
    <footer id="footer">
      <Link to ="/aboutus">About Us</Link>
      <Link to = "/howdoesitwork">How does it work?</Link>
      <p>Copyright 2020 © Campus Ranked</p>
      <p>Created In Madison, Wisconsin</p>
    </footer>
  );
}

export default Footer;
