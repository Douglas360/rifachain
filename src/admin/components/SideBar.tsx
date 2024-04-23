import React, { ChangeEvent, useEffect, useState } from "react";
import {
  FaCog,
  FaCreditCard,
  FaHeadset,
  FaPenSquare,
  FaTachometerAlt,
  FaTicketAlt,
  FaWallet,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

import { getGlobalState, setAlert, setGlobalState } from "../../store";
import axios from "axios";
import { auth, pinataBaseURL, pinataEndpoint } from "../../constants";
import { updateUser } from "../../context/Api.service";
import { User } from "../../types/User";

const SideBar: React.FC = () => {
  const [imgBase64, setImgBase64] = useState<string | ArrayBuffer | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState<string | undefined>(undefined); // Estado local para o novo nome
  const user = getGlobalState("user");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Se pressionar "Esc", cancelar a edição do nome
        setIsEditingName(false);
        setNewName(undefined); // Limpar o estado local
      }
    };

    // Adicionar o event listener quando o componente montar
    document.addEventListener("keydown", handleEscapeKey);

    // Remover o event listener quando o componente desmontar
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []); // Executar este efeito apenas uma vez no montar do componente

  const handleMenuItemClick = (section: string) => {
    navigate(section);
  };

  const handleNameClick = () => {
    setIsEditingName(true);
    setNewName(user?.name); // Inicializa o estado local com o nome atual do usuário
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value); // Atualiza o estado local enquanto o usuário digita
  };

  const handleNameBlur = async () => {
    // Ao perder o foco do input, cancelar a edição do nome
    setIsEditingName(false);
    setNewName(undefined); // Limpar o estado local
  };

  const handleNameKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      // Se pressionar "Enter", atualizar o nome
      e.preventDefault(); // Evitar comportamento padrão de submit
      if (newName && newName.trim() !== "") {
        try {
          setGlobalState("loading", { show: true, msg: "Atualizando nome..." });
          await updateUser(user?.wallet, {
            name: newName,
            avatar: user?.avatar,
          } as User);
          setGlobalState("user", { ...user, name: newName }); // Atualiza o nome no estado global
          setAlert("Nome atualizado!", "green");
        } catch (error: any) {
          setAlert("Erro ao atualizar o nome", "red");
        }
      }
      setIsEditingName(false); // Desabilita o modo de edição, independentemente do resultado da atualização
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
      };
      try {
        setGlobalState("loading", { show: true, msg: "Atualizando imagem..." });
        // Upload da imagem para Pinata
        const formData = new FormData();
        formData.append("file", file);

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

        // Atualiza a imagem do usuário
        await updateUser(user?.wallet, {
          name: user?.name,
          avatar: metadataURI,
        } as User);

        setAlert("Imagem atualizada!", "green");
      } catch (error: any) {
        setAlert("Erro ao atualizar a imagem", "red");
      }
    }
  };

  interface MenuItem {
    name: string;
    to: string;
    icon: React.ReactNode;
  }

  const menuItems: MenuItem[] = [
    { name: "Dashboard", to: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Criar Rifa", to: "/dashboard/rifa", icon: <FaTicketAlt /> },
    { name: "Meus tickets", to: "/dashboard/meus-tickets", icon: <FaWallet /> },
    { name: "Transações", to: "/dashboard/transacoes", icon: <FaCreditCard /> },
    { name: "Suporte", to: "/suporte", icon: <FaHeadset /> },
    { name: "Configuração", to: "/dashboard/configuracao", icon: <FaCog /> },
  ];

  return (
    <div>
      {/*--USER PROFILE */}
      <div className="bg-sidebar text-white rounded-md w-4/5 mx-auto md:w-60 md:h-70">
        <div className="flex flex-col items-center">
          <div className="relative inline-block">
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={changeImage}
              id="fileInput"
            />
            <img
              className="w-40 h-40 rounded-full mt-3 cursor-pointer"
              src={imgBase64 ? imgBase64.toString() : user?.avatar}
              alt="Profile"
              onClick={() => document.getElementById("fileInput")?.click()}
            />
            <FaPenSquare
              onClick={() => document.getElementById("fileInput")?.click()}
              className="text-2xl text-white cursor-pointer absolute top-1/1 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          {isEditingName ? (
            <input
              type="text"
              value={newName || ""}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onKeyDown={handleNameKeyDown}
              className="mt-4 text-white text-1xl md:2xl font-bold bg-transparent border-b border-white w-full"
              autoFocus
            />
          ) : (
            <h2
              className="mt-4 text-white text-1xl md:2xl font-bold cursor-pointer"
              onClick={handleNameClick}
            >
              {user?.name}
            </h2>
          )}
          <p className="text-1xl text-blue-400">ID: {user?._id?.slice(5)}</p>
        </div>
      </div>

      {/*--MENU */}
      <div className="bg-sidebar text-white rounded-md w-4/5 mx-auto md:w-60 mt-4">
        <ul className="text-1xl p-2">
          {menuItems.map((item) => (
            <li
              key={item.to}
              className={`p-4 hover:bg-primary cursor-pointer rounded-xl mb-1 ${
                location.pathname === item.to ? "bg-primary rounded-xl" : ""
              }`}
              onClick={() => handleMenuItemClick(item.to)}
            >
              <div className="flex flex-row items-center">
                {item.icon}
                <span className="ml-4">{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
