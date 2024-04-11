import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <img src={logo} alt="Logo" className="w-24 h-auto mb-6" />

          {/* Colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Coluna 1 */}
            <div>
              <h3 className="text-xl font-bold mb-4">Links úteis</h3>
              <ul className="list-disc pl-6">
                <li>
                  <a href="/">Perguntas frequentes</a>
                </li>
                <li>
                  <a href="/">Termos de serviço</a>
                </li>
                <li>
                  <a href="/">Política de privacidade</a>
                </li>
                <li>
                  <a href="/">Contato</a>
                </li>
              </ul>
            </div>

            {/* Coluna 2 */}
            <div>
              <h3 className="text-xl font-bold mb-4">Sobre nós</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            {/* Coluna 3 */}
            <div>
              <h3 className="text-xl font-bold mb-4">Redes sociais</h3>
              <ul className="list-disc pl-6">
                <li>
                  <a href="/">Facebook</a>
                </li>
                <li>
                  <a href="/">Twitter</a>
                </li>
                <li>
                  <a href="/">Instagram</a>
                </li>
              </ul>
            </div>

            {/* Coluna 4 */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <p>Endereço: Av. Exemplo, 123</p>
              <p>Telefone: (00) 1234-5678</p>
              <p>Email: exemplo@example.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-slate-600 pt-6 text-center">
        <p>&copy; 2024 Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
