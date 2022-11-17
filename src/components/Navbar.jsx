import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <ul className="nav-unordered-list">
        <li>
          <Link className="list-style" to="/">
            LegacyX
          </Link>
        </li>
        <li>
          <Link className="list-style" to="/">
            Home
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
