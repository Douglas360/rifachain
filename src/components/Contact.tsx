import React, { FormEvent } from "react";

const Contact: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para lidar com o envio do formulário
    console.log("Formulário enviado!");
  };

  return (
    <div
      id="contact"
      className=" min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: "linear-gradient(to right, #151c25, #470336)",
      }}
    >
      <div className="w-4/5 text-white">
        <h2 className="text-3xl font-bold mb-8">Entre em Contato</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="name" className="text-xl font-bold mb-2 block">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full py-2 px-4 rounded bg-gray-300 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xl font-bold mb-2 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full py-2 px-4 rounded bg-gray-300 text-gray-900"
                required
              />
            </div>
          </div>
          <div className="mt-8">
            <label htmlFor="message" className="text-xl font-bold mb-2 block">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full py-2 px-4 rounded bg-gray-300 text-gray-900"
              required
            ></textarea>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="bg-primary text-white py-3 px-6 rounded-lg font-bold text-xl hover:bg-opacity-80 transition duration-300"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
