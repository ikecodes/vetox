import React from "react";
import NavbarLg from "./NavLg";
import NavSm from "./NavSm";
const Header = ({ headerText }) => {
  return (
    <div>
      <NavSm />
      <NavbarLg />
    </div>
  );
};

export default Header;
