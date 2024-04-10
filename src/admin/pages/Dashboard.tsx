import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { FaTicketAlt } from "react-icons/fa";
import { FaRegSadCry } from "react-icons/fa";
import Button from "../components/Button";
import { getAllRuffles } from "../../Blockchain.services";
import { getGlobalState } from "../../store";
import NoRaffle from "../components/NoRaffle";
import CardRaffle from "../components/CardRaffle";
import { Raffle } from "../../types/Raffle";
import { listOfRaffle } from "../../constants";

const Dashboard: React.FC = () => {
  const [raffleStatusFilter, setRaffleStatusFilter] = useState(1);
  const [raffles, setRaffles] = useState<Raffle[]>([]);

  useEffect(() => {
    const account = getGlobalState("connectedAccount");
    const fetchData = async () => {
      console.log("Fetching raflles");
      const fetchedRaffles = await getAllRuffles();
      setRaffles(fetchedRaffles as Raffle[]);
    };
    if (account) {
      //console.log("chamouuuu");
      fetchData();
    }
  }, []);

  const noRifas = 0;

  const filteredList = raffles?.filter((raffle) =>
    raffleStatusFilter === 1
      ? !raffle.isFinished
      : raffleStatusFilter === 2
      ? raffle.isFinished
      : true
  );
  return (
    <Layout>
      <div className="flex flex-col mt-4 md:mt-0 md:ml-4 mx-auto w-4/5">
        {/*--USERNAME */}
        <div>
          <h1>
            Olá,
            <span className="font-bold">WALBER BALBUENO</span>
          </h1>
        </div>

        {/*--SELECT-RIFAS */}
        <div className="mt-7 flex flex-col">
          <h1 className="flex flex-row">
            <FaTicketAlt className="text-3xl text-slate-800" />
            <span className="ml-2 text-slate-700 font-bold">Minhas Rifas</span>
          </h1>
          <span className="text-slate-500 text-sm">
            Aqui estão suas rifas criadas
          </span>

          <div className="relative mt-2 w-full flex flex-row items-center justify-between">
            {/* Select alinhado à esquerda */}
            <select
              className="appearance-none w-50 border border-black bg-white px-4 py-2 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:shadow-outline"
              name="status"
              value={raffleStatusFilter}
              onChange={(e) => setRaffleStatusFilter(Number(e.target.value))}
            >
              <option value={1}>Em andamento</option>
              <option value={2}>Finalizadas</option>
            </select>

            {/* Button alinhado à direita */}
            <a href="/dashboard/rifa">
              <Button
                text="Criar Rifa"
                icon={<FaTicketAlt />}
                onClick={() => {}}
                className="bg-green-600 hover:bg-green-800 shadow-xl shadow-black text-white py-2 px-4 rounded-full flex items-center justify-center w-50"
                disabled={false}
              />
            </a>
          </div>

          {/*--RIFAS */}
          {noRifas != 0 ? (
            <NoRaffle onClick={() => {}} />
          ) : (
            <CardRaffle raffles={filteredList} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
