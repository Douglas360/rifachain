import React from "react";
import { Raffle } from "../types/Raffle";
import { BiTransfer } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";
import { truncate } from "../store";
import { MATIC_BLOCK_EXPLORER_URL_TESTNET } from "../constants";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

const RafflePage: React.FC<Raffle> = (raffle: Raffle) => {
  //GET ID FROM URL PARAMS AND FETCH RAFFLE DATA FROM API USING ID
  const { slug } = useParams<{ slug: string }>();
  const id = slug;
  //FETCH RAFFLE DATA USING ID
  // const raffle = fetchRaffle(id);
  // const { title, ticketPrice, totalTickets, ticketsSold, totalReward, progressWidth } = raffle;
  // const transaction = fetchTransactions(id);
  const {
    title,
    ticketPrice,
    totalTickets,
    ticketsSold,
    totalReward,
    progressWidth,
  } = raffle;
  const transaction = [
    {
      id: 1,
      user: "0x1234567890abcdef1234567890abcdef1234567890abcdef",
      cost: "0.1",
      tx: "0x38dc38caa31961fa59e78e6fc63bd11ba7cc48445615e65d949f84c80824a982",
      timeStamp: "27 min ago",
    },
    {
      id: 2,
      user: "0x1234567890abcdef1234567890abcdef1234567890abcdef",
      cost: "0.1",
      tx: "0x9d798c0c5453d7c280fdf36ae279bb79aa827543a1723aaf4be4583132e64aeb",
      timeStamp: "1 hour ago",
    },
    {
      id: 3,
      user: "0xabcedf1234567890abcdef1234567890abcdef1234",
      cost: "0.2",
      tx: "0xd6c34ab7b7deaf26308a087aaec1776752c547dd6a184a561450389645098b6d",
      timeStamp: "2 hours ago",
    },
    {
      id: 4,
      user: "0x0fedcba09876543210fedcba09876543210fedcba",
      cost: "1.5",
      tx: "0x38dc38caa31961fa59e78e6fc63bd11ba7cc48445615e65d949f84c80824a982",
      timeStamp: "5 hours ago",
    },
    {
      id: 5,
      user: "0x0123456789abcdef0123456789abcdef012345",
      cost: "0.01",
      tx: "0xd6c34ab7b7deaf26308a087aaec1776752c547dd6a184a561450389645098b6d",
      timeStamp: "10 hours ago",
    },
    {
      id: 6,
      user: "0x9876543210fedcba9876543210fedcba987654",
      cost: "5.0",
      tx: "0xd6c34ab7b7deaf26308a087aaec1776752c547dd6a184a561450389645098b6d",
      timeStamp: "1 day ago",
    },
    {
      id: 7,
      user: "0xfededcba0987654321fedcba0987654321fedcb",
      cost: "0.75",
      tx: "0xd6c34ab7b7deaf26308a087aaec1776752c547dd6a184a561450389645098b6d",
      timeStamp: "1 day ago",
    },
    {
      id: 8,
      user: "0xabcdef0123456789abcdef0123456789abcdef",
      cost: "2.22",
      tx: "0xd6c34ab7b7deaf26308a087aaec1776752c547dd6a184a561450389645098b6d",
      timeStamp: "2 days ago",
    },
    {
      id: 9,
      user: "0x543210fedcba9876543210fedcba98765432",
      cost: "0.05",
      tx: "0xd6c34ab7b7deaf26308a087aaec1776752c547dd6a184a561450389645098b6d",
      timeStamp: "3 days ago",
    },
    {
      id: 10,
      user: "0xffffffff00000000ffffffff00000000ffffffff",
      cost: "10.0",
      tx: "0xd6c34ab7b7deaf26308a087aaec1776752c547dd6a184a561450389645098b6d",
      timeStamp: "1 week ago",
    },
  ];
  // mock data
  return (
    <>
      <div className="bg-black p-5 min-h-screen ">
        <div className="w-full md:w-4/5 flex flex-col md:flex-row  justify-center mx-auto border border-primary rounded-lg shadow shadow-primary">
          {/*LEFT COLUMN */}
          <div className="w-full md:w-1/2 p-5">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://cdn.pixabay.com/photo/2017/03/20/19/16/track-crisscross-2160059_1280.jpg"
              alt="Rifa do iPhone 13"
            />
          </div>

          {/*RIGHT COLUMN */}
          <div className="w-ful md:w-1/2 p-5">
            <h1 className="text-4xl text-white">{title}</h1>
            <p className="text-white mt-5">
              Preço do ticket: {ticketPrice} ETH
            </p>
            <p className="text-white">Total de tickets: {totalTickets}</p>
            <p className="text-white">Tickets vendidos: {ticketsSold}</p>
            <p className="text-white">Recompensa total: {totalReward} ETH</p>
            <div className="w-full bg-white h-2 mt-5 rounded-full">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${progressWidth}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-5">
              <p className="text-white">0%</p>
              <p className="text-white">50%</p>
              <p className="text-white">100%</p>
            </div>
            <h1 className="text-4xl text-white">Comprar ticket</h1>
            <input
              type="number"
              className="w-full p-2 mt-5 rounded-lg"
              placeholder="Quantidade de tickets"
            />
            <span className="text-slate-300 mt-5 text-sm">
              Quantidade estimada de ETH: {Number(ticketPrice) * totalTickets}{" "}
              ETH
            </span>
            <button className="w-full p-2 mt-5 bg-primary text-white rounded-lg">
              Comprar
            </button>
          </div>
        </div>

        {/*LATESTS TRANSACTIONS */}
        <div className="w-full mt-2 md:w-4/5 flex flex-col items-center justify-center mx-auto border border-primary rounded-lg shadow shadow-primary">
          <h4 className="text-white text-3xl font-bold uppercase text-gradient mt-2">
            {transaction.length !== 0
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
            {transaction?.map((tx: any) => (
              <>
                <div
                  key={tx.id}
                  className="flex justify-between w-full  md:overflow-hidden p-2 text-slate-300"
                >
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
                    <span className="text-pink-500">{tx.timeStamp}</span>
                  </small>
                </div>

                {/*divider */}
                <div className="w-full bg-slate-500 h-0.5"></div>
              </>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RafflePage;
