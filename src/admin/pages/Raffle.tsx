import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTicketAlt } from "react-icons/fa";
import axios from "axios";

import Layout from "../layout";
import Input from "../components/Input";
import Button from "../components/Button";
import { createRaffle } from "../../Blockchain.services";
import { setAlert, setGlobalState } from "../../store";
import { Raffle } from "../../types/Raffle";
import blochchainImage from "../../assets/blockchain.png";

const pinataJWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzZjAzZDllMi04ZGQ2LTQyMjEtYTc1ZS02ZjI0NjkzYTI3ZTQiLCJlbWFpbCI6ImRvdWdsYXNfaGVucmlxdWVkdWFydGVAaG90bWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZmEyZDYxZDRkYjlhNzJmMTY2ODUiLCJzY29wZWRLZXlTZWNyZXQiOiJmZjAxYWY3NjliNmRhZGJiZjhmYTQ3OGY1MjA0NmNlYjBmYzk1MzM4MjI1MTg0MWVhZGIzNGZiMGYzMWVjN2JjIiwiaWF0IjoxNzA2MTI0NTAwfQ.V_8v4FUVhSF4NdrWk_fr7H7ApIqm1kYCtaSHbjeLK4k";
const pinataBaseURL = "https://api.pinata.cloud/";
const pinataEndpoint = "pinning/pinFileToIPFS";
const auth = `Bearer ${pinataJWT}`;

const Ruffle: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [totalReward, setTotalReward] = useState("2");
  const [ticketPrice, setTicketPrice] = useState("1");
  const [totalTicket, setTotalTicket] = useState(100);
  const [fileUrl, setFileUrl] = useState<File | null>(null);
  const [imgBase64, setImgBase64] = useState<string | ArrayBuffer | null>(null);

  const handleCreateRaffle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      title === "" ||
      totalReward === "" ||
      ticketPrice === "" ||
      totalTicket === 0 ||
      !fileUrl
    ) {
      return;
    }

    try {
      // Upload da imagem para Pinata
      const formData = new FormData();
      formData.append("file", fileUrl);

      const res = await axios.post(
        `${pinataBaseURL}${pinataEndpoint}`,
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: auth,
          },
        }
      );

      const metadataURI = `https://black-tropical-parakeet-136.mypinata.cloud/ipfs/${res.data.IpfsHash}`;

      // Criação da rifa com os dados
      const data: Raffle = {
        title: title,
        metadataURI: metadataURI,
        totalTickets: totalTicket,
        ticketPrice: ticketPrice,
        totalReward: totalReward,
      };

      // Chama a função para criar a rifa
      setGlobalState("loading", { show: true, msg: "Criando rifa..." });
      const raffle = await createRaffle(data);

      if (raffle) {
        setAlert("Rifa criada com sucesso!", "green");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error: any) {
      console.log("ERRO NO MINT: " + error);
      setAlert("Minting failed...", "red");
    }
  };

  const changeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (readerEvent) => {
        const result = readerEvent.target?.result;

        if (
          result &&
          (typeof result === "string" || result instanceof ArrayBuffer)
        ) {
          setImgBase64(result);
        }

        setFileUrl(file);
      };
    }
  };

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
          <form onSubmit={handleCreateRaffle}>
            <div className="flex flex-row justify-center items-center rounded-xl mt-5">
              <div className="shrink-0 rounded-xl overflow-hidden h-50 w-50">
                <img
                  alt="Reward"
                  className="h-full w-full object-cover cursor-pointer"
                  src={imgBase64 ? imgBase64.toString() : blochchainImage}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg, image/webp"
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:text-white
                    file:bg-primary file:text-gray-400
                    hover:file:bg-fuchsia-950 
                    cursor-pointer focus:ring-0 focus:outline-none"
                  onChange={changeImage}
                  required
                />
              </label>
            </div>
            <div className="flex flex-col">
              <Input
                label="Nome da rifa"
                placeholder="Ex: Rifa de 2.5 Ethereum"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-4">
              <Input
                label="Total de bilhetes"
                placeholder="Ex: 100"
                type="number"
                id="totalTickets"
                onChange={(e) => setTotalTicket(parseInt(e.target.value))}
              />
            </div>

            <div className="flex flex-col mt-4">
              <Input
                label="Valor do bilhete"
                placeholder="Ex: 10"
                type="string"
                id="ticketPrice"
                onChange={(e) => setTicketPrice(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-4">
              <Input
                label="Valor do prêmio"
                placeholder="Ex: 2.5"
                type="string"
                id="prizeValue"
                onChange={(e) => setTotalReward(e.target.value)}
              />
            </div>

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
                type="submit"
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
