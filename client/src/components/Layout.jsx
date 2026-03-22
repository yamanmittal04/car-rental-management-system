import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0,0); }, [location.pathname]);
  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", background:"var(--bg)" }}>
      <Navbar />
      <div style={{ flex:1 }}>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
