import React, { FC, MouseEventHandler } from "react";
import { FaRegSadCry, FaTicketAlt } from "react-icons/fa";
import Button from "./Button";

interface NoRaffleProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const NoRaffle: FC<NoRaffleProps> = ({ onClick }) => {
  return (
    <div className="mt-4 w-full border border-slate-300 rounded-md p-2">
      <FaRegSadCry className="text-5xl text-slate-800 mx-auto mt-4" />
      <p className="text-center text-slate-700 text-xl">
        Nenhuma rifa encontrada
      </p>
      <a href="/dashboard/rifa">
        <Button
          text="Criar Rifa"
          icon={<FaTicketAlt />}
          onClick={onClick} // Passa a propriedade onClick recebida para o botão
          className="bg-primary hover:bg-[#bd255f] shadow-xl shadow-black text-white py-2 px-4 rounded-full flex items-center justify-center mt-4 w-1/2 mx-auto"
          disabled={false}
        />
      </a>
    </div>
  );
};

export default NoRaffle;
