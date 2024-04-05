import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../admin/pages/Dashboard";
import Home from "../pages/Home";
import Ruffle from "../admin/pages/Ruffle";
import Ticket from "../admin/pages/Ticket";
import Transaction from "../admin/pages/Transaction";
import SupportPage from "../components/SupportPage";
import Setting from "../admin/pages/Setting";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/minhas-rifas" element={<Ruffle />} />
      <Route path="/dashboard/meus-tickets" element={<Ticket />} />
      <Route path="/dashboard/transacoes" element={<Transaction />} />
      <Route path="/dashboard/configuracao" element={<Setting />} />
      <Route path="/suporte" element={<SupportPage />} />
    </Routes>
  );
};
