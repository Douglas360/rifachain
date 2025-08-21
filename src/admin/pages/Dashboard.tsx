import React, { useEffect, useState, useCallback, useMemo } from "react";
import { FaTicketAlt } from "react-icons/fa";

import Layout from "../layout";
import Button from "../components/Button";
import NoRaffle from "../components/NoRaffle";
import CardRaffle from "../components/CardRaffle";
import PerformanceMonitor from "../../components/PerformanceMonitor";
import { getAllRaffles } from "../../context/Blockchain.services";
import { setGlobalState, useGlobalState } from "../../store";

import ShowRaffle from "../components/ShowRaffle";

const Dashboard: React.FC = () => {
  const [raffleStatusFilter, setRaffleStatusFilter] = useState(1);
  const [account] = useGlobalState("connectedAccount");
  const [raffles, setRaffles] = useGlobalState("raffles");
  const [loading] = useGlobalState("loading");
  const [user] = useGlobalState("user");

  // Memoizar a função fetchData para evitar recriação desnecessária
  const fetchData = useCallback(async () => {
    try {
      setGlobalState("loading", { show: true, msg: "Carregando rifas..." });

      if (account) {
        console.log("Fetching raffles");
        const fetchedRaffles = await getAllRaffles();
        setRaffles(fetchedRaffles);
      }
    } catch (error) {
      console.error("Error fetching raffles:", error);
    } finally {
      setGlobalState("loading", { show: false, msg: "" });
    }
  }, [account, setRaffles]);

  // Otimizar useEffect com dependências corretas
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoizar a lista filtrada para evitar recálculo a cada render
  const filteredList = useMemo(() => {
    if (!raffles) return [];
    
    const filtered = raffles.filter((raffle: { isActive: any }) =>
      raffleStatusFilter === 2
        ? !raffle.isActive
        : raffleStatusFilter === 1
        ? raffle.isActive
        : true
    );

    // Ordenação também memoizada
    return filtered.sort(
      (a: { id: number }, b: { id: number }) => Number(b.id) - Number(a.id)
    );
  }, [raffles, raffleStatusFilter]);

  // Memoizar o handler do select para evitar recriação
  const handleStatusFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRaffleStatusFilter(Number(e.target.value));
  }, []);

  // Memoizar o handler do botão para evitar recriação
  const handleCreateRaffleClick = useCallback(() => {
    // Função vazia mas memoizada para consistência
  }, []);

  return (
    <>
      {/* Monitor de Performance - só ativo em desenvolvimento */}
      <PerformanceMonitor componentName="Dashboard" />
      
      <Layout>
        <div className="flex flex-col mt-4 md:mt-0 md:ml-4 mx-auto w-4/5">
          {/*--USERNAME */}
          <div>
            <h1>
              Olá,
              <span className="font-bold">{user?.name}</span>
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
                onChange={handleStatusFilterChange}
              >
                <option value={1}>Em andamento</option>
                <option value={2}>Finalizadas</option>
              </select>

              {/* Button alinhado à direita */}
              <a href="/dashboard/rifa">
                <Button
                  text="Criar Rifa"
                  icon={<FaTicketAlt />}
                  onClick={handleCreateRaffleClick}
                  className="bg-green-600 hover:bg-green-800 shadow-xl shadow-black text-white py-2 px-4 rounded-full flex items-center justify-center w-50"
                  disabled={false}
                />
              </a>
            </div>

            {/*--RIFAS */}
            {!loading ? null : raffles?.length === 0 ? (
              <NoRaffle onClick={() => {}} />
            ) : (
              <CardRaffle raffles={filteredList} /> // Show raffles
            )}
          </div>
        </div>

        {/*--MODAL */}
        <ShowRaffle />
      </Layout>
    </>
  );
};

export default Dashboard;
