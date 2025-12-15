import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css";

const Layout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="layout">
      <Navbar />
      <div className="layout-body">
        <Sidebar onToggle={setIsSidebarExpanded} />
        <main
          className="main-content"
          style={{
            marginLeft: isSidebarExpanded ? "250px" : "70px",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
