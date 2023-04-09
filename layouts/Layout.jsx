import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout = ({ children, header }) => {
  return (
    <div>
      <Nav />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
