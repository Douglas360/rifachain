import React from "react";
import {
  FaCog,
  FaCreditCard,
  FaHeadset,
  FaTachometerAlt,
  FaTicketAlt,
  FaWallet,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuItemClick = (section: string) => {
    // Redirecionar para a seção correspondente do menu
    navigate(section);
    console.log(location.pathname);
  };

  interface MenuItem {
    name: string;
    to: string;
    icon: React.ReactNode;
  }

  const menuItems: MenuItem[] = [
    { name: "Dashboard", to: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Criar Rifa", to: "/dashboard/rifa", icon: <FaTicketAlt /> },
    { name: "Meus tickets", to: "/dashboard/meus-tickets", icon: <FaWallet /> },
    { name: "Transações", to: "/dashboard/transacoes", icon: <FaCreditCard /> },
    { name: "Suporte", to: "/suporte", icon: <FaHeadset /> },
    { name: "Configuração", to: "/dashboard/configuracao", icon: <FaCog /> },
  ];

  return (
    <div>
      {/*--USER PROFILE */}
      <div className="bg-sidebar text-white rounded-md w-4/5 mx-auto md:w-60 md:h-70">
        <div className="flex flex-col items-center">
          <img
            className="w-40 h-40 rounded-full mt-3"
            src="https://randomuser.me/api/portraits/men/13.jpg"
            alt="Profile"
          />
          <h2 className="mt-4 text-white text-1xl md:2xl font-bold uppercase">
            Walber Balbueno
          </h2>
          <p className="text-1xl text-blue-400">ID: 986426</p>
        </div>
      </div>

      {/*--MENU */}
      <div className="bg-sidebar text-white rounded-md w-4/5 mx-auto md:w-60 mt-4">
        <ul className="text-1xl p-2">
          {menuItems.map((item) => (
            <li
              key={item.to}
              className={`p-4 hover:bg-primary cursor-pointer rounded-xl mb-1 ${
                location.pathname === item.to ? "bg-primary rounded-xl" : ""
              }`}
              onClick={() => handleMenuItemClick(item.to)}
            >
              <div className="flex flex-row items-center">
                {item.icon}
                <span className="ml-4">{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
