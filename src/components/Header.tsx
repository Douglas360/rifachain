import React from "react";
import logo from "../assets/logo.png";
import { truncateAddress, useGlobalState } from "../store";
import { connectWallet } from "../Blockchain.services";
import { MATIC_CHAIN_ID_TESTNET } from "../constants";

const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");

  function scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        behavior: "smooth",
        top: section.offsetTop, // ajuste opcional para o deslocamento
      });
    }
  }

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
            onClick={() => scrollToSection("features")}
          >
            Funcionalidades
          </li>
          <li
            className="mx-4 cursor-pointer"
            onClick={() => scrollToSection("faq")}
          >
            Perguntas frequentes
          </li>
          <li
            className="mx-4 cursor-pointer"
            onClick={() => scrollToSection("contact")}
          >
            Contato
          </li>
        </ul>
      </div>

      {connectedAccount ? (
        <button className="flex items-center shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] text-xl md:text-2xl md:p-2 rounded-full cursor-pointer">
          {localStorage.getItem("connectedChain") === MATIC_CHAIN_ID_TESTNET ? (
            <img
              className="w-8 h-8 rounded-full mr-2"
              src="https://cryptologos.cc/logos/polygon-matic-logo.png"
              alt="Polygon Matic"
            />
          ) : null}
          <span>{truncateAddress(connectedAccount, 4, 4, 11)}</span>
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

export default Header;
