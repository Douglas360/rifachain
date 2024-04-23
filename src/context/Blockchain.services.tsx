import Web3 from "web3";
import { formatDistanceToNow } from "date-fns";
import abi from "../abis/contracts/Raffle.sol/RaffleV2.json";

import {
  CONTRACT_ADDRESS,
  MATIC_BLOCK_EXPLORER_URL_TESTNET,
  MATIC_CHAIN_ID_TESTNET,
  MATIC_CHAIN_NAME_TESTNET,
  MATIC_RPC_URL_TESTNET,
} from "../constants";
import { setGlobalState, setAlert, getGlobalState } from "../store";
import { Raffle } from "../types/Raffle";
import { createUser, getTransactions, getUser } from "./Api.service";

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
            chainId: MATIC_CHAIN_ID_TESTNET, // ID da rede
            chainName: MATIC_CHAIN_NAME_TESTNET,
            nativeCurrency: {
              name: "MATIC",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: [MATIC_RPC_URL_TESTNET],
            blockExplorerUrls: [MATIC_BLOCK_EXPLORER_URL_TESTNET],
          },
        ],
      });
    }
    await createUser({
      wallet: accounts[0].toLowerCase(),
      name: "User-?",
      avatar:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    });

    const raffle = await getAllRaffles();
    setGlobalState("raffles", raffle);
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
      await getUser(accounts[0]?.toLowerCase());
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
      localStorage.setItem("connectedAccount", accounts[0]?.toLowerCase());

      await getUser(accounts[0]?.toLowerCase());
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
  metadataURI,
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
      .createRaffle(title, metadataURI, ticketPrice, totalTickets, totalReward)
      .send({ from: account });
  } catch (error: any) {
    console.log(error);
    reportError("Erro ao criar rifa.");
  }
};
const getAllRaffles = async () => {
  try {
    const contract = await getContract();
    if (!contract) return reportError("Contrato não encontrado.");
    const account = getGlobalState("connectedAccount");

    const user = await getUser(account);
    if (!user) return reportError("Usuário não encontrado.");

    setGlobalState("user", user);

    //const raffle = await contract.methods.listarRifas(account).call();
    const raffle = await contract.methods.getRaflle(account).call();

    const structedRaffles = raffle?.map((raffle: any) => {
      const totalTickets = Number(raffle.ticketCount);
      const ticketsSold = Number(raffle.ticketSold);
      const ticketsAvailable = totalTickets - ticketsSold;

      const progressWidth =
        totalTickets !== 0 ? (ticketsSold / totalTickets) * 100 : 0;

      return {
        id: raffle.id,
        title: raffle.name,
        status: raffle.isActive,
        totalTickets: totalTickets,
        ticketsSold: ticketsSold,
        ticketAvaible: ticketsAvailable,
        ticketPrice: Web3.utils.fromWei(raffle.ticketPrice, "ether"),
        totalReward: Web3.utils.fromWei(raffle.totalAmountToWin, "ether"),
        isActive: raffle.isActive,
        progressWidth: progressWidth,
        isWithdrawn: raffle.isWhidrawn,
        createdAt: raffle.createadAt,
        metadataURI: raffle.image,
      };
    });

    return structedRaffles;
  } catch (error: any) {
    console.log(error);
    reportError("Erro ao listar rifas.");
  }
};
const fetchRaffle = async (id: number) => {
  try {
    await getTransactions(id);
    const contract = await getContract();
    if (!contract) return reportError("Contrato não encontrado.");

    const raffle = (await contract.methods.raffles(id).call()) as {
      name: string;
      image: string;
      ticketPrice: string;
      ticketCount: string;
      ticketSold: string;
      totalAmountToWin: string;
      isActive: boolean;
      winner: string;
    };

    const totalTickets = Number(raffle.ticketCount);
    const ticketsSold = Number(raffle.ticketSold);

    const progressWidth =
      totalTickets !== 0 ? (ticketsSold / totalTickets) * 100 : 0;

    const structedRaffle: Raffle = {
      id: id,
      title: raffle.name,
      metadataURI: raffle.image,
      ticketPrice: Web3.utils.fromWei(raffle.ticketPrice, "ether"),
      totalTickets: totalTickets,
      ticketsSold: ticketsSold,
      totalReward: Web3.utils.fromWei(raffle.totalAmountToWin, "ether"),
      progressWidth: progressWidth,
      isActive: raffle.isActive,
      winner: raffle.winner,
    };

    return structedRaffle;
  } catch (error: any) {
    console.log(error);
    reportError("Erro ao buscar rifa.");
  }
};
const buyTicket = async (
  raffleId: number,
  ticketCount: number,
  value: string
) => {
  try {
    const contract = await getContract();
    if (!contract) return reportError("Contrato não encontrado.");
    const account = getGlobalState("connectedAccount");

    const valueInWei = Web3.utils.toWei(value, "ether");

    return await contract.methods
      .buyTicket(raffleId, ticketCount)
      .send({ from: account, value: valueInWei });
  } catch (error: any) {
    console.log(error);
    reportError("Erro ao comprar bilhete.(");
  }
};
const updateTransaction = async (id: number, tx: string) => {
  try {
    const contract = await getContract();
    if (!contract) return reportError("Contrato não encontrado.");
    const account = getGlobalState("connectedAccount");
    //console.log(id, tx);
    return await contract.methods
      .atualizarTransacao(id, tx)
      .send({ from: account });
  } catch (error: any) {
    console.log(error);
    reportError("Erro ao atualizar transação.");
  }
};
const reportError = (error: string) => {
  setAlert(JSON.stringify(error), "red");
};
const withdrawReward = async (raffleId: number) => {
  try {
    const contract = await getContract();
    if (!contract) return reportError("Contrato não encontrado.");
    const account = getGlobalState("connectedAccount");

    return await contract.methods
      .withdrawRaffleAmount(raffleId)
      .send({ from: account });
  } catch (error: any) {
    console.log(error);
    reportError("Erro ao retirar prêmio.");
  }
};
const getRaffleUser = async (address: string) => {
  const contract = await getContract();
  if (!contract) return reportError("Contrato não encontrado.");

  const raffle = await contract.methods.getParticipantTickets(address).call();

  const structedRaffles = (raffle as any[]).map((raffle: any) => {
    return {
      ticketNumber: Number(raffle.ticketNumber),
      raffleId: Number(raffle.raffleId),
      boughtIn: formatDistanceToNow(
        new Date(parseInt(raffle.createdAt, 10) * 1000),
        { addSuffix: true }
      ),
      raffleTitle: raffle.raffleinfo["name"],
      raffleStatus: raffle.raffleinfo["isActive"],
      raffleReward: Web3.utils.fromWei(
        raffle.raffleinfo["totalAmountToWin"],
        "ether"
      ),
      raffleImage: raffle.raffleinfo["image"],
      winner: raffle.raffleinfo["winner"],
    };
  });

  const groupedByRaffleId = groupTicketNumbersByRaffleId(structedRaffles);
  //console.log(groupedByRaffleId);
  return groupedByRaffleId;
};

const groupTicketNumbersByRaffleId = (raffles: any[]) => {
  const groupedByRaffleId: any = [];
  raffles.forEach((raffle) => {
    if (!groupedByRaffleId[raffle.raffleId]) {
      groupedByRaffleId[raffle.raffleId] = {
        raffleId: raffle.raffleId,
        tickets: [],
        raffleInfo: {
          title: raffle.raffleTitle,
          status: raffle.raffleStatus,
          reward: raffle.raffleReward,
          image: raffle.raffleImage,
          winner: raffle.winner,
        },
      };
    }
    //Push ticket number and bought in date to the raffle
    groupedByRaffleId[raffle.raffleId].tickets.push({
      ticketNumber: raffle.ticketNumber,
      boughtIn: raffle.boughtIn,
    });
  });
  //console.log(groupedByRaffleId);
  return groupedByRaffleId;
};

export {
  initializeConnectedAccount,
  connectWallet,
  isWalletConnected,
  createRaffle,
  getAllRaffles,
  fetchRaffle,
  buyTicket,
  updateTransaction,
  withdrawReward,
  getRaffleUser,
};
