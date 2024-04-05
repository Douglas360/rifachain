import React, { ReactNode } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../../components/Footer";
import SideBar from "../components/SideBar";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-slate-100">
      <div className="gradient-bg-hero">
        <HeaderAdmin />
      </div>
      <div className="flex flex-col md:flex-row py-4 mx-auto w-full md:w-4/5">
        <SideBar />
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
