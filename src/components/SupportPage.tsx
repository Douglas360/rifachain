import React from "react";
import { FiMail, FiPhone, FiHelpCircle } from "react-icons/fi";
import Header from "./Header";

const SupportPage = () => {
  return (
    <>
      <div className="gradient-bg-hero">
        <Header />
      </div>
      <div className="bg-[#151c25] min-h-screen text-white">
        <div className="w-full max-w-4xl mx-auto py-10">
          <h1 className="text-3xl font-bold text-center mb-8">Suporte</h1>

          {/* Informações de contato */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg flex items-center">
              <FiMail className="text-3xl mr-4" />
              <div>
                <h2 className="text-xl font-bold mb-2">E-mail</h2>
                <p>support@example.com</p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg flex items-center">
              <FiPhone className="text-3xl mr-4" />
              <div>
                <h2 className="text-xl font-bold mb-2">Telefone</h2>
                <p>+55 123456789</p>
              </div>
            </div>
          </div>

          {/* Formulário de contato */}
          <div className="bg-gray-800 p-6 rounded-lg mt-6">
            <h2 className="text-2xl font-bold mb-4">Formulário de Contato</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-bold mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-bold mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-lg font-bold mb-2"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-primary py-2 px-4 rounded-lg text-lg font-bold hover:bg-opacity-80"
              >
                Enviar
              </button>
            </form>
          </div>

          {/* Informações adicionais */}
          <div className="mt-6 text-gray-400 text-center">
            <p>Horário de atendimento: Segunda a sexta, das 9h às 18h.</p>
            <p>Entre em contato conosco se precisar de assistência!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportPage;
