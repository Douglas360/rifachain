import React from "react";

const FAQ = () => {
  return (
    <div id="faq" className="bg-[#151c25] gradient-bg-steps min-h-screen">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold text-center mb-8">
          Perguntas frequentes
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1 */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-md shadow-primary">
            <h3 className="text-xl font-bold mb-4 text-white">
              Preciso de autorização para fazer uma campanha?
            </h3>
            <p className="text-slate-300 mb-6">
              As leis e regras podem variar dependendo do país ou região onde a
              campanha será realizada, então é importante verificar as normas
              locais antes de organizar uma campanha. No Brasil 🇧🇷, O SECAP
              (Secretaria de Avaliação, Planejamento, Energia e Loteria do
              Ministério da Economia) é o órgão que atua na fiscalização e
              autorização de campanhas promocionais. Regularizar uma campanha
              promocional exige alguns critérios que você deve seguir para
              conseguir essa regularização. O pedido de autorização deverá ser
              formulado por intermédio do Sistema de Controle de Promoção
              Comercial (SCPC). Em caso de dúvidas consulte os canais de
              atendimento do SCPC que funcionam 24 horas por dia, nos 7 dias da
              semana na Central de Atendimento Telefônico 0800-978 2332.
            </p>
          </div>

          {/* Coluna 2 */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-md shadow-primary">
            <h3 className="text-xl font-bold mb-4 text-white">
              Vocês cobram alguma taxa pelas colaborações feitas?
            </h3>
            <p className="text-slate-300 mb-6">
              Sim, nós cobramos uma taxa de 10% sobre o valor arrecadado em cada
              campanha.
            </p>

            <h3 className="text-xl font-bold mb-4 text-white">
              Como recebo as colaborações?
            </h3>
            <p className="text-slate-300 mb-6">
              Você recebe os pagamentos diretamente na sua carteira, a nossa
              plataforma não fica com o seu dinheiro, antes de criar as
              campanhas você já cadastra com sua carteira.
            </p>
          </div>

          {/* Coluna 3 */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-md shadow-primary">
            <h3 className="text-xl font-bold mb-4 text-white">
              Quantas campanhas eu posso fazer?
            </h3>
            <p className="text-slate-300 mb-6">
              Você pode fazer quantas campanhas achar necessário.
            </p>

            <h3 className="text-xl font-bold mb-4 text-white">
              A plataforma Rifa Chain organiza as campanhas?
            </h3>
            <p className="text-slate-300 mb-6">
              Não, a responsabilidade pela criação das campanhas é dos
              organizadores, não cabendo à plataforma requerer eventuais
              autorizações e o organizador entender necessária de sua campanha.
              Nós da plataforma Rifa Chain, oferecemos somente a infraestrutura
              exclusiva a organizadores de campanhas de financiamento coletivo
              beneficente.
            </p>
          </div>
        </div>
        <p className="text-center mt-8 text-slate-300">
          Se você não conseguiu encontrar a sua pergunta, entre em contato
          conosco através do nosso suporte.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
