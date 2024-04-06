import React from "react";
import Layout from "../layout";
import { FaTicketAlt } from "react-icons/fa";
import { FaRegSadCry } from "react-icons/fa";
import Button from "../components/Button";

const Dashboard: React.FC = () => {
  const rifas = [
    {
      id: 1,
      title: "Rifa do Iphone 12",
      status: "Em andamento",
      totalTickets: 100,
      ticketsSold: 50,
      ticketPrice: 10,
      drawDate: "2021-10-10",
    },
    {
      id: 2,
      title: "Rifa do Iphone 12",
      status: "Finalizada",
      totalTickets: 100,
      ticketsSold: 100,
      ticketPrice: 10,
      drawDate: "2021-10-10",
    },
  ];
  const noRifas = 0;
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

          <div className="relative mt-2 w-50">
            <select
              className="appearance-none w-full border border-black bg-white px-4 py-2 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:shadow-outline"
              name="status"
            >
              <option value="1">Em andamento</option>
              <option value="2">Finalizadas</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 12.707a1 1 0 001.414-1.414L6.707 8.586a1 1 0 00-1.414 1.414l3.293 3.293zm1.414-1.414a1 1 0 01-1.414 1.414L8.586 9.293a1 1 0 011.414-1.414l1.707 1.707z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/*--RIFAS */}
          {noRifas === 0 ? noRuffles() : null}
        </div>
      </div>
    </Layout>
  );
};

const noRuffles = () => {
  return (
    <div className="mt-4 w-full border border-slate-300 rounded-md p-2">
      <FaRegSadCry className="text-5xl text-slate-800 mx-auto mt-4" />
      <p className="text-center text-slate-700 text-xl">
        Nenhuma rifa encontrada
      </p>
      <a href="/dashboard/minhas-rifas">
        <Button
          text="Criar Rifa"
          icon={<FaTicketAlt />}
          onClick={() => {}}
          className="bg-primary hover:bg-[#bd255f] shadow-xl shadow-black  text-white py-2 px-4 rounded-full flex items-center justify-center mt-4 w-1/2 mx-auto"
          disabled={false}
        />
      </a>
    </div>
  );
};

export default Dashboard;
