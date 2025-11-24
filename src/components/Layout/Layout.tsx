import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import type { ReactNode } from "react";
import "./Layout.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

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
