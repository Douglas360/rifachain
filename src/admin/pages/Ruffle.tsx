import React from "react";
import Layout from "../layout";
import { FaTicketAlt } from "react-icons/fa";
import Input from "../components/Input";
import Button from "../components/Button";

const Ruffle: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col mt-4 md:mt-0 md:ml-4 mx-auto w-4/5">
        <h1 className="flex flex-row">
          <FaTicketAlt className="text-4xl text-slate-800" />
          <span className="ml-2 text-slate-800 text-3xl font-bold">
            Criar Rifa
          </span>
        </h1>

        {/*--FORM */}
        <div className="mt-7">
          <form>
            <div className="flex flex-col">
              <Input
                label="Nome da rifa"
                placeholder="Ex: Rifa de 2.5 Ethereum"
                id="title"
              />
            </div>

            <div className="flex flex-col mt-4">
              <Input
                label="Total de bilhetes"
                placeholder="Ex: 100"
                type="number"
                id="totalTickets"
              />
            </div>

            <div className="flex flex-col mt-4">
              <Input
                label="Valor do bilhete"
                placeholder="Ex: 10"
                type="number"
                id="ticketPrice"
              />
            </div>

            <div className="flex flex-col mt-4">
              <Input
                label="Valor do prêmio"
                placeholder="Ex: 2.5"
                type="string"
                id="prizeValue"
              />
            </div>

            <div className="flex flex-col mt-4">
              <Input
                label="Descrição"
                type="textarea"
                placeholder="Ex: Rifa de 2.5 Ethereum"
                id="description"
              />
            </div>

            <span>
              <small className="text-slate-500 text-sm">
                A descrição é opcional
              </small>
            </span>

            {/*Ao criar essa rifa, você concorda com os termos de uso */}
            <div className="flex flex-row mt-4">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" className="ml-2 text-slate-700">
                Ao criar essa rifa, você concorda com os{" "}
                <a href="/termo-de-uso" className="text-primary font-bold">
                  termos de uso
                </a>
              </label>
            </div>

            <div className="flex flex-col mt-4">
              <Button
                text="Criar Rifa"
                icon={<FaTicketAlt />}
                onClick={() => {}}
                className="bg-primary hover:bg-[#bd255f] shadow-xl shadow-black  text-white py-2 px-4 rounded-full flex items-center justify-center mt-4 w-1/2 mx-auto"
                disabled={false}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Ruffle;
