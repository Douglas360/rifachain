import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";

import Layout from "../layout";
import { FaTicketAlt } from "react-icons/fa";
import Input from "../components/Input";
import Button from "../components/Button";
import { createRaffle } from "../../Blockchain.services";
import { setAlert, setGlobalState } from "../../store";
import { Raffle } from "../../types/Raffle";

const Ruffle: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [totalReward, setTotalReward] = useState("2");
  const [ticketPrice, setTicketPrice] = useState("1");
  const [totalTicket, setTotalTicket] = useState(100);

  const handleCreateRaffle = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setGlobalState("loading", { show: true, msg: "Criando sua rifa..." });
      const data: Raffle = {
        title: title,
        totalTickets: totalTicket,
        ticketPrice: ticketPrice,
        totalReward: totalReward,
      };
      const ruffle = await createRaffle(data);
      if (ruffle) {
        setAlert("Rifa criada com sucesso!", "green");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error: any) {
      console.log("ERRO NO MINT: " + error);
      setAlert("Minting failed...", "red");
    }
  };
  return (
    <Layout>
      <div className="flex flex-col mt-4 md:mt-0 md:ml-4 mx-auto w-4/5">
        <h1 className="flex flex-row">
          <FaTicketAlt className="text-4xl text-slate-800" />
          <span className="ml-2 text-slate-800 text-3xl font-bold">
            Criar Rifa
          </span>
        </h1>

        {/*--FORM */}
        <div className="mt-7">
          <form onSubmit={handleCreateRaffle}>
            <div className="flex flex-col">
              <Input
                label="Nome da rifa"
                placeholder="Ex: Rifa de 2.5 Ethereum"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-4">
              <Input
                label="Total de bilhetes"
                placeholder="Ex: 100"
                type="number"
                id="totalTickets"
                onChange={(e) => setTotalTicket(parseInt(e.target.value))}
              />
            </div>

            <div className="flex flex-col mt-4">
              <Input
                label="Valor do bilhete"
                placeholder="Ex: 10"
                type="string"
                id="ticketPrice"
                onChange={(e) => setTicketPrice(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-4">
              <Input
                label="Valor do prêmio"
                placeholder="Ex: 2.5"
                type="string"
                id="prizeValue"
                onChange={(e) => setTotalReward(e.target.value)}
              />
            </div>

            {/*Ao criar essa rifa, você concorda com os termos de uso */}
            <div className="flex flex-row mt-4">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" className="ml-2 text-slate-700">
                Ao criar essa rifa, você concorda com os{" "}
                <a href="/termo-de-uso" className="text-primary font-bold">
                  termos de uso
                </a>
              </label>
            </div>

            <div className="flex flex-col mt-4">
              <Button
                type="submit"
                text="Criar Rifa"
                icon={<FaTicketAlt />}
                onClick={() => {}}
                className="bg-primary hover:bg-[#bd255f] shadow-xl shadow-black  text-white py-2 px-4 rounded-full flex items-center justify-center mt-4 w-1/2 mx-auto"
                disabled={false}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Ruffle;
