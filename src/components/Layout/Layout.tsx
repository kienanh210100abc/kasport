import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import type { ReactNode } from "react";
import "./Layout.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
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
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
