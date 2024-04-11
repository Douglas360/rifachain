import React, { useEffect, useState } from "react";

import { Raffle } from "../types/Raffle";
import { MdOpenInNew } from "react-icons/md";
import { setAlert, setGlobalState, setLoadingMsg, truncate } from "../store";
import { MATIC_BLOCK_EXPLORER_URL_TESTNET } from "../constants";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import {
  buyTicket,
  fetchRaflle,
  connectWallet,
  updateTransaction,
} from "../Blockchain.services";
import { getGlobalState } from "../store";
import Button from "../admin/components/Button";

const RafflePage: React.FC = () => {
  const user = getGlobalState("connectedAccount");
  //GET ID FROM URL PARAMS AND FETCH RAFFLE DATA FROM API USING ID
  const { slug } = useParams<{ slug: string }>();
  //const id = decodeId(slug ?? "");
  const id = slug;
  const [raffle, setRaffle] = useState<Raffle>();
  const [ticketBuy, setTicketBuy] = useState<number>(1);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchRaflle(Number(id));
      if (res) {
        setRaffle(res);
      }
    };

    fetchData();
  }, [id]);

  const transactionHash = getGlobalState("transactions");
  //  console.log(transactionHash[0].timeStamp.toString());
  const {
    title,
    metadataURI,
    ticketPrice,
    totalTickets,
    ticketsSold,
    totalReward,
    progressWidth,
  } = raffle || {
    title: "",
    ticketPrice: "",
    totalTickets: 0,
    ticketsSold: 0,
    totalReward: "",
    progressWidth: 0,
  };

  const handleDecrease = () => {
    if (ticketBuy > 1) {
      setTicketBuy(ticketBuy - 1);
      //TODO: CALCULATE VALUE
    }
  };

  const handleIncrease = () => {
    setTicketBuy(ticketBuy + 1);
  };

  const handleBuyTicket = async () => {
    const value = Number(ticketPrice) * ticketBuy;

    setGlobalState("loading", { show: true, msg: "Comprando bilhete." });
    setLoadingMsg("Comprando bilhete...");
    const transactionReceipt = await buyTicket(
      Number(id),
      ticketBuy,
      value.toString()
    );

    if (transactionReceipt && transactionReceipt.status) {
      // Atualiza a transação no contrato
      const id = Number();
      const tx = transactionReceipt.transactionHash;
      await updateTransaction(id, tx);
      // Se a transação foi bem-sucedida (status = true), exibe mensagem de sucesso
      setAlert("Bilhete comprado com sucesso!", "green");
    } else {
      // Se a transação falhou ou não foi confirmada, exibe mensagem de erro
      setAlert(
        "Falha ao comprar o bilhete. Tente novamente mais tarde.",
        "red"
      );
    }

    //TODO: check if buy return mined and execution succeed or failed
  };

  const handleConnectWallet = async () => {
    await connectWallet();
  };
  return (
    <>
      <div className="bg-black p-5 min-h-screen ">
        <div className="w-full md:w-4/5 flex flex-col md:flex-row  justify-center mx-auto border border-primary rounded-lg shadow shadow-primary">
          {/*LEFT COLUMN */}
          <div className="w-full md:w-1/2 p-5">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={metadataURI}
              alt={title}
            />
          </div>

          {/*RIGHT COLUMN */}
          <div className="w-ful md:w-1/2 p-5">
            <h1 className="text-4xl text-white">{title}</h1>
            <p className="text-white mt-5">
              Preço do ticket: {ticketPrice} ETH
            </p>
            <p className="text-white">Recompensa total: {totalReward} ETH</p>

            {/*PROGRESS BAR */}
            {ticketsSold === 0 ? (
              <span className="text-slate-500 text-sm mt-2 block text-center">
                Nenhum bilhete vendido
              </span>
            ) : (
              <>
                <div className="bg-slate-300 h-3 rounded-full mt-5 relative">
                  <div
                    className={`${
                      progressWidth === 100
                        ? "bg-green-500 h-3 rounded-full"
                        : "bg-primary h-3 rounded-full"
                    }`}
                    style={{
                      width: `${progressWidth}%`,
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
                      {progressWidth}%
                    </span>
                  </div>
                </div>
                <small>
                  <span className="text-slate-300">
                    {ticketsSold}/{totalTickets} tickets vendidos
                  </span>
                </small>
              </>
            )}

            <h1 className="text-3xl text-white md:mt-3">Comprar ticket</h1>
            {/*<input
              type="number"
              className="w-full p-2 mt-5 rounded-lg"
              placeholder="Quantidade de tickets"
          />*/}
            <div>
              <div className="flex flex-row justify-between items-center mt-5">
                <button
                  onClick={handleDecrease}
                  className="bg-primary text-white p-2 rounded-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  value={ticketBuy}
                  className="w-1/2 p-2 text-center rounded-lg"
                  readOnly
                />
                <button
                  onClick={handleIncrease}
                  className="bg-primary text-white p-2 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
            <small className="text-slate-300 mt-5 ">
              Quantidade estimada de ETH: {Number(ticketPrice) * ticketBuy} ETH
            </small>
            {user ? (
              <Button
                text="Comprar"
                onClick={handleBuyTicket}
                className="w-full p-2 mt-5 bg-primary text-white rounded-lg hover:bg-[#bd255f]"
                disabled={false}
              />
            ) : (
              <Button
                text="Conectar Carteira"
                onClick={handleConnectWallet}
                className="w-full p-2 mt-5 bg-primary text-white rounded-lg hover:bg-[#bd255f]"
                disabled={false}
              />
            )}
          </div>
        </div>

        {/*LATESTS TRANSACTIONS */}
        <div className="w-full mt-2 md:w-4/5 flex flex-col items-center justify-center mx-auto border border-primary rounded-lg shadow shadow-primary">
          <h4 className="text-white text-3xl font-bold uppercase text-gradient mt-2">
            {transactionHash.length !== 0
              ? "Últimas transações"
              : "Sem transações disponíveis"}
          </h4>

          <div className="w-4/5 py-2.5">
            <div className="flex justify-between  w-full text-slate-300 text-sm">
              <p className="hidden md:block">Usuário</p>
              <p>Transação</p>
              <p className="hidden md:block">Custo</p>
              <p>Tempo</p>
            </div>
            {transactionHash?.map((tx: any) => (
              <div key={tx.id}>
                <div className="flex justify-between w-full  md:overflow-hidden p-2 text-slate-300">
                  {/*user */}
                  <small className="hidden md:block">
                    <span className="flex flex-row justify-start items-center text-pink-500 ">
                      {truncate(tx.user, 4, 4, 11)}
                    </span>
                  </small>

                  {/*tx */}
                  <small>
                    <span className="flex flex-row ">
                      <a
                        href={`${MATIC_BLOCK_EXPLORER_URL_TESTNET}tx/${tx.tx}`}
                        className="text-pink-500 mr-2"
                      >
                        {tx.tx.slice(0, 10)}...{tx.tx.slice(-10)}
                      </a>
                      <a
                        href={`${MATIC_BLOCK_EXPLORER_URL_TESTNET}tx/${tx.tx}`}
                      >
                        <MdOpenInNew />
                      </a>
                    </span>
                  </small>

                  {/*cost */}
                  <small className="hidden md:block">
                    <span className="text-pink-500">{tx.cost} ETH</span>
                  </small>

                  {/*time */}
                  <small>
                    <span className="text-pink-500">
                      {tx.timeStamp.toString()}
                    </span>
                  </small>
                </div>

                {/*divider */}
                <div className="w-full bg-slate-500 h-0.5"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RafflePage;
