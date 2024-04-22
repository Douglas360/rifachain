import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { getRaffleUser } from "../../context/Blockchain.services";
import { setGlobalState, useGlobalState } from "../../store";
import { FaCheckCircle, FaClock } from "react-icons/fa";

const Ticket: React.FC = () => {
  const [loading] = useGlobalState("loading");
  const [account] = useGlobalState("connectedAccount");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setGlobalState("loading", { show: true, msg: "Carregando tickets..." }); // Ativar indicador de carregamento

        if (account) {
          //console.log("Fetching raffles");
          const fetchTickets = await getRaffleUser(account);
          //);
          setTickets(fetchTickets || {}); // Update the type of setTickets to accept void as a valid value
        }
      } catch (error) {
        console.error("Error fetching raffles:", error);
      } finally {
        setGlobalState("loading", { show: false, msg: "" }); // Desativar indicador de carregamento
      }
    };

    fetchData();
  }, [account]);
  return (
    <Layout>
      <div className="flex flex-col mt-4 md:mt-0 md:ml-4 mx-auto w-4/5">
        <h2 className="text-2xl font-bold text-center mb-4 text-slate-800">
          Rifas que estou participando
        </h2>

        {loading.show ? null : (
          <>
            {tickets.length === 0 ? (
              <div className="mt-4 w-full border border-slate-300 rounded-md p-2">
                <FaClock className="text-5xl text-slate-800 mx-auto mt-4" />
                <p className="text-center text-slate-700 text-xl">
                  Nenhum ticket encontrado
                </p>
              </div>
            ) : (
              <>
                {tickets?.map((ticket: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-4 mb-4"
                  >
                    {/* RIFA NAME AND STATUS */}
                    <div className="flex justify-between items-center mb-2">
                      <img
                        src={ticket.raffleInfo.image}
                        alt="Rifa"
                        className="w-15 h-15 rounded-full"
                      />
                      <a
                        href={`/s/${ticket.raffleId}`}
                        className="text-lg font-bold text-primary"
                      >
                        {ticket.raffleInfo.title}
                      </a>
                      <span className="text-slate-800">
                        Prêmio:{" "}
                        <span className="font-bold">
                          {ticket.raffleInfo.reward} ETH
                        </span>
                      </span>
                      {ticket.raffleInfo.status ? (
                        <span className="hidden text-slate-500 text-sm md:flex items-center">
                          <FaClock className="text-yellow-500 mr-1" /> Em
                          andamento
                        </span>
                      ) : (
                        <span className="hidden text-slate-500 text-sm md:flex items-center">
                          <FaCheckCircle className="text-green-500 mr-1" />{" "}
                          Finalizada
                        </span>
                      )}

                      {/*WINNER */}
                      {ticket.raffleInfo.status ? null : (
                        <span className="text-slate-800 text-sm font-bold">
                          {ticket.raffleInfo.winner.toLocaleLowerCase() ===
                          account.toLocaleLowerCase() ? (
                            <span className="text-green-500 border border-slate-400 rounded-full p-1">
                              Parabéns! Você foi o vencedor!
                            </span>
                          ) : (
                            <span className="text-red-500 border border-slate-400 rounded-full p-1">
                              Infelizmente você não foi o vencedor
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                    {/* LINE DIVIDER */}
                    <div className="border-b border-primary mb-2"></div>

                    {/* MY TICKETS */}
                    <h4 className="text-lg font-bold mb-2 text-slate-800">
                      Meus bilhetes
                    </h4>
                    <div className="flex flex-wrap">
                      {ticket.tickets.map((myTicket: any, index: number) => (
                        <div
                          key={index}
                          className="bg-primary text-white rounded-full mr-2 mb-2 py-2 px-3 text-center cursor-pointer"
                          style={{ minWidth: "2.5rem" }}
                        >
                          <span className="text-lg font-bold">
                            {myTicket.ticketNumber}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Ticket;
