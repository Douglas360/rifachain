import React, { useCallback, useMemo } from "react";
import logo from "../../assets/logo.png";
import { truncateAddress, useGlobalState } from "../../store";
import { connectWallet } from "../../context/Blockchain.services";
import { MATIC_CHAIN_ID_TESTNET } from "../../constants";
import { useNavigate } from "react-router-dom";

const HeaderAdmin = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const navigate = useNavigate();
  
  // Memoizar a função de navegação
  const navigateTo = useCallback((sectionId: string): void => {
    navigate(`/#${sectionId}`);
  }, [navigate]);

  // Memoizar o endereço truncado para evitar recálculo
  const truncatedAddress = useMemo(() => {
    return connectedAccount ? truncateAddress(connectedAccount, 4, 4, 11) : "";
  }, [connectedAccount]);

  // Memoizar se deve mostrar o ícone do Polygon
  const shouldShowPolygonIcon = useMemo(() => {
    return localStorage.getItem("connectedChain") === MATIC_CHAIN_ID_TESTNET;
  }, []);

  // Memoizar handlers para os cliques nos links
  const handleFeaturesClick = useCallback(() => navigateTo("features"), [navigateTo]);
  const handleFaqClick = useCallback(() => navigateTo("faq"), [navigateTo]);
  const handleContactClick = useCallback(() => navigateTo("contact"), [navigateTo]);

  return (
    <nav className="w-4/5 flex justify-between items-center py-4 mx-auto">
      <div className="flex items-center">
        <img className="w-32 cursor-pointer" src={logo} alt="Rifa Chain" />

        <ul
          className=" text-white md:flex
        hidden list-none flex-row justify-between 
        items-center flex-initial"
        >
          <li
            className="mx-4 cursor-pointer"
            onClick={handleFeaturesClick}
          >
            Funcionalidades
          </li>
          <li className="mx-4 cursor-pointer" onClick={handleFaqClick}>
            Perguntas frequentes
          </li>
          <li
            className="mx-4 cursor-pointer"
            onClick={handleContactClick}
          >
            Contato
          </li>
        </ul>
      </div>

      {connectedAccount ? (
        <button className="flex items-center shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] text-xl md:text-2xl md:p-2 rounded-full cursor-pointer">
          {shouldShowPolygonIcon ? (
            <img
              className="w-8 h-8 rounded-full mr-2"
              src="https://cryptologos.cc/logos/polygon-matic-logo.png"
              alt="Polygon Matic"
            />
          ) : null}
          <a href="/dashboard">
            <span>{truncatedAddress}</span>
          </a>
        </button>
      ) : (
        <button
          className="shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md: p-2 rounded-full cursor-pointer"
          onClick={connectWallet}
        >
          Conectar Carteira
        </button>
      )}
    </nav>
  );
};

export default HeaderAdmin;
