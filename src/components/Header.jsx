import React from "react";
import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ isLoggedIn, userEmail, onSignOut, signOut, signUp, singIn }) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="логотип проекта Место" className="header__logo" />

      <div className="header__container">
        {isLoggedIn ? (
          <>
            <p className="header__email">{userEmail}</p>
            <Link to="/sign-in" className="header__exit" onClick={onSignOut}>
              {signOut}
            </Link>
          </>
        ) : (
          <>
            {location.pathname.includes("sign-in") && (
              <Link to="/sign-up" className="header__link">
                {signUp}
              </Link>
            )}
            {location.pathname.includes("sign-up") && (
              <Link to="/sign-in" className="header__link">
                {singIn}
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
