import React, { ReactNode, memo } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../../components/Footer";
import SideBar from "../components/SideBar";

// Memoizar componentes para evitar re-renders desnecessários
const MemoizedHeaderAdmin = memo(HeaderAdmin);
const MemoizedSideBar = memo(SideBar);
const MemoizedFooter = memo(Footer);

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-slate-100">
      <div className="gradient-bg-hero">
        <MemoizedHeaderAdmin />
      </div>
      <div className="flex flex-col md:flex-row py-4 mx-auto w-full md:w-4/5">
        <MemoizedSideBar />
        {children}
      </div>

      <MemoizedFooter />
    </div>
  );
};

export default memo(Layout);
