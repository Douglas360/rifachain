import React, { ChangeEvent, useEffect, useState, useCallback, useMemo } from "react";
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
  const [newName, setNewName] = useState<string | undefined>(undefined);
  const user = getGlobalState("user");
  const navigate = useNavigate();
  const location = useLocation();

  // Memoizar o handler do escape key
  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEditingName(false);
      setNewName(undefined);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey]);

  // Memoizar handlers para evitar recriação
  const handleMenuItemClick = useCallback((section: string) => {
    navigate(section);
  }, [navigate]);

  const handleNameClick = useCallback(() => {
    setIsEditingName(true);
    setNewName(user?.name);
  }, [user?.name]);

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  }, []);

  const handleNameBlur = useCallback(async () => {
    setIsEditingName(false);
    setNewName(undefined);
  }, []);

  const handleNameKeyDown = useCallback(async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newName && newName.trim() !== "") {
        try {
          setGlobalState("loading", { show: true, msg: "Atualizando nome..." });
          await updateUser(user?.wallet, {
            name: newName,
            avatar: user?.avatar,
          } as User);
          setGlobalState("user", { ...user, name: newName });
          setAlert("Nome atualizado!", "green");
        } catch (error: any) {
          setAlert("Erro ao atualizar o nome", "red");
        }
      }
      setIsEditingName(false);
    }
  }, [newName, user]);

  const changeImage = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
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

        await updateUser(user?.wallet, {
          name: user?.name,
          avatar: metadataURI,
        } as User);

        setAlert("Imagem atualizada!", "green");
      } catch (error: any) {
        setAlert("Erro ao atualizar a imagem", "red");
      }
    }
  }, [user]);

  // Memoizar o array de menu items para evitar recriação
  const menuItems = useMemo(() => [
    { name: "Dashboard", to: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Criar Rifa", to: "/dashboard/rifa", icon: <FaTicketAlt /> },
    { name: "Meus tickets", to: "/dashboard/meus-tickets", icon: <FaWallet /> },
    { name: "Transações", to: "/dashboard/transacoes", icon: <FaCreditCard /> },
    { name: "Suporte", to: "/suporte", icon: <FaHeadset /> },
    { name: "Configuração", to: "/dashboard/configuracao", icon: <FaCog /> },
  ], []);

  // Memoizar handlers para os cliques nos ícones
  const handleFileInputClick = useCallback(() => {
    document.getElementById("fileInput")?.click();
  }, []);

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
              onClick={handleFileInputClick}
            />
            <FaPenSquare
              onClick={handleFileInputClick}
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
