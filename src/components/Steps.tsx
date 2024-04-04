import React from "react";

const Steps = () => {
  return (
    <div className="bg-[#151c25] gradient-bg-steps min-h-screen">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold text-center">
          Veja como é fácil criar sua rifa
        </h4>
        <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-center">
          Praticidade e simplicidade para criar com tranquilidade as suas
          campanhas
        </p>

        {/*---STEP-- */}
        <div className="max-w-2xl xl:max-w-none mx-auto mt-16 md:mt-20 grid 2xs:grid-cols-2 xl:grid-cols-3 2xs:justify-items-center align-center justify-center items-start gap-y-10 gap-x-4 sm:gap-x-28 sm:gap-y-6">
          <div className="min-h-70 2xs:text-center text-center bg-gray-100 p-6 rounded-lg shadow-md shadow-primary">
            <div className="w-20 md:w-20 lg:w-24 mx-auto rounded-full border border-slate-50 p-2 hover:opacity-75 transition duration-300 ease-in-out transform hover:scale-105  hover:border-transparent">
              <img
                className="w-full h-full rounded-full  hover:opacity-75 transition duration-300 ease-in-out transform hover:scale-105
              bg-primary p-2"
                src="https://pixner.net/rifa1/demo/assets/images/icon/play/1.png"
                alt="Imagem do painel"
              />
            </div>

            <h3 className="font-display text-white font-bold text-xl mb-4 mt-4">
              Crie
            </h3>
            <p className="text-slate-300">Preencha os campos de sua campanha</p>
          </div>

          <div className="min-h-70 2xs:text-center text-center bg-gray-100 p-6 rounded-lg shadow-md shadow-primary">
            <div className="w-20 md:w-20 lg:w-24 mx-auto rounded-full border border-slate-50 p-2 hover:opacity-75 transition duration-300 ease-in-out transform hover:scale-105  hover:border-transparent">
              <img
                className="w-full h-full rounded-full  hover:opacity-75 transition duration-300 ease-in-out transform hover:scale-105
              bg-primary p-2"
                src="https://pixner.net/rifa1/demo/assets/images/icon/play/2.png"
                alt="Imagem do painel"
              />
            </div>

            <h3 className="font-display text-white font-bold text-xl mb-4 mt-4">
              Compartilhe
            </h3>
            <p className="text-slate-300">
              Compartilhe o link da sua campanha{" "}
            </p>
          </div>

          <div className="min-h-70 2xs:text-center text-center bg-gray-100 p-6 rounded-lg shadow-md shadow-primary">
            <div className="w-20 md:w-20 lg:w-24 mx-auto rounded-full border border-slate-50 p-2 hover:opacity-75 transition duration-300 ease-in-out transform hover:scale-105  hover:border-transparent">
              <img
                className="w-full h-full rounded-full  hover:opacity-75 transition duration-300 ease-in-out transform hover:scale-105
              bg-primary p-2"
                src="https://pixner.net/rifa1/demo/assets/images/icon/play/3.png"
                alt="Imagem do painel"
              />
            </div>

            <h3 className="font-display text-white font-bold text-xl mb-4 mt-4">
              Arrecade
            </h3>
            <p className="text-slate-300">
              Toda a arrecadação vai para você! *
            </p>
            <p className="text-xs text-slate-400">
              Cobramos uma taxa de apenas 10%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
