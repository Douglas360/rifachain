import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../admin/pages/Dashboard";
import Home from "../pages/Home";
import Raffle from "../admin/pages/Raffle";
import Ticket from "../admin/pages/Ticket";
import Transaction from "../admin/pages/Transaction";
import SupportPage from "../components/SupportPage";
import Setting from "../admin/pages/Setting";
import Loading from "../admin/components/Loading";
import Alert from "../admin/components/Alert";
import RafflePage from "../pages/Raffle";

export const AppRouter: React.FC = () => {
  const raffle = {
    title: "Rifa do iPhone 13",
    ticketPrice: "0.1",
    totalTickets: 100,
    ticketsSold: 50,
    totalReward: "5",
    progressWidth: 2,
  };
  return (
    <>
      <Loading />
      <Alert />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/rifa" element={<Raffle />} />
        <Route path="/dashboard/meus-tickets" element={<Ticket />} />
        <Route path="/dashboard/transacoes" element={<Transaction />} />
        <Route path="/dashboard/configuracao" element={<Setting />} />
        <Route path="/suporte" element={<SupportPage />} />
        <Route
          path="/s/:slug"
          element={
            <RafflePage
              title={raffle.title}
              ticketPrice={raffle.ticketPrice}
              totalTickets={raffle.totalTickets}
              ticketsSold={raffle.ticketsSold}
              totalReward={raffle.totalReward}
              progressWidth={raffle.progressWidth}
            />
          }
        />
      </Routes>
    </>
  );
};
