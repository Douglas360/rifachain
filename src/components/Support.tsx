import React from "react";

const Support = () => {
  return (
    <section className="gradient-bg-hero min-h-132.5 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            Conte com o nosso suporte!
          </h2>
          <p className="text-lg mb-8">
            Qualquer dúvida que tiver, entre em contato conosco através do
            WhatsApp.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=SEU_NUMERO_DE_TELEFONE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-pink-800 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Falar com o suporte!
          </a>
        </div>
      </div>
    </section>
  );
};

export default Support;
