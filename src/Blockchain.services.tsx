import Web3 from "web3";
import abi from "./abis/Rifa.json";

import {
  CONTRACT_ADDRESS,
  MATIC_BLOCK_EXPLORER_URL_TESTNET,
  MATIC_CHAIN_ID_TESTNET,
  MATIC_CHAIN_NAME_TESTNET,
  MATIC_RPC_URL_TESTNET,
} from "./constants";
import { setGlobalState, setAlert, getGlobalState } from "./store";
import { Raffle } from "./types/Raffle";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const { ethereum } = window;

const initializeConnectedAccount = () => {
  const connectedAccount = localStorage.getItem("connectedAccount");
  if (connectedAccount) {
    setGlobalState("connectedAccount", connectedAccount);
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return reportError("Instalar Metamask.");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0].toLowerCase());

    if (ethereum.chainId !== MATIC_CHAIN_ID_TESTNET) {
      //Se a rede não for a esperada, solicita a troca
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: MATIC_CHAIN_ID_TESTNET, // ID da rede Polygon
            chainName: MATIC_CHAIN_NAME_TESTNET,
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: [MATIC_RPC_URL_TESTNET],
            blockExplorerUrls: [MATIC_BLOCK_EXPLORER_URL_TESTNET],
          },
        ],
      });
    }

    setGlobalState("connectedChain", ethereum.chainId);
    localStorage.setItem("connectedAccount", accounts[0].toLowerCase());
    localStorage.setItem("connectedChain", ethereum.chainId);
  } catch (error: any) {
    console.log(error);
  }
};

const isWalletConnected = async () => {
  try {
    const accounts = await ethereum.request({ method: "eth_accounts" });

    ethereum.on("chainChanged", (chainId: string) => {
      window.location.reload();
      setGlobalState("connectedChain", chainId);
      localStorage.setItem("connectedChain", chainId);
    });

    ethereum.on("accountsChanged", async () => {
      window.location.reload();
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
      await isWalletConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
      localStorage.setItem("connectedAccount", accounts[0]?.toLowerCase());
    } else {
      setGlobalState("connectedAccount", "");
      localStorage.removeItem("connectedAccount");
    }
  } catch (error: any) {
    console.log(error);
  }
};

const getContract = async () => {
  const web3 = new Web3(ethereum);
  const networkData = CONTRACT_ADDRESS;

  if (networkData) {
    const contract = new web3.eth.Contract(abi.abi, networkData);
    return contract;
  } else {
    return null;
  }
};
const createRaffle = async ({
  title,
  ticketPrice,
  totalReward,
  totalTickets,
}: Raffle) => {
  try {
    ticketPrice = Web3.utils.toWei(ticketPrice, "ether");
    totalReward = Web3.utils.toWei(totalReward ?? "0", "ether");

    const contract = await getContract();
    if (!contract) return reportError("Contrato não encontrado.");
    const account = getGlobalState("connectedAccount");

    return await contract.methods
      .criarRifa(title, totalReward, ticketPrice, totalTickets)
      .send({ from: account });
  } catch (error: any) {
    console.log(error);
    reportError("Erro ao criar rifa.");
  }
};

const getAllRuffles = async () => {
  try {
    const contract = await getContract();
    if (!contract) return reportError("Contrato não encontrado.");
    const account = getGlobalState("connectedAccount");
    //setAlert("Carregando rifas...", "green");
    const raflle = await contract.methods.listarRifas(account).call();

    const structedRaffles = raflle?.map((raffle: any) => {
      const totalTickets = Number(raffle.quantidadeBilhete);
      const ticletsAvailable = Number(raffle.bilhetesDisponiveis);
      const ticketsSold = totalTickets - ticletsAvailable;

      const progressWidth =
        totalTickets !== 0 ? (ticketsSold / totalTickets) * 100 : 0;

      return {
        id: raffle.id,
        title: raffle.nomeRifa,
        status: raffle.rifaFinalizada,
        totalTickets: totalTickets,
        ticketsSold: ticketsSold,
        ticketAvaible: ticletsAvailable,
        ticketPrice: Web3.utils.fromWei(raffle.precoBilhete, "ether"),
        totalReward: Web3.utils.fromWei(raffle.valorPremio, "ether"),
        //ticketPrice: raffle.precoBilhete,
        //totalReward: raffle.valorPremio,
        drawDate: "2021-10-10",
        isFinished: raffle.rifaFinalizada,
        progressWidth: progressWidth,
      };
    });

    return structedRaffles;
  } catch (error: any) {
    console.log(error);
    reportError("Erro ao listar rifas.");
  }
};

const reportError = (error: string) => {
  setAlert(JSON.stringify(error), "red");
};

export {
  initializeConnectedAccount,
  connectWallet,
  isWalletConnected,
  createRaffle,
  getAllRuffles,
};
