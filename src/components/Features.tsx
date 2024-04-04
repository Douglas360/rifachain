import React from "react";

const Features = () => {
  return (
    <div id="features" className="min-h-screen bg-purple bg-features ">
      <div
        className="w-4/5 py-10 mx-auto flex flex-col md:flex-row justify-between 
    items-center"
      >
        {/*---FEATURES-CARDS- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {/* CARD 1 */}
          <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-black transform hover:scale-105 transition duration-300">
            <img
              src="https://pixner.net/rifa1/demo/assets/images/icon/feature/1.png"
              alt="Serviço Seguro"
            />
            <div className="text-white text-4xl mb-4 text-center">
              Serviço Seguro
            </div>
            <p className="text-white text-center">
              Mantenha suas informações protegidas com nosso serviço seguro.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-red-400 transform hover:scale-105 transition duration-300 ">
            <img
              src="https://pixner.net/rifa1/demo/assets/images/icon/feature/3.png"
              alt="Network Segura"
            />
            <div className="text-white text-4xl mb-4">Blockchain</div>
            <p className="text-white text-center">
              Utilizamos tecnologia blockchain para garantir uma rede segura e
              confiável.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-blue-500 transform hover:scale-105 transition duration-300 ">
            <img
              src="https://pixner.net/rifa1/demo/assets/images/icon/feature/2.png"
              alt="Icon"
            />
            <div className="text-white text-4xl mb-4">Segurança</div>
            <p className="text-white text-center">
              Priorizamos a segurança em todas as nossas operações.
            </p>
          </div>

          {/* CARD 4 */}
          <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-primary transform hover:scale-105 transition duration-300 ">
            <img
              src="https://pixner.net/rifa1/demo/assets/images/icon/feature/4.png"
              alt="Suporte"
            />
            <div className="text-white text-4xl mb-4">Suporte</div>
            <p className="text-white text-center">
              Oferecemos suporte dedicado para garantir que você tenha a melhor
              experiência possível com nossos serviços.
            </p>
          </div>
        </div>

        {/*---FEATURES-TEXT- */}
        <div className="ml-4">
          <p className="text-yellow-500 font-bold text-2xl">
            Uma exaustiva lista de
          </p>
          <h1 className="text-white font-bold text-4xl">
            NOSSAS FUNCIONALIDADES
          </h1>
          <div className="mt-6 transform ">
            <span className="text-white cursor-pointer">
              Mostre todas as funcionalidades{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
