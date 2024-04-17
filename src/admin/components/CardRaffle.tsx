import React, { useState } from "react";
import { Raffle } from "../../types/Raffle";
import Button from "./Button";
import {
  FaCheckCircle,
  FaClock,
  FaMoneyBill,
  FaShareSquare,
  FaTicketAlt,
} from "react-icons/fa";
import { setGlobalState } from "../../store";
import { withdrawReward } from "../../Blockchain.services";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
//import { encodeId } from "../../functions/encodeId";

const CardRaffle: React.FC<{ raffles: Raffle[] }> = ({ raffles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5); // Número inicial de registros por página

  // Calcular índices dos registros na página atual
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRaffles = raffles?.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const setRaflle = (raffle: Raffle) => {
    setGlobalState("raffles", raffle);
    setGlobalState("showModal", "scale-100");
  };

  const handleShareRaffle = (id: number) => {
    //const encodedId = encodeId(id);
    //const url = `/s/${encodedId}`;
    const url = `/s/${id}`;

    const newTab = window.open(url, "_blank");
    if (newTab) {
      newTab.focus();
    }
  };

  const handleWithdrawReward = async (id: number) => {
    await withdrawReward(id);
  };

  return (
    <>
      {currentRaffles?.map((raffle) => (
        <div
          key={raffle.id}
          className={`mt-4 w-full border border-slate-300 rounded-md p-2 ${
            raffle.isActive ? "" : "bg-slate-300"
          }`}
        >
          <div className="flex flex-row justify-between mb-2">
            <div className="flex flex-row">
              <img
                className="w-12 h-12 rounded-full"
                src={raffle.metadataURI}
                alt={raffle.title}
              />
              <h1 className="text-slate-800 text-lg font-bold ml-2 mt-2">
                {raffle.title}
              </h1>
            </div>

            <div>
              <span className="text-slate-500 text-sm">
                Criado{" "}
                {formatDistanceToNow(
                  new Date(parseInt(raffle.createdAt ?? "", 10) * 1000),
                  { addSuffix: true, locale: ptBR } // Adiciona sufixos como "ago" ou "from now"
                )}
              </span>
            </div>

            <div className="flex items-center">
              {raffle.isActive ? (
                <span className="text-slate-500 text-sm flex items-center">
                  <FaClock className="text-yellow-500 mr-1" /> Em andamento
                </span>
              ) : (
                <span className="text-slate-500 text-sm flex items-center">
                  <FaCheckCircle className="text-green-500 mr-1" /> Finalizada
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-between mt-3">
            <div>
              <span className="text-slate-500 text-sm">Total de bilhetes</span>
              <p className="text-slate-800 text-lg font-bold">
                {raffle.totalTickets}
              </p>
            </div>
            <div>
              <span className="text-slate-500 text-sm">Bilhetes vendidos</span>
              <p className="text-slate-800 text-lg font-bold">
                {raffle.ticketsSold}
              </p>
            </div>

            <div className="hidden md:block lg:block">
              <span className=" text-slate-500 text-sm">Preço do bilhete</span>
              <div className="flex flex-row">
                <img
                  className="w-6 h-8 rounded-full mr-2"
                  src="https://cryptologos.cc/logos/thumbs/ethereum.png?v=030"
                  alt="Polygon Matic"
                />
                <p className="text-slate-800 text-lg font-bold">
                  {raffle.ticketPrice}
                </p>
              </div>
            </div>
            {
              <div>
                <span className="text-slate-500 text-sm">
                  Bilhetes disponíveis
                </span>
                <p className="text-slate-800 text-lg font-bold">
                  {raffle.ticketAvaible}
                </p>
              </div>
            }
            <div>
              <span className="text-slate-500 text-sm">Valor do Prêmio</span>
              <div className="flex flex-row">
                <img
                  className="w-6 h-8 rounded-full mr-2"
                  src="https://cryptologos.cc/logos/thumbs/ethereum.png?v=030"
                  alt="Polygon Matic"
                />
                <p className="text-slate-800 text-lg font-bold">
                  {raffle.totalReward}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end mt-4">
            <Button
              text="Ver Rifa"
              icon={<FaTicketAlt />}
              onClick={() => setRaflle(raffle)}
              className="bg-primary hover:bg-[#bd255f] shadow-xl shadow-black text-white py-2 px-4 mr-1 rounded-full flex items-center justify-center"
              disabled={false}
            />
            {raffle.isActive ? (
              <Button
                text="Compartilhar Rifa"
                icon={<FaShareSquare />}
                onClick={() => handleShareRaffle(Number(raffle.id))}
                className="bg-green-600 hover:bg-green-800 shadow-xl shadow-black text-white py-2 px-4 rounded-full flex items-center justify-center"
                disabled={false}
              />
            ) : (
              <Button
                text={raffle.isWithdrawn ? "Saldo sacado" : "Sacar Prêmio"}
                icon={<FaMoneyBill />}
                onClick={() => handleWithdrawReward(Number(raffle.id))}
                className={`${
                  raffle.isWithdrawn
                    ? "bg-slate-400"
                    : "bg-green-600 hover:bg-green-800"
                }  shadow-xl shadow-black text-white py-2 px-4 rounded-full flex items-center justify-center`}
                disabled={raffle.isWithdrawn ? true : false}
              />
            )}
          </div>

          {/* Barra de progresso */}
          {!raffle.isActive ? null : raffle.ticketsSold === 0 ? (
            <span className="text-slate-500 text-sm mt-2 block text-center">
              Nenhum bilhete vendido
            </span>
          ) : (
            <div className="bg-slate-300 h-3 rounded-full mt-2 relative">
              <div
                className={`${
                  raffle.progressWidth === 100
                    ? "bg-green-500 h-3 rounded-full"
                    : "bg-primary h-3 rounded-full"
                }`}
                style={{
                  width: `${raffle.progressWidth}%`,
                  transition: "width 1s ease-in-out",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                {/* Texto de progresso */}
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  {raffle.progressWidth}%
                </span>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Componente de Paginação */}
      <Pagination
        recordsPerPage={recordsPerPage}
        totalRecords={raffles?.length}
        paginate={paginate}
        currentPage={currentPage}
        setRecordsPerPage={setRecordsPerPage}
      />
    </>
  );
};

export default CardRaffle;

interface PaginationProps {
  recordsPerPage: number;
  totalRecords: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  setRecordsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  recordsPerPage,
  totalRecords,
  paginate,
  currentPage,
  setRecordsPerPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleRecordsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRecordsPerPage(parseInt(e.target.value));
    paginate(1); // Resetar para a primeira página ao mudar o número de registros por página
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <div>
        <select
          className="px-2 py-1 border border-primary rounded text-primary bg-white shadow-md"
          value={recordsPerPage}
          onChange={handleRecordsPerPageChange}
        >
          <option value={5}>5 registros por página</option>
          <option value={10}>10 registros por página</option>
          <option value={20}>20 registros por página</option>
        </select>
      </div>
      <div>
        <ul className="flex">
          {pageNumbers?.map((number) => (
            <li key={number}>
              <Button
                text={number.toString()}
                onClick={() => paginate(number)}
                className={`${
                  currentPage === number
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                } px-3 py-1 border border-primary rounded mr-1 shadow-md`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
