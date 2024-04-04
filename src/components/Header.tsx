import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
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

      <button className="shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md: p-2 rounded-full cursor-pointer">
        Conectar Carteira
      </button>
    </nav>
  );
};

export default Header;
