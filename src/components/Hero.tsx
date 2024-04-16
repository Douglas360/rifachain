import React from "react";
import { connectWallet } from "../Blockchain.services";
import { useGlobalState } from "../store";

import imageHero from "../assets/hero.webp";

const Hero = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  return (
    <div
      className="flex flex-col md:flex-row w-4/5 justify-between 
items-center mx-auto py-10 md:mt-10"
    >
      <div className="md:w-3/6 w-full">
        <div>
          <h1 className="text-white text-5xl font-bold">
            Crie sua
            <span className="text-gradient"> Rifa</span> <br />
            Online na Blockchain
            <br />
          </h1>
          <p className="text-gray-3 font-semibold text-sm mt-3">
            A plataforma completa para você criar e gerenciar suas campanhas com
            praticidade e facilidade.
          </p>
        </div>

        <div className="flex flex-row mt-5">
          <button
            className="shadow-xl shadow-black text-white
            bg-[#e32970] hover:bg-[#bd255f]
            rounded-full cursor-pointer p-2"
            onClick={
              connectedAccount
                ? () => (window.location.href = "/dashboard")
                : connectWallet
            }
          >
            Quero criar agora mesmo
          </button>
        </div>

        <div className="w-3/4 flex justify-between items-center mt-5">
          <div>
            <p className="text-white font-bold">1231k</p>
            <small className="text-gray-3">Usuários</small>
          </div>
          <div>
            <p className="text-white font-bold">152k</p>
            <small className="text-gray-3">Rifas</small>
          </div>
          <div>
            <p className="text-white font-bold">$200k</p>
            <small className="text-gray-3">Arrecadado</small>
          </div>
        </div>
      </div>

      <div className="shadow-xl shadow-primary md:w-2/5 w-full mt-10 md:mt-0 rounded-md overflow-hidden bg-graydark">
        <div className="aspect-w-5 aspect-h-7">
          <img
            src={imageHero}
            alt="Rifa Online na Blockchain"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
